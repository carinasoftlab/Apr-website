"use client";
import { motion } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import Image from "next/image";
import "./Map.css";
import { Mapmodal } from "../mapmodal/Mapmodal";
import { Suspense, useEffect, useRef, useState } from "react";
import DistrictReportCard from "../ui/DistrictReportCard";
import { DISTRICT_DATA } from "@/constants/map-district.data";

function RotatingMapGroup({ children }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const baseScale = Math.min(viewport.width, viewport.height) * 0.01;
    setScale(baseScale);
  }, [viewport]);

  return (
    <group ref={groupRef} scale={scale} rotation={[0, 0, Math.PI / 210]}>
      {children}
    </group>
  );
}

export default function Map() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDistrictClick = (meshName) => {
    const found = DISTRICT_DATA.find((d) => d.modelId === meshName);
    console.log(found);
    setSelectedDistrict(found || null);
  };

  return (
    <div className="map-section">
      {selectedDistrict && (
        <div className="popup-overlay">
          <div className="popup-top-left">
            <DistrictReportCard
              districtData={selectedDistrict}
              onClose={() => setSelectedDistrict(null)}
            />
          </div>
        </div>
      )}

      <Image
        src="/images/map.svg"
        alt="Map Background"
        fill={true}
        className="map-bg-image"
        priority
      />

      <div className="map-overlay-white" />

      <motion.div
        className="map-text"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-[#2B2B2B] mb-4">
          PANCHAYATI RAAJ AT A GLANCE
        </h1>
      </motion.div>

      <div className="map-canvas-container">
        <div className="map-container">
          <Canvas
            className="map-canvas"
            camera={{
              position: [0, 800, 0],
              fov: 45,
              near: 0.1,
              far: 1000,
            }}
            shadows
            style={{ background: "transparent" }}
            onWheel={(e) => e.preventDefault()}
          >
            <ambientLight intensity={1.0} />
            <directionalLight
              position={[20, 60, 20]}
              intensity={1.8}
              castShadow
            />
            <pointLight position={[-20, 30, -20]} intensity={0.6} />

            <Suspense fallback="Loading...">
              <RotatingMapGroup>
                <Mapmodal onDistrictClick={handleDistrictClick} />
              </RotatingMapGroup>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
