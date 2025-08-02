"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

export const Mapmodal = forwardRef(function Mapmodal({ onDistrictClick }, ref) {
  const { nodes, materials } = useGLTF("/modals/MAP_AP.glb");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!hovered) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      // You can use x, y if you want to animate or show tooltip
      // console.log({ x, y });
    };

    if (hovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovered]);

  const meshNames = [
    "polySurface29",
    "Text013",
    "Text019",
    "Text014",
    "polySurface44",
    "Text020",
    "Text021",
    "polySurface22",
    "Text025",
    "Text015",
    "Text003",
    "Text022",
    "Text008",
    "Text023",
    "Text012",
    "polySurface37",
    "Text007",
    "Text004",
    "Text010",
    "polySurface39",
    "Text001",
    "Text011",
    "polySurface51",
    "Text002",
    "Text018",
  ];

  return (
    <group ref={ref} dispose={null}>
      {meshNames.map((name) => {
        const node = nodes[name];
        if (!node?.geometry) return null;

        const { scale } = useSpring({
          scale: hovered === name ? [1.05, 1.05, 1.05] : [1, 1, 1],
          config: { mass: 1, tension: 180, friction: 18 },
        });

        return (
          <a.mesh
            key={name}
            geometry={node.geometry}
            material={materials.Material}
            scale={scale}
            onClick={(e) => {
              e.stopPropagation();
              onDistrictClick(name);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(name);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(null);
              document.body.style.cursor = "default";
            }}
          />
        );
      })}
    </group>
  );
  // <group ref={ref} {...props} dispose={null}>
  //   {meshNames.map((name) => {
  //     const node = nodes[name];
  //     if (!node?.geometry) return null;

  //     const isClicked = props.clickedName === name;

  //     const { scale } = useSpring({
  //       scale: isClicked ? [1.04, 1.04, 1.04] : [1, 1, 1],
  //       config: { mass: 1, tension: 180, friction: 18 },
  //     });

  //     return (
  //       <a.mesh
  //         key={name}
  //         geometry={node.geometry}
  //         material={materials.Material}
  //         scale={scale}
  //         onClick={(e) => {
  //           props.setClickedName(name);
  //           e.stopPropagation();
  //         }}
  //         onPointerOver={(e) => {
  //           e.stopPropagation();
  //           setHovered(true);
  //           document.body.style.cursor = "pointer";
  //         }}
  //         onPointerOut={(e) => {
  //           e.stopPropagation();
  //           setHovered(false);
  //           document.body.style.cursor = "default";
  //         }}
  //       />
  //     );
  //   })}
  // </group>
});
