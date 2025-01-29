import { Node, Edge } from "reactflow";

export const processJsonToGraph = (data: any) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const processedNodes = new Set();

  const addNode = (id: string, data: any) => {
    if (!processedNodes.has(id)) {
      processedNodes.add(id);
      nodes.push({
        id,
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: { label: id, ...data },
        style: {
          background: "#4338ca",
          color: "white",
          border: "none",
          width: 150,
          borderRadius: "8px",
        },
      });
    }
  };

  const processObject = (obj: any, parentId?: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentId = parentId ? `${parentId}-${key}` : key;
      addNode(currentId, { value });

      if (parentId) {
        edges.push({
          id: `${parentId}-${currentId}`,
          source: parentId,
          target: currentId,
          style: { stroke: "#6366f1" },
        });
      }

      if (value && typeof value === "object") {
        processObject(value, currentId);
      }
    });
  };

  processObject(data);
  return { nodes, edges };
};