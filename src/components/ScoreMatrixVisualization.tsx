"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gameData } from "@/lib/game-data";
import { Grid3X3, Target } from "lucide-react";

interface HoveredCell {
  word1: string;
  word2: string;
  distance: number;
}

export function ScoreMatrixVisualization() {
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);
  const { words, distances, finalScore } = gameData.finalMatrix;

  const getColorIntensity = (distance: number) => {
    const maxDistance = Math.max(...distances.flat());
    const minDistance = Math.min(...distances.flat().filter(d => d > 0));
    const normalizedDistance = (distance - minDistance) / (maxDistance - minDistance);
    
    if (distance === 0) return "bg-gray-200";
    
    const intensity = Math.floor(normalizedDistance * 4) + 1;
    return `bg-green-${intensity * 100} hover:bg-green-${Math.min(intensity * 100 + 100, 900)}`;
  };

  const getCellClasses = (distance: number) => {
    if (distance === 0) {
      return "bg-gray-200 text-gray-500";
    }
    
    const maxDistance = Math.max(...distances.flat());
    const intensity = distance / maxDistance;
    
    if (intensity > 0.8) return "bg-green-500 text-white hover:bg-green-600";
    if (intensity > 0.6) return "bg-green-400 text-white hover:bg-green-500";
    if (intensity > 0.4) return "bg-green-300 text-gray-900 hover:bg-green-400";
    if (intensity > 0.2) return "bg-green-200 text-gray-900 hover:bg-green-300";
    return "bg-green-100 text-gray-900 hover:bg-green-200";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Semantic Distance Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Interactive matrix showing semantic distances between final word pairs
            </p>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <Badge className="bg-green-100 text-green-800">
                Score: {finalScore}
              </Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-2"></th>
                    {words.map((word, index) => (
                      <th key={index} className="p-2 text-xs font-medium text-gray-600 min-w-[60px]">
                        <div className="transform -rotate-45 origin-bottom-left whitespace-nowrap">
                          {word}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {words.map((rowWord, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-2 text-xs font-medium text-gray-600 sticky left-0 bg-white">
                        <div className="max-w-[80px] truncate" title={rowWord}>
                          {rowWord}
                        </div>
                      </td>
                      {words.map((colWord, colIndex) => {
                        const distance = distances[rowIndex][colIndex];
                        return (
                          <td 
                            key={colIndex} 
                            className="p-1"
                            onMouseEnter={() => setHoveredCell({
                              word1: rowWord,
                              word2: colWord,
                              distance
                            })}
                            onMouseLeave={() => setHoveredCell(null)}
                          >
                            <div 
                              className={`
                                w-12 h-12 flex items-center justify-center text-xs font-medium 
                                rounded cursor-pointer transition-colors duration-200
                                ${getCellClasses(distance)}
                              `}
                            >
                              {distance}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {hoveredCell && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm">
                <span className="font-medium text-blue-900">
                  {hoveredCell.word1} ↔ {hoveredCell.word2}
                </span>
                <span className="text-blue-700 ml-2">
                  Distance: {hoveredCell.distance}
                </span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {hoveredCell.distance === 0 
                  ? "Same word (diagonal)"
                  : `Higher values indicate more semantically distant concepts`
                }
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 rounded"></div>
                <span>Low distance</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-300 rounded"></div>
                <span>Medium distance</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>High distance</span>
              </div>
            </div>
            <span>Matrix is symmetric</span>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Matrix Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Average Distance:</span>
                <div className="text-lg font-semibold text-green-600">
                  {(distances.flat().filter(d => d > 0).reduce((a, b) => a + b, 0) / distances.flat().filter(d => d > 0).length).toFixed(1)}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Highest Distance:</span>
                <div className="text-lg font-semibold text-blue-600">
                  {Math.max(...distances.flat())}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Lowest Distance:</span>
                <div className="text-lg font-semibold text-orange-600">
                  {Math.min(...distances.flat().filter(d => d > 0))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}