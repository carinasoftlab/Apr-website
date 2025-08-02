"use client";
import { motion } from "framer-motion";

export default function CardSkeleton({ variant = "default" }) {
  if (variant === "profile") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-orange-50 to-yellow-50 rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-400 p-4"
      >
        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse mb-4" />
        <div className="space-y-3">
          <div className="h-5 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </div>
      </motion.div>
    );
  }

  if (variant === "training") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-b from-orange-50 to-yellow-50 rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-400 p-4"
      >
        <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse mb-4" />
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4" />
            <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
            </div>
            <div className="h-12 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="aspect-video bg-gray-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
