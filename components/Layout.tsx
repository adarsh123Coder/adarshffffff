
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden">
      {/* Dynamic Header */}
      {currentView === View.HOME && (
        <header className="px-4 sm:px-10 py-4 sm:py-6 flex items-center justify-between sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-slate-100">
          <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => onNavigate(View.HOME)}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-500 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xl shadow-sky-100 group-hover:rotate-12 transition-transform">✨</div>
            <h1 className="text-xl sm:text-3xl font-fredoka text-slate-800 tracking-tight">Magic<span className="text-sky-500">Learning</span></h1>
          </div>
          <div className="flex gap-2 sm:gap-4">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-sm">🧸</div>
          </div>
        </header>
      )}

      {/* Content */}
      <main className={`flex-1 w-full flex flex-col ${currentView === View.HOME ? 'px-4 sm:px-6' : 'px-0 overflow-hidden'}`}>
        {children}
      </main>

      {currentView === View.HOME && (
        <footer className="py-8 sm:py-12 text-center">
          <p className="text-slate-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Ready for adventure?</p>
          <div className="mt-2 sm:mt-4 flex justify-center gap-2">
             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-400"></div>
             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400"></div>
             <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"></div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
