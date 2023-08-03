export interface Card {
  word: string;
  answer: 'BOMB' | 'RED' | 'BLUE';
}

export interface GameData {
  cards: Card[];
  redCount: number;
  bombCount: number;
  blueCount: number;
  seed: number;
}
