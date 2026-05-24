import React from 'react'
import { motion } from 'framer-motion'

export const CinematicAmbientBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Drifting glowing orbs */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[550px] rounded-full blur-[140px] opacity-[0.05]"
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -55, 35, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ background: "radial-gradient(circle, #DEDBC8 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute top-[35%] right-[8%] w-[40vw] h-[40vw] max-w-[500px] rounded-full blur-[150px] opacity-[0.04]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 45, -35, 0],
          scale: [1, 0.88, 1.12, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        style={{ background: "radial-gradient(circle, #FFD700 0%, transparent 70%)" }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[12%] w-[45vw] h-[45vw] max-w-[600px] rounded-full blur-[170px] opacity-[0.035]"
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.08, 0.88, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{ background: "radial-gradient(circle, #E1E0CC 0%, transparent 70%)" }}
      />

      {/* Tiny floating vector sparkles */}
      <div className="absolute inset-0 opacity-[0.06]">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#E1E0CC] text-xs"
            style={{
              top: `${12 + (i * 6.5)}%`,
              left: `${8 + (Math.sin(i) * 32 + 40)}%`,
            }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              scale: [0.75, 1.15, 0.75],
            }}
            transition={{
              duration: 4.5 + (i % 3.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.45,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CinematicAmbientBackground;
