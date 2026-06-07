"use client";

import { useState, useEffect } from "react";
import { DotmSquare15 } from "./ui/dotm-square-15";
import { motion, AnimatePresence } from "framer-motion";

export default function SiteLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Defines exactly what numbers it stops at before hitting 100
    const progressSequence = [0, 12, 25, 33, 48, 65, 80, 92, 100];
    let currentIndex = 0;
    
    // Progress sequence timing
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < progressSequence.length) {
        setProgress(progressSequence[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 300); // 300ms pause on each number

    // Close loader slightly after reaching 100
    const totalTime = (progressSequence.length * 300); 
    const timer = setTimeout(() => {
      setLoading(false);
    }, totalTime);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black gap-8"
          >
            <DotmSquare15
              size={32}
              dotSize={6}
              speed={0.75}
              color="#ffffff"
            />
            <div className="text-white text-xl md:text-xl font-[family-name:var(--font-dotgothic)] tracking-widest">
              {progress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
