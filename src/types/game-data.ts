export interface GameRound {
  id: string;
  timestamp: string;
  screenshotPath: string;
  words: string[];
  roundNumber: number;
}

export interface SemanticDistance {
  word1: string;
  word2: string;
  distance: number;
}

export interface FinalScoreMatrix {
  words: string[];
  distances: number[][];
  finalScore: number;
  percentile: number;
}

export interface GameProgression {
  rounds: GameRound[];
  finalMatrix: FinalScoreMatrix;
  startTime: string;
  endTime: string;
}