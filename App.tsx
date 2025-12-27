
import React, { useState } from 'react';
import { View } from './types';
import { ALPHABET_DATA, NUMBER_DATA } from './constants';
import Layout from './components/Layout';
import FlashcardView from './components/FlashcardView';
import QuizView from './components/QuizView';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HOME);

  const renderHome = () => (
    <div className="space-y-12 py-12 max-w-5xl mx-auto">
      <section className="text-center space-y-4">
        <div className="inline-block float-animation text-8xl mb-4">🚀</div>
        <h1 className="text-6xl md:text-8xl font-fredoka text-slate-800 tracking-tight leading-none">
          Magic <span className="text-sky-500">Learning</span>
        </h1>
        <p className="text-xl text-slate-400 font-medium tracking-wide max-w-md mx-auto">
          Interactive alphabet and numbers adventure for curious kids.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {/* Learn ABC */}
        <button 
          onClick={() => setView(View.ALPHABET)}
          className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(249,115,22,0.15)] transition-all border border-slate-50 flex flex-col items-center text-center gap-6 group active:scale-95"
        >
          <div className="w-32 h-32 bg-orange-50 rounded-[2.5rem] flex items-center justify-center text-6xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">🔤</div>
          <div>
            <h2 className="text-3xl font-fredoka text-orange-500 mb-1">Learn ABC</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">A is for Apple</p>
          </div>
        </button>

        {/* Learn 123 */}
        <button 
          onClick={() => setView(View.NUMBERS)}
          className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(14,165,233,0.15)] transition-all border border-slate-50 flex flex-col items-center text-center gap-6 group active:scale-95"
        >
          <div className="w-32 h-32 bg-sky-50 rounded-[2.5rem] flex items-center justify-center text-6xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">🔢</div>
          <div>
            <h2 className="text-3xl font-fredoka text-sky-500 mb-1">Learn 123</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Count to Ten</p>
          </div>
        </button>

        {/* ABC Quiz */}
        <button 
          onClick={() => setView(View.ALPHABET_QUIZ)}
          className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(34,197,94,0.15)] transition-all border border-slate-50 flex flex-col items-center text-center gap-6 group active:scale-95"
        >
          <div className="w-32 h-32 bg-green-50 rounded-[2.5rem] flex items-center justify-center text-6xl group-hover:scale-110 transition-all duration-300">❓</div>
          <div>
            <h2 className="text-3xl font-fredoka text-green-500 mb-1">ABC Quiz</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Memory Game</p>
          </div>
        </button>

        {/* 123 Quiz */}
        <button 
          onClick={() => setView(View.NUMBER_QUIZ)}
          className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(168,85,247,0.15)] transition-all border border-slate-50 flex flex-col items-center text-center gap-6 group active:scale-95"
        >
          <div className="w-32 h-32 bg-purple-50 rounded-[2.5rem] flex items-center justify-center text-6xl group-hover:scale-110 transition-all duration-300">🎯</div>
          <div>
            <h2 className="text-3xl font-fredoka text-purple-500 mb-1">123 Quiz</h2>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">How Many?</p>
          </div>
        </button>
      </div>

      <div className="flex justify-center gap-10 opacity-20 py-10 filter grayscale contrast-125">
        <span className="text-4xl">🦒</span>
        <span className="text-4xl">🐋</span>
        <span className="text-4xl">🐯</span>
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
