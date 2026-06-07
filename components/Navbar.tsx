"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = ["About", "Projects", "Resume", "Blog"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      // scrolling down & passed the header
      setHidden(true);
    } else {
      // scrolling up
      setHidden(false);
    }
  });

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="flex items-center md:gap-5 bg-black backdrop-blur-md rounded-full pl-2 pr-8 md:pr-12 py-2 shadow-[inset_0_2px_8px_rgba(255,255,255,0.4)]">
          <Link
            href="/"
            aria-label="Home"
            className="font-plank flex items-center justify-center px-5 md:px-5 py-2 md:py-2 rounded-full bg-white text-black text-xl pt-3 md:pt-3.5 md:pl-4 leading-none"
          >
            rv
          </Link>
          <ul className="flex items-center gap-6 md:gap-8 text-white font-[family-name:var(--font-geist-sans)] text-base md:text-md">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
}
