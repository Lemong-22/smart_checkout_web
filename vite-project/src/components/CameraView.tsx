import { useEffect } from 'react';
import { AlertCircle, Camera, Loader2, Scan, SwitchCamera } from 'lucide-react';
import { useImageModel } from '../hooks/useImageModel';
import type { AIScanResult } from '../types';

interface CameraViewProps {
  onScan?: (result: AIScanResult) => void;
  scanStatus?: 'scanning' | 'locked' | 'cooldown';
  scanProgress?: number;
}

export const CameraView = ({ onScan, scanStatus = 'scanning', scanProgress = 0 }: CameraViewProps) => {
  const { prediction, isLoading, error, videoRef, canvasRef, flipCamera, facingMode } = useImageModel();

  useEffect(() => {
    if (onScan && prediction) {
      onScan(prediction);
    }
  }, [prediction, onScan]);

  const getBorderColor = (): string => {
    switch (scanStatus) {
      case 'locked':
        return 'border-emerald-400 shadow-emerald-400/50 shadow-2xl';
      case 'cooldown':
        return 'border-amber-400 shadow-amber-400/30';
      default:
        return 'border-indigo-500/40';
    }
  };

  if (error) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-red-50 to-red-100 rounded-3xl overflow-hidden flex items-center justify-center border-2 border-red-200 shadow-2xl">
        <div className="text-center text-red-600 px-6">
          <AlertCircle className="w-20 h-20 mx-auto mb-4 opacity-80" />
          <p className="text-xl font-bold mb-2">Camera Error</p>
          <p className="text-sm mb-4">{error}</p>
          <p className="text-xs text-red-500 bg-red-100 px-4 py-2 rounded-lg">
            Please check camera permissions or provide a valid model URL
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="relative z-10 text-center">
          <Loader2 className="w-20 h-20 mx-auto mb-6 animate-spin text-indigo-400" />
          <p className="text-xl font-bold text-white mb-2">Initializing AI Vision</p>
          <p className="text-sm text-indigo-300">Loading COCO-SSD & Camera</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-slate-950 rounded-3xl overflow-hidden border-4 transition-all duration-300 ${getBorderColor()}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ transform: 'scaleX(-1)' }}
      />

      <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg backdrop-blur-sm">
        <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
        <span className="tracking-wider">LIVE</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center space-x-3">
        <button
          onClick={flipCamera}
          className="bg-slate-900/80 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-slate-800 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
          title={`Switch to ${facingMode === 'user' ? 'back' : 'front'} camera`}
          aria-label="Flip camera"
        >
          <SwitchCamera className="w-5 h-5" />
        </button>
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg backdrop-blur-sm">
          <Scan className="w-4 h-4" />
          <span className="tracking-wider">AI VISION</span>
        </div>
      </div>

      <div className="absolute inset-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-indigo-400 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-indigo-400 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-indigo-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-indigo-400 rounded-br-2xl" />
      </div>

      {scanStatus === 'scanning' && prediction && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse" />
        </div>
      )}

      {prediction ? (
        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {scanStatus === 'locked' && (
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              )}
              <span className={`text-sm font-bold uppercase tracking-wider ${
                scanStatus === 'locked' ? 'text-emerald-400' : 
                scanStatus === 'cooldown' ? 'text-amber-400' : 
                'text-indigo-400'
              }`}>
                {scanStatus === 'locked' ? '✓ SCANNED' : scanStatus === 'cooldown' ? 'COOLDOWN' : 'DETECTING'}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {(prediction.probability * 100).toFixed(1)}% CONF
            </span>
          </div>
          <p className="text-2xl font-bold mb-4">{prediction.className}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase tracking-wide">Scan Progress</span>
              <span className="text-slate-300 font-mono font-bold">{scanProgress.toFixed(0)}%</span>
            </div>
            <div className="relative bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  scanStatus === 'locked' 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                    : 'bg-gradient-to-r from-indigo-400 to-violet-500'
                }`}
                style={{ width: `${scanProgress}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-white/10">
          <div className="flex items-center space-x-3">
            <Camera className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span className="text-sm text-slate-300 font-medium">Scanning for products...</span>
          </div>
        </div>
      )}
    </div>
  );
};
