
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, onNavigate, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Dynamic Header */}
      {currentView === View.HOME && (
        <header className="px-10 py-6 flex items-center justify-between sticky top-0 z-40 bg-white/50 backdrop-blur-xl border-b border-slate-100">
          <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onNavigate(View.HOME)}
          >
            <div className="w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-sky-100 group-hover:rotate-12 transition-transform">✨</div>
            <h1 className="text-3xl font-fredoka text-slate-800 tracking-tight">Magic<span className="text-sky-500">Learning</span></h1>
          </div>
          <div className="flex gap-4">
             <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-xl shadow-sm">🧸</div>
             <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-xl shadow-sm">🎨</div>
          </div>
        </header>
      )}

      {/* Content */}
      <main className={`flex-1 w-full flex flex-col ${currentView === View.HOME ? 'px-6' : 'px-0 overflow-hidden'}`}>
        {children}
      </main>

      {currentView === View.HOME && (
        <footer className="py-12 text-center">
          <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Ready for adventure?</p>
          <div className="mt-4 flex justify-center gap-2">
             <div className="w-2 h-2 rounded-full bg-orange-400"></div>
             <div className="w-2 h-2 rounded-full bg-sky-400"></div>
             <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
