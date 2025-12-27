
import React, { useState, useEffect } from 'react';
import { speakNative } from '../services/speech';

interface FlashcardViewProps {
  items: any[];
  onExit: () => void;
  type: 'letter' | 'number';
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ items, onExit, type }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentItem = items[index];
  const title = type === 'letter' ? currentItem.letter : currentItem.value;
  const subtitle = currentItem.word;

  const handleSpeak = () => {
    speakNative(`${title}. ${subtitle}.`);
  };

  useEffect(() => {
    handleSpeak();
  }, [index]);

  const next = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
      setIsAnimating(false);
    }, 150);
  };

  const prev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white/40 backdrop-blur-md sm:rounded-[3rem] shadow-2xl border-x border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      {/* Top Nav - Compact for mobile */}
      <div className="w-full flex justify-between items-center mb-2 sm:mb-4">
        <button 
          onClick={onExit} 
          className="bg-white/80 hover:bg-white text-slate-700 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold shadow-sm border border-slate-100 active:scale-90 transition-all text-sm sm:text-base"
        >
          ← Home
        </button>
        <div className="bg-white/90 px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl font-bold text-sky-500 shadow-sm border border-sky-50 text-xs sm:text-sm">
          {index + 1} / {items.length}
        </div>
      </div>

      {/* Main Interactive Card - Scales based on viewport */}
      <div 
        onClick={handleSpeak}
        className={`w-full flex-1 rounded-[2.5rem] sm:rounded-[4rem] ${currentItem.color} flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden cursor-pointer group transition-all duration-300 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} hover:brightness-105 active:scale-95`}
      >
        {/* Playful Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-4 left-4 text-6xl sm:text-9xl animate-bounce">✨</div>
          <div className="absolute bottom-4 right-4 text-6xl sm:text-9xl animate-pulse delay-700">🌈</div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-4">
           <div className="text-8xl sm:text-[15rem] md:text-[20rem] font-fredoka leading-none drop-shadow-2xl animate-in zoom-in duration-500 delay-100">
             {title}
           </div>
           
           <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2">
             <div className="text-6xl sm:text-9xl mb-1 drop-shadow-lg scale-animation">
               {currentItem.emoji || '⭐'}
             </div>
             <div className="bg-white/20 backdrop-blur-lg px-6 py-2 sm:px-12 sm:py-4 rounded-2xl sm:rounded-[2.5rem] border border-white/30 shadow-xl">
               <h2 className="text-2xl sm:text-5xl md:text-7xl font-fredoka uppercase tracking-widest leading-tight">
                 {subtitle}
               </h2>
             </div>
           </div>
        </div>

        <div className="absolute bottom-4 flex items-center gap-2 bg-black/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-xs sm:text-sm">
           <span className="text-white font-bold tracking-widest animate-pulse">TAP TO HEAR</span>
           <span>🔊</span>
        </div>
      </div>

      {/* Navigation Controls - Optimized height for mobile */}
      <div className="w-full flex items-center gap-3 sm:gap-6 mt-4 mb-2">
        <button 
          onClick={prev} 
          className="h-16 w-16 sm:h-24 sm:w-24 bg-white hover:bg-slate-50 border-2 sm:border-4 border-slate-100 rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-3xl sm:text-5xl text-slate-300 hover:text-sky-500 shadow-lg active:scale-90 transition-all"
        >
          ←
        </button>
        
        <button 
          onClick={handleSpeak}
          className="flex-1 h-16 sm:h-24 bg-yellow-400 hover:bg-yellow-500 text-white font-fredoka rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-yellow-200/50 transition-all active:scale-95 flex items-center justify-center gap-2 sm:gap-4 text-2xl sm:text-4xl border-b-4 sm:border-b-8 border-yellow-600 active:border-b-0"
        >
          <span>HEAR</span>
          <span className="text-3xl sm:text-5xl">🔊</span>
        </button>

        <button 
          onClick={next} 
          className="h-16 w-16 sm:h-24 sm:w-24 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-3xl sm:text-5xl shadow-xl shadow-sky-200 active:scale-90 transition-all border-b-4 sm:border-b-8 border-sky-700 active:border-b-0"
        >
          →
        </button>
      </div>

      <style>{`
        .scale-animation {
          animation: scaleUpDown 2s ease-in-out infinite;
        }
        @keyframes scaleUpDown {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default FlashcardView;
