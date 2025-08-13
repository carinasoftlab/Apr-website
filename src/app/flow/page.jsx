// "use client";

// import React, { useEffect, useMemo } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useEdgesState,
//   useNodesState,
//   ReactFlowProvider,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import dagre from "dagre";
// import employeesData from "@/components/data/panchayati-raj-employees-updated-clean.json";

// // ---- Dagre auto-layout ----
// const NODE_W = 220;
// const NODE_H = 100;
// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));
// function layout(nodes, edges, dir = "TB") {
//   const g = dagreGraph;
//   g.setGraph({ rankdir: dir, nodesep: 40, ranksep: 80 });
//   nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
//   edges.forEach((e) => g.setEdge(e.source, e.target));
//   dagre.layout(g);
//   const layouted = nodes.map((n) => {
//     const p = g.node(n.id);
//     return { ...n, position: { x: p.x - NODE_W / 2, y: p.y - NODE_H / 2 } };
//   });
//   return { nodes: layouted, edges };
// }

// // ---- Convert JSON to nodes & edges ----
// function buildFromData() {
//   const nodes = employeesData.employees.map((emp) => ({
//     id: emp.id.toString(),
//     data: {
//       label: (
//         <div className="text-center p-2">
//           {emp.image && (
//             <img
//               src={emp.image}
//               alt={emp.name}
//               className="mx-auto mb-1 w-10 h-10 rounded-full object-cover border"
//             />
//           )}
//           <div className="font-semibold text-sm">{emp.name}</div>
//           <div className="text-xs text-gray-600 leading-tight">
//             {emp.designation}
//           </div>
//         </div>
//       ),
//     },
//     position: { x: 0, y: 0 },
//     style: {
//       background: "#fff",
//       border: "1px solid #ccc",
//       borderRadius: 8,
//       padding: 4,
//       width: NODE_W,
//     },
//     type: "default",
//   }));

//   const edges = employeesData.employees.flatMap((emp) =>
//     (emp.childId || []).map((child) => ({
//       id: `e${emp.id}-${child}`,
//       source: emp.id.toString(),
//       target: child.toString(),
//       type: "smoothstep",
//     }))
//   );

//   return { nodes, edges };
// }

// function OrgChartInner() {
//   const raw = useMemo(() => buildFromData(), []);
//   const [nodes, setNodes, onNodesChange] = useNodesState(raw.nodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(raw.edges);

//   useEffect(() => {
//     const { nodes: layoutedNodes, edges: layoutedEdges } = layout(
//       raw.nodes,
//       raw.edges,
//       "TB"
//     );
//     setNodes(layoutedNodes);
//     setEdges(layoutedEdges);
//   }, [raw.nodes, raw.edges, setNodes, setEdges]);

//   return (
//     <div className="h-[90vh] w-full">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         proOptions={{ hideAttribution: true }}
//       >
//         <MiniMap pannable zoomable />
//         <Controls showInteractive={false} />
//         <Background gap={16} />
//       </ReactFlow>
//     </div>
//   );
// }

// export default function OrgChartPage() {
//   return (
//     <div className="h-screen w-full bg-gray-50 text-gray-900">
//       <div className="max-w-[100%] mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-2">
//           Panchayati Raj Department – Organigram
//         </h1>
//         <p className="text-sm text-gray-600 mb-4">
//           Hierarchy from JSON with parent–child connections
//         </p>
//         <ReactFlowProvider>
//           <OrgChartInner />
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useMemo } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useEdgesState,
//   useNodesState,
//   ReactFlowProvider,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import dagre from "dagre";
// import employeesData from "@/components/data/panchayati-raj-employees-updated-clean.json";

// // ---- Dagre auto-layout ----
// const NODE_W = 220;
// const NODE_H = 100;
// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));
// function layout(nodes, edges, dir = "TB") {
//   const g = dagreGraph;
//   g.setGraph({ rankdir: dir, nodesep: 40, ranksep: 80 });
//   nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
//   edges.forEach((e) => g.setEdge(e.source, e.target));
//   dagre.layout(g);
//   const layouted = nodes.map((n) => {
//     const p = g.node(n.id);
//     return {
//       ...n,
//       position: { x: p.x - NODE_W / 2, y: p.y - NODE_H / 2 },
//       draggable: false,
//     };
//   });
//   return { nodes: layouted, edges };
// }

// // ---- Convert JSON to nodes & edges ----
// function buildFromData() {
//   const nodes = employeesData.employees.map((emp) => ({
//     id: emp.id.toString(),
//     data: {
//       label: (
//         <div className="text-center p-2">
//           {emp.image && (
//             <img
//               src={emp.image}
//               alt={emp.name}
//               className="mx-auto mb-1 w-10 h-10 rounded-full object-cover border"
//             />
//           )}
//           <div className="font-semibold text-sm">{emp.name}</div>
//           <div className="text-xs text-gray-600 leading-tight">
//             {emp.designation}
//           </div>
//         </div>
//       ),
//     },
//     position: { x: 0, y: 0 },
//     draggable: false,
//     style: {
//       background: "#fff",
//       border: "1px solid #ccc",
//       borderRadius: 8,
//       padding: 4,
//       width: NODE_W,
//     },
//     type: "default",
//   }));

//   const edges = employeesData.employees.flatMap((emp) =>
//     (emp.childId || []).map((child) => ({
//       id: `e${emp.id}-${child}`,
//       source: emp.id.toString(),
//       target: child.toString(),
//       type: "smoothstep",
//     }))
//   );

//   return { nodes, edges };
// }

// function OrgChartInner() {
//   const raw = useMemo(() => buildFromData(), []);
//   const [nodes, setNodes, onNodesChange] = useNodesState(raw.nodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(raw.edges);

//   useEffect(() => {
//     const { nodes: layoutedNodes, edges: layoutedEdges } = layout(
//       raw.nodes,
//       raw.edges,
//       "TB"
//     );
//     setNodes(layoutedNodes);
//     setEdges(layoutedEdges);
//   }, [raw.nodes, raw.edges, setNodes, setEdges]);

//   return (
//     <div className="h-[90vh] w-full">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         nodesDraggable={false}
//         proOptions={{ hideAttribution: true }}
//       >
//         <MiniMap pannable zoomable />
//         <Controls showInteractive={false} />
//         <Background gap={16} />
//       </ReactFlow>
//     </div>
//   );
// }

// export default function OrgChartPage() {
//   return (
//     <div className="h-screen w-full bg-gray-50 text-gray-900">
//       <div className="mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-2">
//           Panchayati Raj Department – Organigram
//         </h1>
//         <p className="text-sm text-gray-600 mb-4">
//           Hierarchy from JSON with parent–child connections
//         </p>
//         <ReactFlowProvider>
//           <OrgChartInner />
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import employeesData from "@/components/data/panchayati-raj-employees-updated-clean.json";

// ---- Dagre auto-layout ----
const NODE_W = 240;
const NODE_H = 120;
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
function layout(nodes, edges, dir = "TB") {
  const g = dagreGraph;
  g.setGraph({ rankdir: dir, nodesep: 60, ranksep: 100 });
  nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
  edges.forEach((e) => g.setEdge(e.source, e.target));
  dagre.layout(g);
  const layouted = nodes.map((n) => {
    const p = g.node(n.id);
    return {
      ...n,
      position: { x: p.x - NODE_W / 2, y: p.y - NODE_H / 2 },
      draggable: true,
    };
  });
  return { nodes: layouted, edges };
}

// ---- Color palette for parent edges ----
const colors = [
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
];
function getColorByParentId(parentId) {
  const index = parseInt(parentId, 10) % colors.length;
  return colors[index];
}

// ---- Convert JSON to nodes & edges ----
function buildFromData() {
  const nodes = employeesData.employees.map((emp) => ({
    id: emp.id.toString(),
    data: {
      label: (
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md border border-gray-200">
          {emp.image && (
            <img
              src={emp.image}
              alt={emp.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-300 mb-2"
            />
          )}
          <div className="font-semibold text-sm text-gray-900 text-center leading-tight">
            {emp.name}
          </div>
          <div className="text-xs text-gray-600 text-center leading-snug">
            {emp.designation}
          </div>
          {emp.placeOfPosting && (
            <div className="mt-1 text-[10px] text-gray-500 italic">
              {emp.placeOfPosting}
            </div>
          )}
        </div>
      ),
    },
    position: { x: 0, y: 0 },
    draggable: true,
    style: {
      width: NODE_W,
      background: "transparent",
      border: "none",
      padding: 0,
    },
    type: "default",
  }));

  const edges = employeesData.employees.flatMap((emp) =>
    (emp.childId || []).map((child) => {
      const color = getColorByParentId(emp.id);
      return {
        id: `e${emp.id}-${child}`,
        source: emp.id.toString(),
        target: child.toString(),
        type: "smoothstep",
        style: { stroke: color, strokeWidth: 2 },
        animated: true,
      };
    })
  );

  return { nodes, edges };
}

function OrgChartInner() {
  const raw = useMemo(() => buildFromData(), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(raw.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(raw.edges);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = layout(
      raw.nodes,
      raw.edges,
      "TB"
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [raw.nodes, raw.edges, setNodes, setEdges]);

  return (
    <div className="h-[90vh] w-full bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesDraggable={true}
        panOnScroll
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap pannable zoomable nodeStrokeColor={(n) => "#4B5563"} />
        <Controls showInteractive={true} />
        <Background gap={20} color="#E5E7EB" />
      </ReactFlow>
    </div>
  );
}

export default function OrgChartPage() {
  return (
    <div className="h-screen w-full bg-gray-100 text-gray-900">
      <div className="max-w-[1400px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-3 text-center">
          Panchayati Raj Department – Organigram
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Visual representation of the hierarchy
        </p>
        <ReactFlowProvider>
          <OrgChartInner />
        </ReactFlowProvider>
      </div>
    </div>
  );
}
