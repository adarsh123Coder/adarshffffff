
export enum View {
  HOME = 'HOME',
  ALPHABET = 'ALPHABET',
  NUMBERS = 'NUMBERS',
  ALPHABET_QUIZ = 'ALPHABET_QUIZ',
  NUMBER_QUIZ = 'NUMBER_QUIZ'
}

export interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
  color: string;
}

export interface NumberItem {
  value: number;
  word: string;
  color: string;
}
