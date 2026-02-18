                                                                                                          import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-xl border-b-2 border-pink-200/50 shadow-xl">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Smart Checkout AI
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-tight">Created by: Yosia, Kenneth, Edward, Vivaldi, Frey, Darren Ong, Quinlan</p>
          </div>
        </div>
      </div>
    </header>
  );
};
