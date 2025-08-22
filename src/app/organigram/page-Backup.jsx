"use client";

import React, { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import employeesData from "@/components/data/panchayati-raj-employees-updated-clean.json";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";

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
      draggable: false,
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

const placeholderImage = "images/organigram/placeholder.png"; // <-- put your placeholder image path here

// ---- Convert JSON to nodes & edges ----
function buildFromData() {
  const nodes = employeesData.employees.map((emp) => ({
    id: emp.id.toString(),
    data: {
      label: (
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md border border-gray-200">
          <img
            src={
              emp.image && emp.image.trim() !== ""
                ? emp.image
                : placeholderImage
            }
            alt={emp.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-300 mb-2"
          />
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
    draggable: false,
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
  const { setCenter } = useReactFlow();

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = layout(
      raw.nodes,
      raw.edges,
      "TB"
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    // Center view on node with id '0'
    const rootNode = layoutedNodes.find((n) => n.id === "1");
    if (rootNode) {
      setTimeout(() => {
        setCenter(
          rootNode.position.x + NODE_W / 2,
          rootNode.position.y + NODE_H / 2,
          {
            zoom: 1.5,
            duration: 800,
          }
        );
      }, 100);
    }
  }, [raw.nodes, raw.edges, setNodes, setEdges, setCenter]);

  return (
    <div className="h-[90vh] w-full bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesDraggable={true}   // stop dragging cards
        panOnScroll
        zoomOnScroll
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap pannable zoomable nodeStrokeColor={(n) => "#4B5563"} />
        <Controls showInteractive={true}  style={{ top: 20, left: 20, height: 0 }} />

        <Background gap={20} color="#E5E7EB" />
      </ReactFlow>
    </div>
  );
}

export default function OrgChartPage() {
  return (
    <>
      <Header />
      <div className="h-screen  w-full bg-gradient-to-t from-prime-bg to-white text-gray-900 mt-7 mb-[20vh]">
        <div className=" mx-auto p-6">
          <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-800 leading-tight mb-6 uppercase">
              Panchayati Raj Department – Organigram
            </h1>
            <p className="text-sm text-center md:text-base lg:text-lg 2xl:text-xl 2xl:leading-relaxed text-gray-700 max-w-7xl">
              Visual representation of the hierarchy
            </p>
          </div>
          <ReactFlowProvider>
            <OrgChartInner />
          </ReactFlowProvider>
        </div>
      </div>
      <Footer />
    </>
  );
}

// "use client";

// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useEdgesState,
//   useNodesState,
//   ReactFlowProvider,
//   useReactFlow,
// } from "reactflow";
// import dagre from "dagre";
// import "reactflow/dist/style.css";
// import employeesData from "@/components/data/panchayati-raj-employees-updated-clean.json";

// const NODE_W = 240;
// const NODE_H = 120;
// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// function layout(nodes, edges, dir = "TB") {
//   const g = dagreGraph;
//   g.setGraph({ rankdir: dir, nodesep: 60, ranksep: 100 });
//   nodes.forEach((n) => g.setNode(n.id, { width: NODE_W, height: NODE_H }));
//   edges.forEach((e) => g.setEdge(e.source, e.target));
//   dagre.layout(g);
//   return nodes.map((n) => {
//     const p = g.node(n.id);
//     return { ...n, position: { x: p.x - NODE_W / 2, y: p.y - NODE_H / 2 } };
//   });
// }

// const placeholderImage = "images/organigram/placeholder.png";

// function createNode(emp) {
//   return {
//     id: emp.id.toString(),
//     data: {
//       label: (
//         <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md border border-gray-200">
//           <img
//             src={emp.image?.trim() ? emp.image : placeholderImage}
//             alt={emp.name}
//             className="w-12 h-12 rounded-full object-cover border border-gray-300 mb-2"
//           />
//           <div className="font-semibold text-sm text-gray-900 text-center leading-tight">
//             {emp.name}
//           </div>
//           <div className="text-xs text-gray-600 text-center leading-snug">
//             {emp.designation}
//           </div>
//         </div>
//       ),
//     },
//     position: { x: 0, y: 0 },
//     type: "default",
//   };
// }

// function OrgChartInner() {
//   const { setCenter } = useReactFlow();
//   const [expanded, setExpanded] = useState(new Set(["0"])); // root expanded
//   const [nodes, setNodes] = useNodesState([]);
//   const [edges, setEdges] = useEdgesState([]);
//   const [firstLoad, setFirstLoad] = useState(true);
//   const toggleNode = useCallback((id) => {
//     setExpanded((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   }, []);

//   useEffect(() => {
//     const buildGraph = () => {
//       const shownNodes = new Map();
//       const shownEdges = [];

//       const addNodeRecursively = (id) => {
//         const emp = employeesData.employees.find((e) => e.id.toString() === id);
//         if (!emp) return;
//         shownNodes.set(id, createNode(emp));

//         if (expanded.has(id)) {
//           (emp.childId || []).forEach((childId) => {
//             shownEdges.push({
//               id: `e${id}-${childId}`,
//               source: id,
//               target: childId.toString(),
//               type: "smoothstep",
//               animated: true,
//               style: { stroke: "#3B82F6", strokeWidth: 2 },
//             });
//             addNodeRecursively(childId.toString());
//           });
//         }
//       };

//       addNodeRecursively("0");

//       const layoutedNodes = layout(Array.from(shownNodes.values()), shownEdges);
//       return { nodes: layoutedNodes, edges: shownEdges };
//     };

//     const { nodes: builtNodes, edges: builtEdges } = buildGraph();
//     setNodes(builtNodes);
//     setEdges(builtEdges);

//     // Only center on first load
//     if (firstLoad) {
//       const rootNode = builtNodes.find((n) => n.id === "0");
//       if (rootNode) {
//         setTimeout(() => {
//           setCenter(
//             rootNode.position.x + NODE_W / 2,
//             rootNode.position.y + NODE_H / 2,
//             {
//               zoom: 1.2,
//               duration: 600,
//             }
//           );
//         }, 100);
//       }
//       setFirstLoad(false);
//     }
//   }, [expanded, setNodes, setEdges, setCenter, firstLoad]);

//   return (
//     <div className="h-[90vh] w-full bg-gray-50 rounded-lg border border-gray-200">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodeClick={(event, node) => toggleNode(node.id)}
//         fitView
//         proOptions={{ hideAttribution: true }}
//       >
//         <MiniMap pannable zoomable />
//         <Controls showInteractive />
//         <Background gap={20} color="#E5E7EB" />
//       </ReactFlow>
//     </div>
//   );
// }

// export default function OrgChartPage() {
//   return (
//     <div className="h-screen w-full bg-gray-100 text-gray-900">
//       <div className="max-w-[1400px] mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-3 text-center">
//           Panchayati Raj Department – Organigram
//         </h1>
//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Click a card to expand/collapse its children.
//         </p>
//         <ReactFlowProvider>
//           <OrgChartInner />
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// }
