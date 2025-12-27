
import React, { useState } from 'react';
import { View } from './types';
import { ALPHABET_DATA, NUMBER_DATA } from './constants';
import Layout from './components/Layout';
import FlashcardView from './components/FlashcardView';
import QuizView from './components/QuizView';
import { speakNative } from './services/speech';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);

  const handleCardClick = (targetView: View, text: string) => {
    speakNative(text);
    setView(targetView);
  };

  const renderHome = () => (
    <div className="space-y-8 sm:space-y-16 py-8 sm:py-12 max-w-6xl mx-auto animate-in fade-in duration-700 px-4 sm:px-0">
      <section className="text-center space-y-4 sm:space-y-6">
        <div className="inline-block float-animation text-6xl sm:text-9xl mb-2 cursor-pointer hover:rotate-12 transition-transform" onClick={() => speakNative("Let's go to space!")}>🚀</div>
        <h1 className="text-4xl sm:text-7xl md:text-9xl font-fredoka text-slate-800 tracking-tight leading-none drop-shadow-sm">
          Magic <span className="text-sky-500">Learn</span>
        </h1>
        <p className="text-base sm:text-2xl text-slate-400 font-semibold tracking-wide max-w-lg mx-auto leading-relaxed px-4">
          The fun way to learn your <span className="text-orange-400">ABC's</span> and <span className="text-sky-500">123's</span>!
        </p>
      </section>

      <div className="grid grid-cols-2 gap-4 sm:gap-10 sm:px-8">
        {/* Card: Learn ABC */}
        <button 
          onClick={() => handleCardClick(View.ALPHABET, "Let's learn the alphabet!")}
          className="bg-white p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[4rem] shadow-xl sm:shadow-2xl shadow-orange-100/50 hover:shadow-orange-200/50 transition-all border-2 sm:border-4 border-transparent hover:border-orange-400 flex flex-col items-center text-center gap-2 sm:gap-8 group active:scale-95 transform sm:hover:-translate-y-2"
        >
          <div className="w-16 h-16 sm:w-40 sm:h-40 bg-orange-100 rounded-2xl sm:rounded-[3rem] flex items-center justify-center text-3xl sm:text-8xl group-hover:scale-110 sm:group-hover:scale-125 transition-all duration-500 shadow-inner">🔤</div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-5xl font-fredoka text-orange-500">ABC</h2>
            <p className="text-slate-300 font-bold text-[10px] sm:text-lg uppercase tracking-widest hidden sm:block">A is for Apple</p>
          </div>
        </button>

        {/* Card: Learn 123 */}
        <button 
          onClick={() => handleCardClick(View.NUMBERS, "Let's learn numbers!")}
          className="bg-white p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[4rem] shadow-xl sm:shadow-2xl shadow-sky-100/50 hover:shadow-sky-200/50 transition-all border-2 sm:border-4 border-transparent hover:border-sky-500 flex flex-col items-center text-center gap-2 sm:gap-8 group active:scale-95 transform sm:hover:-translate-y-2"
        >
          <div className="w-16 h-16 sm:w-40 sm:h-40 bg-sky-100 rounded-2xl sm:rounded-[3rem] flex items-center justify-center text-3xl sm:text-8xl group-hover:scale-110 sm:group-hover:scale-125 transition-all duration-500 shadow-inner">🔢</div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-5xl font-fredoka text-sky-500">123</h2>
            <p className="text-slate-300 font-bold text-[10px] sm:text-lg uppercase tracking-widest hidden sm:block">One to Ten</p>
          </div>
        </button>

        {/* Card: ABC Quiz */}
        <button 
          onClick={() => handleCardClick(View.ALPHABET_QUIZ, "Ready for an alphabet quiz?")}
          className="bg-white p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[4rem] shadow-xl sm:shadow-2xl shadow-green-100/50 hover:shadow-green-200/50 transition-all border-2 sm:border-4 border-transparent hover:border-green-500 flex flex-col items-center text-center gap-2 sm:gap-8 group active:scale-95 transform sm:hover:-translate-y-2"
        >
          <div className="w-16 h-16 sm:w-40 sm:h-40 bg-green-100 rounded-2xl sm:rounded-[3rem] flex items-center justify-center text-3xl sm:text-8xl group-hover:scale-110 sm:group-hover:scale-125 transition-all duration-500 shadow-inner">❓</div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-5xl font-fredoka text-green-500">ABC Quiz</h2>
            <p className="text-slate-300 font-bold text-[10px] sm:text-lg uppercase tracking-widest hidden sm:block">Game Time!</p>
          </div>
        </button>

        {/* Card: 123 Quiz */}
        <button 
          onClick={() => handleCardClick(View.NUMBER_QUIZ, "Ready for a number quiz?")}
          className="bg-white p-4 sm:p-12 rounded-[1.5rem] sm:rounded-[4rem] shadow-xl sm:shadow-2xl shadow-purple-100/50 hover:shadow-purple-200/50 transition-all border-2 sm:border-4 border-transparent hover:border-purple-500 flex flex-col items-center text-center gap-2 sm:gap-8 group active:scale-95 transform sm:hover:-translate-y-2"
        >
          <div className="w-16 h-16 sm:w-40 sm:h-40 bg-purple-100 rounded-2xl sm:rounded-[3rem] flex items-center justify-center text-3xl sm:text-8xl group-hover:scale-110 sm:group-hover:scale-125 transition-all duration-500 shadow-inner">🎯</div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-5xl font-fredoka text-purple-500">123 Quiz</h2>
            <p className="text-slate-300 font-bold text-[10px] sm:text-lg uppercase tracking-widest hidden sm:block">Count them!</p>
          </div>
        </button>
      </div>

      <div className="flex justify-center gap-4 sm:gap-16 py-6 overflow-hidden select-none">
        {['🦒', '🐋', '🐯', '🐼', '🦖'].map((emoji, i) => (
          <span key={i} className="text-3xl sm:text-6xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>{emoji}</span>
        ))}
      </div>
    </div>
  );

  return (
    <Layout currentView={view} onNavigate={setView}>
      {view === View.HOME && renderHome()}
      {view === View.ALPHABET && (
        <FlashcardView 
          items={ALPHABET_DATA} 
          type="letter" 
          onExit={() => setView(View.HOME)} 
        />
      )}
      {view === View.NUMBERS && (
        <FlashcardView 
          items={NUMBER_DATA} 
          type="number" 
          onExit={() => setView(View.HOME)} 
        />
      )}
      {view === View.ALPHABET_QUIZ && (
        <QuizView 
          items={ALPHABET_DATA} 
          type="letter" 
          onExit={() => setView(View.HOME)} 
        />
      )}
      {view === View.NUMBER_QUIZ && (
        <QuizView 
          items={NUMBER_DATA} 
          type="number" 
          onExit={() => setView(View.HOME)} 
        />
      )}
    </Layout>
  );
};

export default App;
