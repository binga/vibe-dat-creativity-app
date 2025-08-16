"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, ArrowUp, RotateCcw, Target, Lightbulb } from "lucide-react";

export function HillclimbingExplanation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mountain className="h-5 w-5" />
            Understanding Hillclimbing Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-700">
            <p className="mb-4">
              <strong>Hillclimbing</strong> is a local search optimization algorithm that continuously 
              moves towards better solutions by making incremental improvements. Think of it like 
              climbing a hill in foggy weather - you can only see your immediate surroundings, 
              so you always take the step that goes uphill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ArrowUp className="h-4 w-4" />
                Algorithm Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center p-0">1</Badge>
                  <div className="text-sm">
                    <strong>Initialize:</strong> Start with a random solution (10 diverse words)
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center p-0">2</Badge>
                  <div className="text-sm">
                    <strong>Evaluate:</strong> Calculate semantic distances between all word pairs
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center p-0">3</Badge>
                  <div className="text-sm">
                    <strong>Find weakness:</strong> Identify the word pair with smallest distance
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center p-0">4</Badge>
                  <div className="text-sm">
                    <strong>Improve:</strong> Replace one word with a more distant alternative
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Badge className="bg-blue-500 text-white min-w-[24px] h-6 flex items-center justify-center p-0">5</Badge>
                  <div className="text-sm">
                    <strong>Repeat:</strong> Continue until no improvement is possible
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Application to DAT
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border-l-4 border-green-400">
                  <h4 className="font-medium text-green-800 mb-1">Objective Function</h4>
                  <p className="text-sm text-green-700">
                    Maximize the sum of semantic distances between all word pairs
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border-l-4 border-purple-400">
                  <h4 className="font-medium text-purple-800 mb-1">Neighbor Generation</h4>
                  <p className="text-sm text-purple-700">
                    Replace one word at a time with alternatives from vocabulary
                  </p>
                </div>
                <div className="p-3 bg-orange-50 border-l-4 border-orange-400">
                  <h4 className="font-medium text-orange-800 mb-1">Local Optimum</h4>
                  <p className="text-sm text-orange-700">
                    Stop when no single word replacement improves the score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Strategy Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Why Hillclimbing Works Here</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Greedy improvement:</strong> Each word replacement immediately improves the score</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Fast convergence:</strong> Reaches a good solution quickly</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Intuitive process:</strong> Mimics how humans naturally optimize</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Potential Limitations</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Local optima:</strong> May get stuck in suboptimal solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Initial dependency:</strong> Result depends on starting words</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Single-word changes:</strong> Cannot make coordinated multi-word swaps</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              My Implementation Result
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              Despite these theoretical limitations, the hillclimbing approach was highly effective 
              for the DAT creativity game, achieving a score of <strong>95.08</strong> and ranking 
              in the <strong>99.98th percentile</strong>.
            </p>
            <p className="text-sm text-gray-600">
              This success suggests that the semantic distance landscape for this problem has 
              favorable properties for local search, with relatively few problematic local optima.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}