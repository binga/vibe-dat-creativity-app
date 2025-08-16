"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWordEvolution } from "@/lib/game-data";
import { TrendingUp, Plus, Minus, ArrowRight } from "lucide-react";

export function WordEvolutionTracker() {
  const evolution = getWordEvolution();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Word Evolution & Optimization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-sm text-gray-600 mb-4">
            Track how words were systematically replaced to maximize semantic distance using hillclimbing optimization.
          </div>
          
          {evolution.map((change, index) => (
            <div key={change.round} className="border-l-2 border-blue-200 pl-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Round {change.round}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Optimization step</span>
              </div>
              
              <div className="space-y-3">
                {change.changes.filter(c => c.type === 'removed').length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Minus className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">Removed</span>
                      <span className="text-xs text-gray-500">(Lower semantic distance)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {change.changes
                        .filter(c => c.type === 'removed')
                        .map((c) => (
                          <Badge 
                            key={c.word} 
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            {c.word}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
                
                {change.changes.filter(c => c.type === 'added').length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Plus className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">Added</span>
                      <span className="text-xs text-gray-500">(Higher semantic distance)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {change.changes
                        .filter(c => c.type === 'added')
                        .map((c) => (
                          <Badge 
                            key={c.word} 
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {c.word}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  This change increased the overall semantic distance between word pairs.
                </div>
              </div>
            </div>
          ))}
          
          {evolution.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No word changes detected in the progression.</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Hillclimbing Strategy</h4>
          <p className="text-sm text-blue-800">
            Each word replacement represents a &ldquo;hill climbing&rdquo; step where words with lower semantic 
            distances to other words in the set were systematically replaced with words that had 
            higher distances, improving the overall creativity score.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}