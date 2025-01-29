import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

interface GraphVisualizationProps {
  initialData: {
    nodes: Node[];
    edges: Edge[];
  };
}

export const GraphVisualization = ({ initialData }: GraphVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  const onInit = useCallback(() => {
    window.requestAnimationFrame(() => {
      const flow = document.querySelector(".react-flow");
      const { width, height } = flow?.getBoundingClientRect() || {
        width: 0,
        height: 0,
      };
      const zoom = Math.min(width / 1000, height / 1000, 1);
      const x = (width - 1000 * zoom) / 2;
      const y = (height - 1000 * zoom) / 2;
      const transform = `translate(${x}px, ${y}px) scale(${zoom})`;
      flow?.style.setProperty("transform", transform);
    });
  }, []);

  return (
    <div className="w-full h-[600px] bg-graph-background rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        onInit={onInit}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <Panel position="top-left" className="bg-white p-2 rounded shadow-md">
          <h3 className="text-sm font-medium">Network Graph</h3>
        </Panel>
      </ReactFlow>
    </div>
  );
};