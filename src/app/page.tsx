import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressTimeline } from "@/components/ProgressTimeline";
import { WordEvolutionTracker } from "@/components/WordEvolutionTracker";
import { ScoreMatrixVisualization } from "@/components/ScoreMatrixVisualization";
import { HillclimbingExplanation } from "@/components/HillclimbingExplanation";
import { StatsDashboard } from "@/components/StatsDashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DAT Creativity Game Progress
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An interactive visualization of my journey through the Divergent Association Task (DAT) 
            creativity game, showcasing the hillclimbing optimization technique.
          </p>
        </div>

        <div className="space-y-8">
          <StatsDashboard />
          
          <ProgressTimeline />
          
          <WordEvolutionTracker />
          
          <ScoreMatrixVisualization />
          
          <HillclimbingExplanation />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What is the DAT Creativity Game?</CardTitle>
              <CardDescription>Understanding the Divergent Association Task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Divergent Association Task (DAT) is a creativity assessment that measures your ability 
                to think of diverse, unrelated concepts. Players must generate 10 words that are as 
                semantically distant from each other as possible.
              </p>
              <p className="text-gray-700">
                The challenge lies in finding words that share minimal conceptual overlap, requiring 
                creative thinking and broad knowledge across different domains.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}