import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../lib/utils";

export const BackgroundBeams = ({ className }) => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <svg
        className="absolute left-[-10%] top-[-10%] h-[120%] w-[120%] opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Animated Beams */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: "-10%",
              opacity: 0 
            }}
            animate={{ 
              left: "110%",
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-[1px]"
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: "-10%",
              opacity: 0 
            }}
            animate={{ 
              top: "110%",
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-[1px] h-[200px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
};

export const Starfield = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
