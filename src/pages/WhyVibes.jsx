import React from 'react';
import { motion } from 'framer-motion';

const WhyVibes = () => {
  const values = [
    {
      icon: '✨',
      title: 'Creator-First',
      description: 'Built by creators for creators. We understand your vibe.',
    },
    {
      icon: '🎯',
      title: 'Premium Quality',
      description: 'No compromises. Print, finish, and durability that speaks for itself.',
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      description: 'Custom orders shipped quick. Your ideas, realized in days not weeks.',
    },
    {
      icon: '🌐',
      title: 'Community-Driven',
      description: 'Collaborate, collab, and grow together. Your culture, amplified.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black mb-4 text-white"
          >
            Why Stix N Vibes?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            We're not just a print shop. We're a movement for self-expression and creative rebellion.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/20 hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{
                borderColor: 'rgb(0, 217, 255)',
                backgroundColor: 'rgba(0, 217, 255, 0.05)',
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>

              {/* Hover Glow */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={{ opacity: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
};

export default WhyVibes;
