import { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, Receipt, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem as CartItemType, AIScanResult, Product } from './types';
import { Header } from './components/Header';
import { CameraView } from './components/CameraView';
import { CartItem } from './components/CartItem';
import { Toast } from './components/Toast';
import { formatCurrency } from './utils/currency';
import { useScanLogic } from './hooks/useScanLogic';
import { playScanSound } from './utils/audio';

function App() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [currentPrediction, setCurrentPrediction] = useState<AIScanResult | null>(null);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState<boolean>(false);

  const { scannedItem, scanStatus, scanProgress } = useScanLogic(currentPrediction, cart);

  const handleIncrement = (id: string): void => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string): void => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id: string): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = (): void => {
    setCart([]);
  };

  const handleCheckout = (): void => {
    if (cart.length === 0) return;

    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // Show success message
    setShowCheckoutSuccess(true);

    // Reset cart after animation
    setTimeout(() => {
      setCart([]);
      setShowCheckoutSuccess(false);
    }, 3000);
  };

  const addToCart = (product: Product): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
          timestamp: Date.now(),
        },
      ];
    });
  };

  const handleScan = (result: AIScanResult): void => {
    setCurrentPrediction(result);
  };

  useEffect(() => {
    if (scannedItem) {
      playScanSound();
      addToCart(scannedItem);
      setToastProduct(scannedItem);
    }
  }, [scannedItem]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="flex-1 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2 fade-in">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full border-2 border-pink-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent">KAMERA SAKTI</h2>
              </div>
              <div className="aspect-video">
                <CameraView 
                  onScan={handleScan}
                  scanStatus={scanStatus}
                  scanProgress={scanProgress}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 h-full flex flex-col border-2 border-purple-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Cart</h2>
                    {totalItems > 0 && (
                      <span className="text-xs text-slate-500 font-medium">{totalItems} items</span>
                    )}
                  </div>
                </div>
                {cart.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-3 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-110 active:scale-95"
                    title="Clear all items"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
                      <ShoppingBag className="w-12 h-12 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold text-lg">Cart is empty</p>
                    <p className="text-sm text-slate-400 mt-2 text-center">
                      Scan products with AI to add them
                    </p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={item.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CartItem
                        item={item}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onRemove={handleRemove}
                      />
                    </div>
                  ))
                )}
              </div>

              <div className="border-t-2 border-slate-200/50 pt-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span className="font-medium">Tax (10%)</span>
                    <span className="font-semibold">{formatCurrency(totalPrice * 0.10)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-slate-200/50">
                  <span className="text-lg font-bold text-slate-800">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {formatCurrency(totalPrice * 1.10)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-300 mt-4 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 disabled:shadow-none disabled:hover:scale-100 relative overflow-hidden group"
                >
                  <span className="relative z-10">Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toast product={toastProduct} onClose={() => setToastProduct(null)} />

      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-12 shadow-2xl transform animate-scale-in">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce-in shadow-lg">
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
                <p className="text-slate-600">Thank you for your purchase</p>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600 font-semibold">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                <span>Processing order...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
