"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARACTERS = "!@#$%^&*()_+-=[]{}|;':,./<>?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ScrambleText({ text, className, speed = 30 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "all" });
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!isInView || hasRun) return;

    let iteration = 0;
    setHasRun(true);

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      // Adjust the reveal speed here
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, isInView, hasRun, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
