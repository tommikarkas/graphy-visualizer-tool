import { Node, Edge } from "reactflow";

export const processJsonToGraph = (data: any) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const processedNodes = new Set();

  const addNode = (id: string, data: any) => {
    if (!processedNodes.has(id)) {
      processedNodes.add(id);
      
      // Format the value for display
      const displayValue = typeof data.value === 'object' 
        ? '[Object]' 
        : String(data.value);
      
      nodes.push({
        id,
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: { 
          label: (
            <>
              <div className="font-bold">{id.split('-').pop()}</div>
              <div className="text-sm text-gray-600">{displayValue}</div>
            </>
          ),
          ...data 
        },
        style: {
          background: "#4338ca",
          color: "white",
          border: "none",
          width: 180,
          padding: "12px",
          borderRadius: "8px",
        },
        draggable: true, // This is actually the default, but explicitly setting it for clarity
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