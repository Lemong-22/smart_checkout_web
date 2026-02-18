import { X } from 'lucide-react';
import type { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/currency';

interface CartItemProps {
  item: CartItemType;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onIncrement, onDecrement, onRemove }: CartItemProps) => {
  return (
    <div className="group bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-pink-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-orange-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
            <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{item.image}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-pink-600 transition-colors duration-300">{item.name}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{item.category}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:rotate-12 hover:shadow-lg"
          aria-label="Remove item"
          title="Remove item"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
        <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl px-3 py-2 shadow-inner">
          <button
            onClick={() => onDecrement(item.id)}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 font-bold hover:shadow-lg hover:rotate-12"
          >
            −
          </button>
          <span className="w-10 text-center font-bold text-slate-800 transition-all duration-200 group-hover:scale-110">{item.quantity}</span>
          <button
            onClick={() => onIncrement(item.id)}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 font-bold hover:shadow-lg hover:-rotate-12"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500 font-medium mb-1">{formatCurrency(item.price)} each</p>
          <p className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};
