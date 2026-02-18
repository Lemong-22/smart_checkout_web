import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import type { AIScanResult } from '../types';

interface UseImageModelReturn {
  prediction: AIScanResult | null;
  isLoading: boolean;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useImageModel = (): UseImageModelReturn => {
  const [prediction, setPrediction] = useState<AIScanResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const modelRef = useRef<cocoSsd.ObjectDetection | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastPredictionRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initCameraAndModel = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Initializing TensorFlow.js backend...');
        await tf.ready();
        console.log('TensorFlow.js ready, backend:', tf.getBackend());

        console.log('Loading COCO-SSD model...');
        const loadedModel = await cocoSsd.load();
        modelRef.current = loadedModel;
        console.log('COCO-SSD model loaded successfully');

        console.log('Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          }
        });

        console.log('Camera stream obtained:', stream);

        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        streamRef.current = stream;
        setIsLoading(false);
      } catch (err) {
        if (!isMounted) return;
        
        const errorMessage = err instanceof Error ? err.message : 'Failed to access camera or load model';
        setError(errorMessage);
        setIsLoading(false);
        console.error('Initialization error:', err);
      }
    };

    initCameraAndModel();

    return () => {
      isMounted = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (streamRef.current && videoRef.current && !isLoading && modelRef.current) {
      console.log('Attaching stream to video element...');
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      
      video.onloadedmetadata = () => {
        console.log('Video metadata loaded. Dimensions:', video.videoWidth, 'x', video.videoHeight);
        startPredictionLoop();
      };
      
      video.play().then(() => {
        console.log('Video playing successfully!');
      }).catch((err) => {
        console.error('Video play error:', err);
      });
    }
  }, [isLoading]);

  const startPredictionLoop = () => {
    const predict = async () => {
      if (!videoRef.current || !modelRef.current || !canvasRef.current) {
        animationFrameRef.current = requestAnimationFrame(predict);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx || video.readyState !== 4) {
        animationFrameRef.current = requestAnimationFrame(predict);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        const detections = await modelRef.current.detect(video, 3, 0.55);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detections.length > 0) {
          const topDetection = detections.sort((a, b) => b.score - a.score)[0];
          const predictionKey = `${topDetection.class}-${topDetection.score.toFixed(2)}`;

          if (lastPredictionRef.current !== predictionKey) {
            lastPredictionRef.current = predictionKey;
            setPrediction({
              className: topDetection.class,
              probability: topDetection.score,
            });
          }

          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          detections.forEach((detection) => {
            const [x, y, width, height] = detection.bbox;

            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 4;
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 10;
            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = '#10b981';
            ctx.shadowBlur = 5;
            ctx.font = 'bold 20px Arial';
            const text = `${detection.class} (${(detection.score * 100).toFixed(0)}%)`;
            const textWidth = ctx.measureText(text).width;
            
            ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
            ctx.fillRect(x, y - 30, textWidth + 20, 30);
            
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x + 10, y - 8);
          });

          ctx.restore();
        } else {
          if (lastPredictionRef.current !== null) {
            lastPredictionRef.current = null;
            setPrediction(null);
          }
        }
      } catch (err) {
        console.error('Prediction error:', err);
      }

      animationFrameRef.current = requestAnimationFrame(predict);
    };

    console.log('Starting COCO-SSD detection loop...');
    predict();
  };

  return {
    prediction,
    isLoading,
    error,
    videoRef,
    canvasRef,
  };
};
