
import React, { useState, useEffect, useRef } from 'react';
import { generateSpeech } from '../services/gemini';
import { decode, decodeAudioData } from './AudioUtils';

interface FlashcardViewProps {
  items: any[];
  onExit: () => void;
  type: 'letter' | 'number';
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ items, onExit, type }) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const currentItem = items[index];
  const title = type === 'letter' ? currentItem.letter : currentItem.value;
  const subtitle = currentItem.word;

  // Pre-initialize AudioContext on first interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const handleSpeak = async (text: string) => {
    initAudio();
    setIsLoading(true);
    const ctx = audioContextRef.current!;
    
    // Stop previous audio immediately
    if (currentSourceRef.current) {
      try { currentSourceRef.current.stop(); } catch(e) {}
    }

    const audioData = await generateSpeech(text);
    setIsLoading(false);
    
    if (audioData) {
      const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      currentSourceRef.current = source;
      source.start(0); // Start playing immediately
    }
  };

  useEffect(() => {
    // We only auto-speak if it's the first render or index actually changes
    // But we don't want to over-speak if the user is clicking fast
    const timer = setTimeout(() => {
       handleSpeak(`${title}. ${subtitle}.`);
    }, 100);
    return () => clearTimeout(timer);
  }, [index]);

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full max-w-4xl mx-auto p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 my-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <button 
          onClick={onExit} 
          className="bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-700 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>←</span> Back Home
        </button>
        <div className="bg-white/80 px-4 py-2 rounded-xl font-bold text-slate-500 shadow-sm border border-slate-100">
          {index + 1} of {items.length}
        </div>
      </div>

      {/* Main Learning Card */}
      <div 
        onClick={() => handleSpeak(`${title}. ${subtitle}.`)}
        className={`w-full flex-1 rounded-[4rem] ${currentItem.color} flex flex-col items-center justify-center text-white shadow-inner relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:brightness-105 active:scale-95`}
      >
        {/* Modern Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
           <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-40"></div>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-40"></div>
           <div className="grid grid-cols-6 gap-20 p-10 rotate-12 opacity-20">
              {Array.from({length: 24}).map((_, i) => (
                <div key={i} className="text-4xl font-fredoka uppercase">{type === 'letter' ? currentItem.letter : currentItem.value}</div>
              ))}
           </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
           <span className="text-[14rem] md:text-[20rem] font-fredoka leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
             {title}
           </span>
           <div className="flex items-center gap-4 bg-black/10 backdrop-blur-md px-10 py-4 rounded-3xl mt-4 border border-white/20">
              <span className="text-5xl md:text-7xl">{currentItem.emoji || '✨'}</span>
              <h2 className="text-4xl md:text-6xl font-fredoka uppercase tracking-widest">{subtitle}</h2>
           </div>
        </div>
        
        {/* Click Prompt Overlay */}
        <div className="absolute bottom-10 text-white font-bold tracking-widest text-sm flex items-center gap-2">
           {isLoading ? (
             <div className="flex gap-1">
               <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
             </div>
           ) : (
             <span className="animate-pulse">TAP TO HEAR 🔊</span>
           )}
        </div>
      </div>

      {/* Controls */}
      <div className="w-full flex items-center gap-4 mt-8">
        <button 
          onClick={prev} 
          className="h-20 w-20 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center text-3xl text-slate-400 hover:text-slate-600 hover:border-slate-200 shadow-sm active:scale-95 transition-all"
        >
          ←
        </button>
        
        <button 
          onClick={() => handleSpeak(`${title}. ${subtitle}.`)}
          disabled={isLoading}
          className={`flex-1 h-20 bg-yellow-400 hover:bg-yellow-500 text-white font-fredoka rounded-3xl shadow-xl shadow-yellow-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-3xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>{isLoading ? '...' : '🔊 SPEAK'}</span>
        </button>

        <button 
          onClick={next} 
          className="h-20 w-20 bg-sky-500 text-white rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-sky-200 active:scale-95 transition-all hover:bg-sky-600"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default FlashcardView;
