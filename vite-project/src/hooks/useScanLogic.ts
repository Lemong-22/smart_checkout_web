import { useEffect, useRef, useState } from 'react';
import type { AIScanResult, CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

type ScanStatus = 'scanning' | 'locked' | 'cooldown';

interface UseScanLogicReturn {
  scannedItem: Product | null;
  scanStatus: ScanStatus;
  scanProgress: number;
}

const CONFIDENCE_THRESHOLD = 0.60;
const REQUIRED_FRAMES = 8;
const COOLDOWN_MS = 2000;

export const useScanLogic = (
  prediction: AIScanResult | null,
  cartItems: CartItem[]
): UseScanLogicReturn => {
  const [scannedItem, setScannedItem] = useState<Product | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('scanning');
  const [scanProgress, setScanProgress] = useState<number>(0);

  const consecutiveFramesRef = useRef<number>(0);
  const lastClassNameRef = useRef<string | null>(null);
  const lastScannedItemRef = useRef<string | null>(null);
  const lastScanTimeRef = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const isInCooldown = now - lastScanTimeRef.current < COOLDOWN_MS;

    if (isInCooldown) {
      setScanStatus('cooldown');
      return;
    }

    if (!prediction || prediction.probability < CONFIDENCE_THRESHOLD) {
      consecutiveFramesRef.current = 0;
      lastClassNameRef.current = null;
      setScanStatus('scanning');
      setScanProgress(0);
      return;
    }

    const matchedProduct = PRODUCTS.find(
      (product) => product.name.toLowerCase() === prediction.className.toLowerCase()
    );

    if (!matchedProduct) {
      consecutiveFramesRef.current = 0;
      lastClassNameRef.current = null;
      setScanStatus('scanning');
      setScanProgress(0);
      return;
    }

    if (prediction.className === lastClassNameRef.current) {
      consecutiveFramesRef.current += 1;
    } else {
      consecutiveFramesRef.current = 1;
      lastClassNameRef.current = prediction.className;
    }

    const progress = Math.min(
      (consecutiveFramesRef.current / REQUIRED_FRAMES) * 100,
      100
    );
    setScanProgress(progress);

    if (consecutiveFramesRef.current >= REQUIRED_FRAMES) {
      if (lastScannedItemRef.current !== prediction.className) {
        setScannedItem(matchedProduct);
        setScanStatus('locked');
        lastScannedItemRef.current = prediction.className;
        lastScanTimeRef.current = now;

        consecutiveFramesRef.current = 0;
        lastClassNameRef.current = null;

        setTimeout(() => {
          setScannedItem(null);
          setScanStatus('scanning');
          setScanProgress(0);
        }, 500);
      } else {
        consecutiveFramesRef.current = 0;
        lastClassNameRef.current = null;
        setScanStatus('cooldown');
      }
    } else {
      setScanStatus('scanning');
    }
  }, [prediction, cartItems]);

  return {
    scannedItem,
    scanStatus,
    scanProgress,
  };
};
