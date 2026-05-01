import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 0 30px rgba(255, 0, 110, 0.6), 0 0 60px rgba(0, 217, 255, 0.3)',
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6">
      <motion.div
        className="relative z-20 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/40 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            🎨 Welcome to Creative Culture
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="block text-white">Stix N Vibes</span>
          <motion.span
            className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Express Yourself
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Premium stickers, custom merch, and creative collaborations built by creators, for creators. 
          Turn your vibe into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            className="px-8 py-4 rounded-lg font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden group"
            whileHover="hover"
            variants={buttonHoverVariants}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Creating</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Collections
          </motion.button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 rounded-full bg-pink-500/20 blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-16 h-16 rounded-full bg-cyan-500/20 blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400 font-semibold">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
