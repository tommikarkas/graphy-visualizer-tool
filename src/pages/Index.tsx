import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { GraphVisualization } from "@/components/GraphVisualization";
import { processJsonToGraph } from "@/utils/graphUtils";

const Index = () => {
  const [graphData, setGraphData] = useState<{
    nodes: any[];
    edges: any[];
  } | null>(null);

  const handleDataReceived = (data: any) => {
    const processed = processJsonToGraph(data);
    setGraphData(processed);
  };

  return (
    <div className="container mx-auto py-8 px-4">
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
  );
};

export default Index;