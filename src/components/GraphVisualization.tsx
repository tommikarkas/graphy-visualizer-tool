
import { ReactFlow, Background, Controls, Node, Edge, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface GraphVisualizationProps {
  initialData: {
    nodes: Node[];
    edges: Edge[];
  };
}

export const GraphVisualization = ({ initialData }: GraphVisualizationProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges] = useEdgesState(initialData.edges);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
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
