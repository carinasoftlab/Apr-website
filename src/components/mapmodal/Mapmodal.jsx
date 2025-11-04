"use client";
import React, { forwardRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { DISTRICT_DATA } from "@/constants/map-district.data";

export const Mapmodal = forwardRef(function Mapmodal({ onDistrictClick }, ref) {
  const { nodes, materials } = useGLTF("/modals/AP_2.glb");
  const [hovered, setHovered] = useState(null);

  // Map mesh names to dataset modelIds so popup shows correct details
  const SPECIAL_NAME_MAP = {
    PAKKE_KESSANG: "Pakke Kessang",
    PAPUMPARE: "Papum Pare",
    DIBANG_VALLEY: "Dibang Valley",
    EAST_SIANG: "East Siang",
    EAST_KAMENG: "East Kameng",
    KURUNG_KUMEY: "Kurung Kumey",
    UPPER_SUBANSIRI: "Upper Subansiri",
    LOWER_SIANG: "Lower Siang",
    WEST_KAMENG: "West Kameng",
    KRA_DAADI: "Kra Daadi",
    SHI_YOMI: "Shi Yomi",
    UPPER_SIANG: "Upper Siang",
    LOWER_DIBANG_VALLEY: "Lower Dibang Valley",
    KEYI_PANYOR: "Keyi Panyor",
    WEST_SIANG: "West Siang",
    LEPARADA: "Leparada",
    LOWER_SUBANSIRI: "Lower Subansiri",
    KAMLE: "Kamle",
  };

  const toDisplayName = (meshName) =>
    (meshName || "")
      .split("_")
      .map((p) => p.charAt(0) + p.slice(1).toLowerCase())
      .join(" ");

  const formatDistrictName = (name) => {
    if (!name) return "";
    return name
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const getDistrictNameForMesh = (meshName) => {
    if (SPECIAL_NAME_MAP[meshName]) {
      return formatDistrictName(SPECIAL_NAME_MAP[meshName]);
    }

    const displayName = toDisplayName(meshName);
    const found = DISTRICT_DATA.find(
      (d) => d.name.toLowerCase() === displayName.toLowerCase()
    );
    const districtName = found?.name || displayName;
    return formatDistrictName(districtName);
  };

  const meshNames = [
    // New meshes from AP (2).glb Model
    "PAPUMPARE",
    "EAST_SIANG",
    "EAST_KAMENG",
    "KURUNG_KUMEY",
    "UPPER_SUBANSIRI",
    "LOWER_SIANG",
    "BICHOM",
    "TAWANG",
    "WEST_KAMENG",
    "PAKKE_KESSANG",
    "KRA_DAADI",
    "SHI_YOMI",
    "SIANG",
    "UPPER_SIANG",
    "DIBANG_VALLEY",
    "LOWER_DIBANG_VALLEY",
    "LOHIT",
    "ANJAW",
    "CHANGLANG",
    "TIRAP",
    "LONGDING",
    "KEYI_PANYOR",
    "NAMSAI",
    // Existing clickable meshes from old Mapmodal
    "polySurface44",
    "polySurface22",
    "polySurface51",
    "polySurface39",
    "polySurface37",
    "polySurface29",
    "Text001",
    "Text002",
    "Text003",
    "Text004",
    "Text007",
    "Text010",
    "Text011",
    "Text012",
    "Text013",
    "Text014",
    "Text015",
    "Text018",
    "Text019",
    "Text020",
    "Text021",
    "Text022",
    "Text023",
    "Text025",
    "Text026",
  ];

  // Animated scales for grouped districts (composed of multiple meshes)
  const { scale: westSiangScale } = useSpring({
    scale: hovered === "WEST_SIANG" ? 0.0105 : 0.01,
    config: { mass: 1, tension: 180, friction: 18 },
  });
  const { scale: leparadaScale } = useSpring({
    scale: hovered === "LEPARADA" ? 0.0105 : 0.01,
    config: { mass: 1, tension: 180, friction: 18 },
  });
  const { scale: lowerSubansiriScale } = useSpring({
    scale: hovered === "LOWER_SUBANSIRI" ? 0.0105 : 0.01,
    config: { mass: 1, tension: 180, friction: 18 },
  });
  const { scale: kamleScale } = useSpring({
    scale: hovered === "KAMLE" ? 1.05 : 1,
    config: { mass: 1, tension: 180, friction: 18 },
  });

  return (
    <group ref={ref} dispose={null}>
      {meshNames.map((name) => {
        const node = nodes[name];
        if (!node?.geometry) return null;

        const { scale } = useSpring({
          scale: hovered === name ? [1, 1, 1.04] : [1, 1, 1],
          position: hovered === name ? [0, 0, 1.02] : [0, 0, 0],
          config: { mass: 1, tension: 180, friction: 18 },
        });

        return (
          <a.mesh
            key={name}
            geometry={node.geometry}
            material={materials["Material.002"]}
            scale={scale}
            position={node.position}
            castShadow
            renderOrder={10}
            DepthMaterial={false}
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              onDistrictClick(getDistrictNameForMesh(name));
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

      {/* Interactive grouped districts */}
      <a.group
        name="WEST_SIANG"
        rotation={[Math.PI / 2, 0, 0]}
        scale={westSiangScale}
        onClick={(e) => {
          e.stopPropagation();
          onDistrictClick(getDistrictNameForMesh("WEST_SIANG"));
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("WEST_SIANG");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(null);
          document.body.style.cursor = "default";
        }}
      >
        <mesh
          geometry={nodes.Mesh005.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Mesh005_1.geometry}
          material={materials["lambert2.001"]}
        />
        <mesh
          geometry={nodes.Mesh005_2.geometry}
          material={materials["Material.004"]}
        />
      </a.group>

      <a.group
        name="LEPARADA"
        rotation={[Math.PI / 2, 0, 0]}
        scale={leparadaScale}
        onClick={(e) => {
          e.stopPropagation();
          onDistrictClick(getDistrictNameForMesh("LEPARADA"));
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("LEPARADA");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(null);
          document.body.style.cursor = "default";
        }}
      >
        <mesh
          geometry={nodes.Mesh008.geometry}
          material={materials["lambert3.001"]}
        />
        <mesh
          geometry={nodes.Mesh008_1.geometry}
          material={materials.lambert1}
        />
      </a.group>

      <a.group
        name="LOWER_SUBANSIRI"
        rotation={[Math.PI / 2, 0, 0]}
        scale={lowerSubansiriScale}
        onClick={(e) => {
          e.stopPropagation();
          onDistrictClick(getDistrictNameForMesh("LOWER_SUBANSIRI"));
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("LOWER_SUBANSIRI");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(null);
          document.body.style.cursor = "default";
        }}
      >
        <mesh
          geometry={nodes.Mesh010.geometry}
          material={materials["lambert3.001"]}
        />
        <mesh
          geometry={nodes.Mesh010_1.geometry}
          material={materials.lambert1}
        />
      </a.group>

      {/* KAMLE composed group */}
      <a.group
        name="KAMLE"
        scale={kamleScale}
        onClick={(e) => {
          e.stopPropagation();
          onDistrictClick(getDistrictNameForMesh("KAMLE"));
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("KAMLE");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(null);
          document.body.style.cursor = "default";
        }}
      >
        <mesh
          geometry={nodes.Text005.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          geometry={nodes.Text005_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          geometry={nodes.Text005_2.geometry}
          material={materials["lambert2.001"]}
        />
        <mesh
          geometry={nodes.Text005_3.geometry}
          material={materials["lambert1.001"]}
        />
      </a.group>
    </group>
  );
});
