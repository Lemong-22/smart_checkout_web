import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../types';

interface ToastProps {
  product: Product | null;
  onClose: () => void;
}

export const Toast = ({ product, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div 
      className={`fixed top-24 right-6 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border-2 border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-bounce">
          <CheckCircle className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-lg">Added to cart!</p>
          <p className="text-sm opacity-90 flex items-center space-x-2">
            <span className="text-2xl">{product.image}</span>
            <span>{product.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
