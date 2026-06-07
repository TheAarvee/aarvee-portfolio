"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AkaStickerProps {
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function AkaSticker({ 
  bgColor = "#FF2200", 
  textColor = "#602200",
  className 
}: AkaStickerProps) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      animate={{
        rotate: [-9, -4, -14, -6, -12, -9, -9],
      }}
      transition={{
        duration: 4,
        times: [0, 0.04, 0.08, 0.12, 0.16, 0.20, 1],
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute -top-5 right-4 md:right-15 px-3 py-1 rounded-lg font-[family-name:var(--font-dotgothic)] italic text-sm md:text-xl tracking-wider shadow-[inset_0_1px_4px_rgba(255,255,255,0.8),0_2px_10px_rgba(0,0,0,0.1)] z-10 select-none cursor-grab",
        className
      )}
      style={{ 
        rotate: "-9deg",
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      aka Aarvee
    </motion.div>
  );
}
