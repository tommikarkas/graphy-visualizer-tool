import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { GraphVisualization } from "@/components/GraphVisualization";
import { processJsonToGraph } from "@/utils/graphUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [graphData, setGraphData] = useState<{
    nodes: any[];
    edges: any[];
  } | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDataReceived = (data: any) => {
    const processed = processJsonToGraph(data);
    setGraphData(processed);
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResponse("Processing your request...");

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResponse(`Here's a simulated response to your prompt: "${prompt}"\n\nI understand you want to make changes to the application. In a real implementation, I would help you modify the code based on your request.`);
      
      toast({
        title: "Success",
        description: "Response generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Original Graph Visualizer */}
      <div className="w-1/2 p-8 border-r border-gray-200">
        <div className="mb-8 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1615751072497-5f5169febe17" 
            alt="Cute puppy" 
            className="rounded-lg shadow-lg max-w-[300px] h-auto"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-center">
          JSON Network Graph Visualizer
        </h1>
        
        {!graphData && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onDataReceived={handleDataReceived} />
          </div>
        )}

        {graphData && (
          <div className="mt-8">
            <GraphVisualization initialData={graphData} />
          </div>
        )}
      </div>

      {/* Right side - Lovable.dev style UI */}
      <div className="w-1/2 p-8 bg-[#1a1a1a] text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Lovable.dev Editor</h2>
          
          <div className="space-y-6">
            <div className="bg-[#2a2a2a] p-6 rounded-lg">
              <Label htmlFor="prompt" className="text-sm text-gray-300 mb-2 block">
                Enter your prompt
              </Label>
              <div className="flex gap-2">
                <Input
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your instructions here..."
                  className="bg-[#333333] border-[#444444] text-white"
                />
                <Button 
                  onClick={handlePromptSubmit}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isProcessing ? "Processing..." : "Send"}
                </Button>
              </div>
            </div>

            <div className="bg-[#2a2a2a] p-6 rounded-lg h-[500px] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Response</h3>
              <div className="text-gray-400 whitespace-pre-wrap">
                {response || "Your AI response will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;