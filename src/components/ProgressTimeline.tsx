"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { gameData } from "@/lib/game-data";
import { Clock, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export function ProgressTimeline() {
  const [selectedRound, setSelectedRound] = useState<string | null>(null);
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getWordChanges = (roundIndex: number) => {
    if (roundIndex === 0) return null;
    
    const prevWords = new Set(gameData.rounds[roundIndex - 1].words);
    const currWords = new Set(gameData.rounds[roundIndex].words);
    
    const added = Array.from(currWords).filter(word => !prevWords.has(word));
    const removed = Array.from(prevWords).filter(word => !currWords.has(word));
    
    return { added, removed };
  };

  const selectedRoundData = gameData.rounds.find(round => round.id === selectedRound);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Game Progress Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gameData.rounds.map((round, index) => {
            const changes = getWordChanges(index);
            const isSignificantChange = changes && (changes.added.length > 0 || changes.removed.length > 0);
            
            return (
              <div key={round.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isSignificantChange 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {round.roundNumber}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      Round {round.roundNumber}
                      {isSignificantChange && (
                        <Zap className="inline-block ml-1 h-4 w-4 text-yellow-500" />
                      )}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {formatTime(round.timestamp)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {round.words.slice(0, 5).map((word) => (
                      <Badge key={word} variant="secondary" className="text-xs">
                        {word}
                      </Badge>
                    ))}
                    {round.words.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{round.words.length - 5} more
                      </Badge>
                    )}
                  </div>
                  
                  {changes && (changes.added.length > 0 || changes.removed.length > 0) && (
                    <div className="flex items-center gap-2 text-sm">
                      {changes.added.length > 0 && (
                        <span className="text-green-600">
                          +{changes.added.length} added
                        </span>
                      )}
                      {changes.removed.length > 0 && (
                        <span className="text-red-600">
                          -{changes.removed.length} removed
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedRound(round.id)}
                    >
                      View <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Round {round.roundNumber} - {formatTime(round.timestamp)}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={round.screenshotPath}
                          alt={`Screenshot from round ${round.roundNumber}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Words in this round:</h4>
                        <div className="flex flex-wrap gap-2">
                          {round.words.map((word) => (
                            <Badge key={word} variant="secondary">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {changes && (changes.added.length > 0 || changes.removed.length > 0) && (
                        <div className="space-y-2">
                          {changes.added.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-green-600 mb-1">Added words:</h5>
                              <div className="flex flex-wrap gap-1">
                                {changes.added.map((word) => (
                                  <Badge key={word} className="bg-green-100 text-green-800 border-green-300">
                                    +{word}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {changes.removed.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-red-600 mb-1">Removed words:</h5>
                              <div className="flex flex-wrap gap-1">
                                {changes.removed.map((word) => (
                                  <Badge key={word} className="bg-red-100 text-red-800 border-red-300">
                                    -{word}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}