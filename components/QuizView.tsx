
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { generateSpeech } from '../services/gemini';
import { decode, decodeAudioData } from './AudioUtils';

interface QuizViewProps {
  items: any[];
  onExit: () => void;
  type: 'letter' | 'number';
}

const QuizView: React.FC<QuizViewProps> = ({ items, onExit, type }) => {
  const [question, setQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

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
    setIsSpeaking(true);
    const ctx = audioContextRef.current!;
    if (currentSourceRef.current) {
      try { currentSourceRef.current.stop(); } catch(e) {}
    }

    const audioData = await generateSpeech(text);
    setIsSpeaking(false);
    
    if (audioData) {
      const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      currentSourceRef.current = source;
      source.start(0);
    }
  };

  const generateNewQuestion = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * items.length);
    const correct = items[randomIdx];
    
    let others = items.filter(i => i !== correct);
    others = others.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    const allOptions = [correct, ...others].sort(() => 0.5 - Math.random());
    
    setQuestion(correct);
    setOptions(allOptions);
    setFeedback(null);
    handleSpeak(`Can you find ${type === 'letter' ? correct.letter : correct.value}?`);
  }, [items, type]);

  useEffect(() => {
    generateNewQuestion();
  }, [generateNewQuestion]);

  const handleChoice = (choice: any) => {
    if (choice === question) {
      setFeedback('correct');
      handleSpeak(`Great job! You found ${type === 'letter' ? choice.letter : choice.value}!`);
      setTimeout(generateNewQuestion, 2500);
    } else {
      setFeedback('wrong');
      handleSpeak("Oops! Try again!");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full max-w-4xl mx-auto p-6 bg-slate-50/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 my-4">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <button onClick={onExit} className="bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-700 active:scale-95 transition-all">
          Exit
        </button>
        <div className="text-sky-600 font-bold font-fredoka text-2xl tracking-tight flex items-center gap-2">
           Quiz Time! 🎯
           {isSpeaking && <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>}
        </div>
      </div>

      {/* Question Card */}
      <div className={`w-full flex-1 rounded-[4rem] bg-white border-[12px] ${feedback === 'correct' ? 'border-green-400' : feedback === 'wrong' ? 'border-red-400' : 'border-slate-100'} flex flex-col items-center justify-center shadow-2xl p-8 relative transition-all duration-300`}>
        {feedback === 'correct' && <div className="absolute inset-0 bg-green-400/10 flex items-center justify-center text-9xl animate-ping opacity-50">🌟</div>}
        {feedback === 'wrong' && <div className="absolute inset-0 bg-red-400/10 flex items-center justify-center text-9xl animate-shake">❌</div>}
        
        <div className="text-slate-300 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Target</div>
        <h1 
          onClick={() => handleSpeak(`Find ${type === 'letter' ? question.letter : question.value}`)}
          className="text-[12rem] md:text-[18rem] font-fredoka leading-none text-slate-800 cursor-pointer hover:scale-105 transition-transform drop-shadow-sm select-none"
        >
          {type === 'letter' ? question.letter : question.value}
        </h1>
        <div className="mt-4 text-slate-400 font-bold flex items-center gap-2">
           <span>Tap to hear again</span>
           <span className="text-xl">🔊</span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(opt)}
            className={`w-full p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center gap-4 transition-all transform hover:-translate-y-2 active:scale-95 ${opt.color} text-white group`}
          >
            <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform">{opt.emoji || '🔢'}</span>
            <span className="text-2xl md:text-3xl font-fredoka uppercase tracking-wide">{opt.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizView;
