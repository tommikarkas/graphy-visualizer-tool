import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

interface GraphVisualizationProps {
  initialData: {
    nodes: any[];
    edges: any[];
  };
}

export const GraphVisualization = ({ initialData }: GraphVisualizationProps) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        nodes={initialData.nodes}
        edges={initialData.edges}
        fitView
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};