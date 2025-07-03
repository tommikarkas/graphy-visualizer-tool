
import { ReactFlow, Background, Controls, Node, Edge, useNodesState, useEdgesState } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import "@xyflow/react/dist/style.css";

interface GraphVisualizationProps {
  initialData: {
    nodes: Node[];
    edges: Edge[];
  };
}

export const GraphVisualization = ({ initialData }: GraphVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const spreadOutNodes = () => {
    // Simple force-directed layout algorithm
    const newNodes = nodes.map((node, index) => {
      // Create a circular layout with some randomization
      const angle = (index / nodes.length) * 2 * Math.PI;
      const radius = Math.max(200, nodes.length * 30);
      const x = Math.cos(angle) * radius + Math.random() * 100 - 50;
      const y = Math.sin(angle) * radius + Math.random() * 100 - 50;
      
      return {
        ...node,
        position: { x, y }
      };
    });
    
    setNodes(newNodes);
  };

  return (
    <div className="relative" style={{ width: "100%", height: "500px" }}>
      <div className="absolute top-2 left-2 z-10">
        <Button onClick={spreadOutNodes} variant="outline" size="sm">
          Spread Out
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
