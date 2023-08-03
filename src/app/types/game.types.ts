export interface Card {
  word: string;
  answer: Answer;
}

export type Answer = 'BOMB' | 'RED' | 'BLUE';

export interface GameData {
  cards: Card[];
  redCount: number;
  bombCount: number;
  blueCount: number;
  seed: number;
}
