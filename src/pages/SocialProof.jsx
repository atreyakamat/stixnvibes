import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  const testimonials = [
    {
      author: 'Alex Chen',
      role: 'Content Creator',
      quote: 'Stix N Vibes turned my design ideas into reality. The quality is insane.',
      image: '🎨',
    },
    {
      author: 'Jordan Rivera',
      role: 'Designer & Artist',
      quote: 'Fast, reliable, and understands the creative vision. This is the real deal.',
      image: '✨',
    },
    {
      author: 'Morgan Taylor',
      role: 'Brand Founder',
      quote: 'Best merch partner we have ever worked with. Community loves the drops.',
      image: '🚀',
    },
    {
      author: 'Casey Kim',
      role: 'Streamer',
      quote: 'Custom stickers for my channel arrived in days. The hype is real.',
      image: '⚡',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Happy Creators' },
    { number: '50K+', label: 'Orders Shipped' },
    { number: '24h', label: 'Avg Response' },
    { number: '99%', label: 'Satisfaction' },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="text-center p-6 border border-gray-800/50 rounded-lg bg-gradient-to-br from-gray-900/30 to-gray-900/10"
              whileHover={{ borderColor: 'rgb(0, 217, 255)' }}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-black bg-gradient-to-r from-pink-500 to-cyan-500 text-transparent bg-clip-text"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Loved by Creators
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real feedback from real creators who trust us with their vision.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/20 hover:border-cyan-500/50 transition-all group"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="text-lg font-bold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-cyan-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Gradient accent on hover */}
              <motion.div
                className="mt-4 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded w-0 group-hover:w-full transition-all"
                initial={{ width: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* FOMO Section */}
        <motion.div
          className="text-center py-12 px-6 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-pink-500/5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Join the Creative Movement
          </h3>
          <p className="text-gray-400 mb-4">
            See what thousands of creators have already discovered.
          </p>
          <motion.div
            className="flex gap-3 justify-center flex-wrap"
            whileHover="hover"
          >
            <span className="text-sm text-cyan-400">→ Latest drops selling out</span>
            <span className="text-sm text-pink-400">→ Creator collaborations live</span>
            <span className="text-sm text-purple-400">→ Limited edition releases</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
