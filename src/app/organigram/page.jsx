
// import React, { useEffect, useMemo } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useEdgesState,
//   useNodesState,
//   ReactFlowProvider,
//   useReactFlow,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import dagre from "dagre";
// import employeesData from "@/components/data/newEmployeeData.json";
// import Footer from "@/components/footer/page";
// import Header from "@/components/Header/Header";

// // ---- Dagre auto-layout ----
// const NODE_W = 240; // Further reduced for horizontal layout
// const NODE_H = 150; // Further reduced for horizontal layout
// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));
// function layout(nodes, edges, dir = "LR") { // Changed from "TB" to "LR" (Left to Right)
//   const g = dagreGraph;
//   g.setGraph({ 
//     rankdir: dir, 
//     nodesep: 25, // Reduced for horizontal layout
//     ranksep: 50, // Reduced for horizontal layout
//     marginx: 15, // Reduced margins
//     marginy: 15
//   });
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

// // ---- Color palette for parent edges ----
// const colors = [
//   "#EF4444",
//   "#3B82F6",
//   "#10B981",
//   "#F59E0B",
//   "#8B5CF6",
//   "#EC4899",
//   "#14B8A6",
//   "#F97316",
//   "#6366F1",
//   "#84CC16",
// ];
// function getColorByParentId(parentId) {
//   const index = parseInt(parentId, 10) % colors.length;
//   return colors[index];
// }

// const placeholderImage = "images/organigram/placeholder.png";

// // ---- Convert JSON to nodes & edges ----
// function buildFromData() {
//   const nodes = employeesData.employees.map((emp) => ({
//     id: emp.id.toString(),
//     data: {
//       label: (
//         <div className="flex flex-col items-center p-1.5 bg-white rounded-lg shadow-md border border-gray-200"> {/* Reduced padding */}
//           <img
//             src={
//               emp.image && emp.image.trim() !== ""
//                 ? emp.image
//                 : placeholderImage
//             }
//             alt={emp.name}
//             className="w-8 h-8 rounded-full object-cover border border-gray-300 mb-1" // Further reduced size
//           />
//           <div className="font-semibold text-[10px] text-gray-900 text-center leading-tight"> {/* Further reduced font */}
//             {emp.name}
//           </div>
//           <div className="text-[8px] text-gray-600 text-center leading-snug"> {/* Further reduced font */}
//             {emp.designation}
//           </div>
//           {emp.placeOfPosting && emp.placeOfPosting.trim() !== "" && (
//             <div className="mt-1 text-[7px] text-gray-500 italic"> {/* Further reduced font */}
//               {emp.placeOfPosting}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     position: { x: 0, y: 0 },
//     draggable: false,
//     style: {
//       width: NODE_W,
//       background: "transparent",
//       border: "none",
//       padding: 0,
//     },
//     type: "default",
//   }));

//   const edges = employeesData.employees.flatMap((emp) =>
//     (emp.childId || []).map((child) => {
//       const color = getColorByParentId(emp.id);
//       return {
//         id: `e${emp.id}-${child}`,
//         source: emp.id.toString(),
//         target: child.toString(),
//         type: "smoothstep",
//         style: { stroke: color, strokeWidth: 1.2 }, // Further reduced stroke width
//         animated: true,
//       };
//     })
//   );

//   return { nodes, edges };
// }

// function OrgChartInner() {
//   const raw = useMemo(() => buildFromData(), []);
//   const [nodes, setNodes, onNodesChange] = useNodesState(raw.nodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(raw.edges);
//   const { setCenter } = useReactFlow();

//   useEffect(() => {
//     const { nodes: layoutedNodes, edges: layoutedEdges } = layout(
//       raw.nodes,
//       raw.edges,
//       "LR" // Changed to horizontal layout
//     );
//     setNodes(layoutedNodes);
//     setEdges(layoutedEdges);

//     // Center view on root node with better zoom for horizontal layout
//     const rootNode = layoutedNodes.find((n) => n.id === "1");
//     if (rootNode) {
//       setTimeout(() => {
//         setCenter(
//           rootNode.position.x + NODE_W / 2,
//           rootNode.position.y + NODE_H / 2,
//           {
//             zoom: 0.6, // Reduced zoom to show more of horizontal chart
//             duration: 800,
//           }
//         );
//       }, 100);
//     }
//   }, [raw.nodes, raw.edges, setNodes, setEdges, setCenter]);

//   return (
//     <div className="h-[80vh] w-full bg-gray-50 rounded-lg border border-gray-200"> {/* Further reduced height */}
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//         fitViewOptions={{ padding: 0.05 }} // Reduced padding for horizontal layout
//         nodesDraggable={false}
//         panOnScroll
//         zoomOnScroll
//         minZoom={0.2} // Lower minimum zoom for horizontal
//         maxZoom={1.2} // Lower maximum zoom
//         proOptions={{ hideAttribution: true }}
//       >
//         <MiniMap 
//           pannable 
//           zoomable 
//           nodeStrokeColor={(n) => "#4B5563"}
//           style={{ width: 120, height: 80 }} // Smaller minimap for horizontal
//         />
//         <Controls 
//           style={{ top: 20, left: 20, height: 0 }}
//           showZoom={true}
//           showFitView={true}
//           showInteractive={false}
//         />
//         <Background gap={12} color="#E5E7EB" size={1} /> {/* Smaller background pattern */}
//       </ReactFlow>
//     </div>
//   );
// }

// export default function OrgChartPage() {
//   return (
//     <>
//       <Header />
//       <div className="h-screen w-full bg-gradient-to-t from-prime-bg to-white text-gray-900 mt-7 mb-[20vh]">
//         <div className="mx-auto p-3">
//           {" "}
//           {/* Further reduced padding */}
//           <div className="mb-6 lg:mb-8 flex flex-col items-center justify-center px-4">
//             {" "}
//             {/* Further reduced margins */}
//             <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-800 leading-tight mb-3 uppercase">
//               {" "}
//               {/* Further reduced margin */}
//               Panchayati Raj Department – Organigram
//             </h1>
//             <p className="text-sm text-center md:text-base lg:text-lg 2xl:text-xl 2xl:leading-relaxed text-gray-700 max-w-5xl">
//               {" "}
//               {/* Further reduced max width */}
//               Visual representation of the hierarchy
//             </p>
//           </div>
//           {/* <ReactFlowProvider>
//             <OrgChartInner />
           
//           </ReactFlowProvider> */}
//         </div>
//         <div className="flex justify-center items-center h-[100vh] w-full bg-white rounded-lg ">
//           <img className="h-150 w-auto" src="/images/organigram.png" alt="" />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import ImportantLinks from "@/components/implink/ImportantLinks";

export default function OrgChartPage() {
  const [scale, setScale] = useState(0.5); // start small
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // ---- Zoom buttons ----
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 12));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.2));
  const resetView = () => {
    setScale(0.5);
    setPosition({ x: 0, y: 0 });
  };

  // ---- Mouse wheel zoom (only inside container) ----
  const handleWheel = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const isInside = container.contains(e.target);
    if (!isInside) return; // let page scroll normally if outside

    e.preventDefault(); // prevent page scroll inside container

    const zoomIntensity = 0.1;
    if (e.deltaY < 0) {
      setScale((s) => Math.min(s + zoomIntensity, 12));
    } else {
      setScale((s) => Math.max(s - zoomIntensity, 0.2));
    }
  };

  // ---- Drag for panning ----
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setLastPos({ x: e.clientX, y: e.clientY });
    setPosition((pos) => ({ x: pos.x + dx, y: pos.y + dy }));
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <Header />
      <div className="w-full bg-gradient-to-t from-prime-bg to-white text-gray-900 mt-7">
        <div className="mx-auto p-3">
          <div className="mb-6 lg:mb-8 flex flex-col items-center justify-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-800 leading-tight mb-3 uppercase">
              Panchayati Raj Department Organigram
            </h1>
            <p className="text-sm text-center md:text-base lg:text-lg 2xl:text-xl 2xl:leading-relaxed text-gray-700 max-w-5xl">
              Visual representation of the hierarchy
            </p>
          </div>
        </div>

        {/* ---- Zoomable Image Section ---- */}
        <div className="w-full bg-white flex justify-center">
          <div
            ref={containerRef}
            className="relative flex justify-center items-center h-[80vh] border border-gray-200 w-full bg-white rounded-lg overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Zoom controls */}
            <div className="absolute top-4 left-4 flex flex-col bg-[#fff3e2] rounded shadow p-1 z-10">
              <button
                onClick={zoomIn}
                className="p-2 hover:bg-white rounded"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={zoomOut}
                className="p-2 hover:bg-white rounded"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={resetView}
                className="p-2 hover:bg-white rounded"
                title="Reset View"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            {/* Image with transform */}
            <img
              src="/images/organigram.png"
              alt="Organigram"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: dragging ? "none" : "transform 0.15s ease-out",
                cursor: dragging ? "grabbing" : "grab",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              className="select-none"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
      <ImportantLinks />
      <Footer />
    </>
  );
}


