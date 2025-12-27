
import React, { useState, useEffect, useCallback } from 'react';
import { speakNative } from '../services/speech';

interface QuizViewProps {
  items: any[];
  onExit: () => void;
  type: 'letter' | 'number';
}

const QuizView: React.FC<QuizViewProps> = ({ items, onExit, type }) => {
  const [question, setQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateNewQuestion = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * items.length);
    const correct = items[randomIdx];
    
    let others = items.filter(i => i !== correct);
    others = others.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    const allOptions = [correct, ...others].sort(() => 0.5 - Math.random());
    
    setQuestion(correct);
    setOptions(allOptions);
    setFeedback(null);
    
    // User requested: "Aao dhoondhen aur batayein" (Hindi)
    const val = type === 'letter' ? correct.letter : correct.value;
    speakNative(`आओ ढूंढें और बताएं! ${val} कहां है?`, 'hi-IN');
  }, [items, type]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleChoice = (choice: any) => {
    const val = type === 'letter' ? choice.letter : choice.value;
    if (choice === question) {
      setFeedback('correct');
      // Success feedback in Hindi
      speakNative(`बहुत अच्छे! आपने ${val} ढूंढ लिया!`, 'hi-IN');
      setTimeout(generateNewQuestion, 2000);
    } else {
      setFeedback('wrong');
      // Error feedback in Hindi
      speakNative("गलत जवाब, फिर से कोशिश करो!", 'hi-IN');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-50/80 backdrop-blur-md sm:rounded-[3rem] shadow-2xl border-x border-white/20 animate-in zoom-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-4 sm:mb-8">
        <button onClick={onExit} className="bg-slate-800 text-white px-4 py-2 sm:px-8 sm:py-4 rounded-xl sm:rounded-[1.5rem] font-bold shadow-lg hover:bg-slate-700 active:scale-95 transition-all text-sm sm:text-xl">
          Exit
        </button>
        <div className="text-sky-600 font-bold font-fredoka text-base sm:text-3xl tracking-tight bg-white px-4 py-2 sm:px-8 sm:py-3 rounded-full shadow-sm border border-sky-100 text-center">
          ढूंढो! 🎯
        </div>
      </div>

      {/* Question Visual - Responsive scaling */}
      <div 
        onClick={() => {
          const val = type === 'letter' ? question.letter : question.value;
          speakNative(`आओ ढूंढें और बताएं! ${val} कहां है?`, 'hi-IN');
        }}
        className={`w-full flex-1 rounded-[2rem] sm:rounded-[4rem] bg-white border-8 sm:border-[16px] transition-all duration-300 transform cursor-pointer flex flex-col items-center justify-center relative overflow-hidden
          ${feedback === 'correct' ? 'border-green-400 scale-105 bg-green-50' : 
            feedback === 'wrong' ? 'border-red-400 animate-shake' : 
            'border-slate-100 shadow-inner active:scale-95'}`}
      >
        {feedback === 'correct' && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="text-[10rem] sm:text-[20rem] animate-ping opacity-30">🌟</div>
           </div>
        )}
        
        <div className="relative z-10 flex flex-col items-center p-4">
          <div className="text-slate-400 font-bold uppercase tracking-widest mb-2 sm:mb-6 text-xs sm:text-xl">सुनो और छुओ</div>
          <h1 className="text-9xl sm:text-[15rem] md:text-[18rem] font-fredoka leading-none text-slate-800 drop-shadow-md select-none">
            {type === 'letter' ? question.letter : question.value}
          </h1>
          
          <div className="mt-4 sm:mt-8 bg-sky-50 text-sky-500 px-6 py-2 sm:px-10 sm:py-4 rounded-full font-bold flex items-center gap-2 sm:gap-3 border border-sky-100 animate-bounce text-xs sm:text-base">
             <span>सुनने के लिए दबाएं</span>
             <span className="text-xl sm:text-3xl">🔊</span>
          </div>
        </div>
      </div>

      {/* Options Grid - Responsive column sizing */}
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-8 mt-4 sm:mt-12 mb-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(opt)}
            className={`w-full p-4 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-xl flex flex-col items-center justify-center gap-2 sm:gap-6 transition-all transform active:scale-90 ${opt.color} text-white group border-b-4 sm:border-b-[12px] border-black/10 active:border-b-0`}
          >
            <span className="text-4xl sm:text-8xl md:text-9xl transition-transform duration-300 drop-shadow-lg">
              {opt.emoji || '🔢'}
            </span>
            <span className="text-[10px] sm:text-2xl md:text-4xl font-fredoka uppercase tracking-widest bg-black/10 px-2 sm:px-6 py-1 rounded-lg sm:rounded-2xl w-full text-center truncate">
              {opt.word}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 3;
        }
      `}</style>
    </div>
  );
};

export default QuizView;
