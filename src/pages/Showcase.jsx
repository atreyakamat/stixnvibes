import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Showcase = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const products = [
    {
      id: 1,
      title: 'Custom Vinyl Stickers',
      category: 'Stickers',
      gradient: 'from-pink-500 to-purple-600',
      icon: '🎨',
    },
    {
      id: 2,
      title: 'Merch Drops',
      category: 'Apparel',
      gradient: 'from-cyan-500 to-blue-600',
      icon: '👕',
    },
    {
      id: 3,
      title: 'Brand Packages',
      category: 'Collaboration',
      gradient: 'from-purple-500 to-pink-600',
      icon: '🤝',
    },
    {
      id: 4,
      title: 'Creator Kits',
      category: 'Collections',
      gradient: 'from-yellow-500 to-orange-600',
      icon: '🎁',
    },
    {
      id: 5,
      title: 'Limited Editions',
      category: 'Exclusives',
      gradient: 'from-red-500 to-pink-600',
      icon: '⚡',
    },
    {
      id: 6,
      title: 'Custom Print',
      category: 'On Demand',
      gradient: 'from-green-500 to-cyan-600',
      icon: '🖨️',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            What We Create
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From custom stickers to full brand packages. Your imagination, our craft.
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl h-64 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient}`}
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <motion.div
                className="relative h-full flex flex-col justify-between p-6"
                initial={{ y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl">{product.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-4">{product.title}</h3>
                </div>
              </motion.div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"
                initial={{ opacity: 0 }}
              />

              {/* CTA Arrow */}
              <motion.div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
                animate={hoveredIdx === idx ? { x: [0, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={hoveredIdx === idx ? { x: ['100%', '-100%'] } : { x: '-100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Collections CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.button
            className="px-8 py-3 rounded-lg font-bold text-white border-2 border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Collections →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
