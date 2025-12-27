
import { AlphabetItem, NumberItem } from './types';

export const ALPHABET_DATA: AlphabetItem[] = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: 'bg-red-400' },
  { letter: 'B', word: 'Bear', emoji: '🐻', color: 'bg-orange-400' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: 'bg-yellow-400' },
  { letter: 'D', word: 'Dog', emoji: '🐶', color: 'bg-green-400' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: 'bg-blue-400' },
  { letter: 'F', word: 'Frog', emoji: '🐸', color: 'bg-purple-400' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', color: 'bg-pink-400' },
  { letter: 'H', word: 'Horse', emoji: '🐴', color: 'bg-red-300' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: 'bg-indigo-400' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', color: 'bg-cyan-400' },
  { letter: 'K', word: 'Kangaroo', emoji: '🦘', color: 'bg-lime-400' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: 'bg-teal-400' },
  { letter: 'M', word: 'Monkey', emoji: '🐒', color: 'bg-amber-400' },
  { letter: 'N', word: 'Newt', emoji: '🦎', color: 'bg-violet-400' },
  { letter: 'O', word: 'Owl', emoji: '🦉', color: 'bg-fuchsia-400' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', color: 'bg-rose-400' },
  { letter: 'Q', word: 'Quail', emoji: '🐦', color: 'bg-emerald-400' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', color: 'bg-sky-400' },
  { letter: 'S', word: 'Snake', emoji: '🐍', color: 'bg-orange-300' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', color: 'bg-yellow-500' },
  { letter: 'U', word: 'Unicorn', emoji: '🦄', color: 'bg-purple-300' },
  { letter: 'V', word: 'Vulture', emoji: '🦅', color: 'bg-gray-400' },
  { letter: 'W', word: 'Whale', emoji: '🐳', color: 'bg-blue-500' },
  { letter: 'X', word: 'Xylophone', emoji: '🪘', color: 'bg-green-300' },
  { letter: 'Y', word: 'Yak', emoji: '🐂', color: 'bg-brown-400' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'bg-slate-500' },
];

export const NUMBER_DATA: NumberItem[] = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  word: [
    'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
  ][i],
  color: [
    'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400',
    'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-teal-400', 'bg-rose-400'
  ][i]
}));
