"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gameData } from "@/lib/game-data";
import { BarChart3, Clock, Trophy, TrendingUp, Users, Zap } from "lucide-react";

export function StatsDashboard() {
  const { rounds, finalMatrix, startTime, endTime } = gameData;
  
  const totalDuration = new Date(endTime).getTime() - new Date(startTime).getTime();
  const durationMinutes = Math.floor(totalDuration / (1000 * 60));
  
  const uniqueWords = new Set(rounds.flatMap(round => round.words));
  const totalUniqueWords = uniqueWords.size;
  
  const wordChanges = rounds.slice(1).reduce((acc, round, index) => {
    const prevWords = new Set(rounds[index].words);
    const currWords = new Set(round.words);
    const changes = Array.from(currWords).filter(word => !prevWords.has(word)).length +
                   Array.from(prevWords).filter(word => !currWords.has(word)).length;
    return acc + changes;
  }, 0);

  const averageDistance = finalMatrix.distances
    .flat()
    .filter(d => d > 0)
    .reduce((a, b) => a + b, 0) / finalMatrix.distances.flat().filter(d => d > 0).length;

  const maxDistance = Math.max(...finalMatrix.distances.flat());
  const minDistance = Math.min(...finalMatrix.distances.flat().filter(d => d > 0));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-6 w-6 text-green-600" />
              <Badge className="bg-green-500 text-white">Top 0.02%</Badge>
            </div>
            <div className="text-2xl font-bold text-green-700">{finalMatrix.finalScore}</div>
            <div className="text-sm text-green-600">Final Creativity Score</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-6 w-6 text-blue-600" />
              <Badge variant="outline" className="border-blue-300 text-blue-700">Percentile</Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700">{finalMatrix.percentile}%</div>
            <div className="text-sm text-blue-600">Better than others</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-6 w-6 text-purple-600" />
              <Badge variant="outline" className="border-purple-300 text-purple-700">Duration</Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700">{durationMinutes}m</div>
            <div className="text-sm text-purple-600">Total game time</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-6 w-6 text-orange-600" />
              <Badge variant="outline" className="border-orange-300 text-orange-700">Optimization</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-700">{rounds.length}</div>
            <div className="text-sm text-orange-600">Optimization rounds</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-6 w-6 text-pink-600" />
              <Badge variant="outline" className="border-pink-300 text-pink-700">Changes</Badge>
            </div>
            <div className="text-2xl font-bold text-pink-700">{wordChanges}</div>
            <div className="text-sm text-pink-600">Total word swaps</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
              <Badge variant="outline" className="border-indigo-300 text-indigo-700">Vocabulary</Badge>
            </div>
            <div className="text-2xl font-bold text-indigo-700">{totalUniqueWords}</div>
            <div className="text-sm text-indigo-600">Unique words used</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Semantic Distance Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Average Distance</div>
              <div className="text-xl font-bold text-gray-900">{averageDistance.toFixed(1)}</div>
              <div className="text-xs text-gray-500">Across all word pairs</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Maximum Distance</div>
              <div className="text-xl font-bold text-gray-900">{maxDistance}</div>
              <div className="text-xs text-gray-500">Most distant pair</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-600 mb-1">Minimum Distance</div>
              <div className="text-xl font-bold text-gray-900">{minDistance}</div>
              <div className="text-xs text-gray-500">Closest pair (non-zero)</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Key Insights</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Achieved exceptional creativity score through systematic optimization</li>
              <li>• Hillclimbing algorithm effectively explored the semantic space</li>
              <li>• {Math.round(wordChanges / rounds.length * 100) / 100} average word changes per round shows focused refinement</li>
              <li>• High semantic distances indicate successful divergent thinking</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}