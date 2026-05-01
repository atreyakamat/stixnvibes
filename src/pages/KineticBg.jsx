import React from 'react';
import { motion } from 'framer-motion';

const KineticBg = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
      {/* Primary Gradient Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0033 0%, #0d1b2a 25%, #1a0d1f 50%, #0a2540 75%, #1a0033 100%)',
          y: scrollY * 0.5,
        }}
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, #ff006e 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          background: 'radial-gradient(circle, #00d9ff 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-25"
        animate={{
          x: [0, 120, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        style={{
          background: 'radial-gradient(circle, #7d00ff 0%, transparent 70%)',
        }}
      />

      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-cyan-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial Glow Center */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 70%)',
          y: scrollY * 0.3,
        }}
      />
    </div>
  );
};

export default KineticBg;
