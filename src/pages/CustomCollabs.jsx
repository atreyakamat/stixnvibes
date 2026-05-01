import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CustomCollabs = () => {
  const collaborationTypes = [
    {
      title: 'Artist Collabs',
      description: 'Bring your art to merch. We handle production, you keep creating.',
      icon: '🎨',
      features: ['Revenue share', 'Creative control', 'Marketing support'],
    },
    {
      title: 'Creator Drops',
      description: 'Limited edition releases for your community. Build hype, build loyalty.',
      icon: '🚀',
      features: ['Limited runs', 'Community engagement', 'Analytics dashboard'],
    },
    {
      title: 'Brand Packages',
      description: 'Complete branding solutions for growing businesses and startups.',
      icon: '🤝',
      features: ['Custom design', 'Bulk pricing', 'White label options'],
    },
  ];

  const [expandedIdx, setExpandedIdx] = useState(null);

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Let's Collaborate
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Grow together. Whether you're an artist, creator, or brand—we have a program for you.
          </p>
        </motion.div>

        {/* Collaboration Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {collaborationTypes.map((collab, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <motion.div
                className="relative p-8 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/20 hover:border-cyan-500/50 transition-all h-full"
                whileHover={{ y: -8, borderColor: 'rgb(0, 217, 255)' }}
              >
                <div className="text-5xl mb-4">{collab.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{collab.title}</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {collab.description}
                </p>

                {/* Features List */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={
                    expandedIdx === idx
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0.5, height: 'auto' }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {collab.features.map((feature, featureIdx) => (
                    <motion.div
                      key={featureIdx}
                      className="flex items-center gap-2 text-sm text-cyan-400"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIdx * 0.1 }}
                    >
                      <span>✓</span>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.button
                  className="mt-6 w-full py-2 rounded-lg text-sm font-bold text-white border border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>

                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={{ opacity: 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Quote Section */}
        <motion.div
          className="mt-20 p-10 rounded-xl border-2 border-gradient-to-r border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-pink-500/5"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Have a unique idea?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We're open to custom partnerships and one-off projects. Let's talk about what
              you're building.
            </p>
            <motion.button
              className="px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomCollabs;
