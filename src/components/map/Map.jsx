"use client";
import { motion } from "framer-motion";
import { Canvas, useThree } from "@react-three/fiber";
import Image from "next/image";
import "./Map.css";
import { Mapmodal } from "../mapmodal/Mapmodal";
import { Suspense, useEffect, useRef, useState } from "react";
import DistrictReportCard from "../ui/DistrictReportCard";
import { DISTRICT_DATA } from "@/constants/map-district.data";
import axios from "axios";

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
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8087/api/v1/apr/admin";

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

  const fetchDistrictData = async (districtName) => {
    if (!districtName) return;

    setLoading(true);
    setError(null);
    setDistrictData(null);

    const formattedName = formatDistrictName(districtName);

    try {
      const response = await axios.get(
        `${API_BASE}/getDistrictCategoriesWithSubCategoryCounts`,
        {
          params: { districtName: formattedName },
          timeout: 10000,
        }
      );

      if (response.data?.status === "success" && response.data?.data) {
        setDistrictData(response.data);
        setError(null);
      } else {
        setError(
          response.data?.message || "No data available for this district"
        );
        setDistrictData(null);
      }
    } catch (err) {
      console.error("Error fetching district data:", err);

      if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.");
      } else if (err.response) {
        setError(
          err.response?.data?.message ||
            `Error ${err.response.status}: Failed to fetch district data`
        );
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(err?.message || "Failed to fetch district data");
      }
      setDistrictData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictClick = async (districtName) => {
    if (!districtName) return;
    setSelectedDistrict({ name: districtName });
    await fetchDistrictData(districtName);
  };

  const handleRetry = () => {
    if (selectedDistrict?.name) {
      fetchDistrictData(selectedDistrict.name);
    }
  };

  return (
    <div className="map-section">
      {selectedDistrict && (
        <div className="popup-overlay">
          <div className="popup-top-left">
            <DistrictReportCard
              districtData={districtData}
              loading={loading}
              error={error}
              onClose={() => {
                setSelectedDistrict(null);
                setDistrictData(null);
                setError(null);
              }}
              onRetry={handleRetry}
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
