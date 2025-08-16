import { GameProgression, GameRound, FinalScoreMatrix } from "@/types/game-data";

export const gameData: GameProgression = {
  startTime: "2025-08-16T23:53:03",
  endTime: "2025-08-17T01:39:31",
  rounds: [
    {
      id: "round-1",
      timestamp: "2025-08-16T23:53:03",
      screenshotPath: "/screenshots/Screenshot 2025-08-16 at 23.53.03.png",
      words: ["brilliance", "sports", "peace", "rocket", "icecream", "blush", "friends", "rhythm", "velvet", "ocean"],
      roundNumber: 1
    },
    {
      id: "round-2",
      timestamp: "2025-08-17T00:00:17",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 00.00.17.png",
      words: ["stochastic", "fuselage", "pitfall", "screwdriver", "sand", "spices", "arthritis", "printer", "flute", "dinosaurs"],
      roundNumber: 2
    },
    {
      id: "round-3",
      timestamp: "2025-08-17T00:00:40",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 00.00.40.png",
      words: ["stochastic", "fuselage", "pitfall", "screwdriver", "sand", "spices", "arthritis", "printer", "flute", "dinosaurs"],
      roundNumber: 3
    },
    {
      id: "round-4",
      timestamp: "2025-08-17T01:33:49",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.33.49.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "remote", "arthritis", "printer", "eel", "speedbreaker"],
      roundNumber: 4
    },
    {
      id: "round-5",
      timestamp: "2025-08-17T01:33:59",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.33.59.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "remote", "arthritis", "printer", "eel", "speedbreaker"],
      roundNumber: 5
    },
    {
      id: "round-6",
      timestamp: "2025-08-17T01:34:51",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.34.51.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "remote", "arthritis", "printer", "eel", "speedbreaker"],
      roundNumber: 6
    },
    {
      id: "round-7",
      timestamp: "2025-08-17T01:35:00",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.35.00.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "remote", "arthritis", "printer", "eel", "speedbreaker"],
      roundNumber: 7
    },
    {
      id: "round-8",
      timestamp: "2025-08-17T01:36:24",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.36.24.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "corporate", "arthritis", "butter", "eel", "speedbreaker"],
      roundNumber: 8
    },
    {
      id: "round-9",
      timestamp: "2025-08-17T01:36:35",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.36.35.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "cricket", "corporate", "arthritis", "butter", "eel", "speedbreaker"],
      roundNumber: 9
    },
    {
      id: "round-10",
      timestamp: "2025-08-17T01:38:24",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.38.24.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "foosball", "corporate", "arthritis", "chilli", "lens", "speedbreaker"],
      roundNumber: 10
    },
    {
      id: "round-11",
      timestamp: "2025-08-17T01:38:36",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.38.36.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "foosball", "corporate", "arthritis", "chilli", "lens", "speedbreaker"],
      roundNumber: 11
    },
    {
      id: "round-12",
      timestamp: "2025-08-17T01:39:08",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.39.08.png",
      words: ["stochastic", "fuselage", "throne", "icecream", "foosball", "corporate", "arthritis", "chilli", "lens", "speedbreaker"],
      roundNumber: 12
    },
    {
      id: "round-final",
      timestamp: "2025-08-17T01:39:31",
      screenshotPath: "/screenshots/Screenshot 2025-08-17 at 01.39.31.png",
      words: ["stochastic", "fuselage", "throne", "corporate", "arthritis", "chilli", "lens"],
      roundNumber: 13
    }
  ],
  finalMatrix: {
    words: ["stochastic", "fuselage", "throne", "corporate", "arthritis", "chilli", "lens"],
    distances: [
      [0, 103, 100, 93, 94, 98, 94],
      [103, 0, 94, 98, 96, 91, 79],
      [100, 94, 0, 95, 98, 101, 98],
      [93, 98, 95, 0, 97, 100, 92],
      [94, 96, 98, 97, 0, 86, 87],
      [98, 91, 101, 100, 86, 0, 104],
      [94, 79, 98, 92, 87, 104, 0]
    ],
    finalScore: 95.08,
    percentile: 99.98
  }
};

export function getWordEvolution(): { round: number; changes: Array<{ type: 'added' | 'removed' | 'kept'; word: string }> }[] {
  const evolution = [];
  
  for (let i = 1; i < gameData.rounds.length; i++) {
    const prevWords = new Set(gameData.rounds[i - 1].words);
    const currWords = new Set(gameData.rounds[i].words);
    
    const changes: Array<{ type: 'added' | 'removed' | 'kept'; word: string }> = [];
    
    // Find removed words
    Array.from(prevWords).forEach(word => {
      if (!currWords.has(word)) {
        changes.push({ type: 'removed', word });
      } else {
        changes.push({ type: 'kept', word });
      }
    });
    
    // Find added words
    Array.from(currWords).forEach(word => {
      if (!prevWords.has(word)) {
        changes.push({ type: 'added', word });
      }
    });
    
    if (changes.some(c => c.type !== 'kept')) {
      evolution.push({
        round: gameData.rounds[i].roundNumber,
        changes
      });
    }
  }
  
  return evolution;
}