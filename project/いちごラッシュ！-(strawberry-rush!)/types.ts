export type GameState = 'start' | 'playing' | 'gameOver';

export interface Item {
  name: string;
  emoji: string;
}

export interface RankingEntry {
  score: number;
  date: string;
}
