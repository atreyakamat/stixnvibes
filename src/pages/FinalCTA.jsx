import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main CTA */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-block text-7xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉
            </motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight"
          >
            Your Vibe Awaits
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of creators building their empires with Stix N Vibes. Start your first
            order today, or just say hi. We're excited to meet you.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.button
              className="relative px-10 py-5 rounded-lg font-bold text-xl text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Creating Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
                style={{ zIndex: 0 }}
              />
            </motion.button>
          </motion.div>

          {/* Secondary Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
          >
            <motion.button
              className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-cyan-500 hover:bg-cyan-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Collections
            </motion.button>
            <span className="text-gray-500">or</span>
            <motion.button
              className="px-6 py-3 rounded-lg font-semibold text-white border-2 border-pink-500 hover:bg-pink-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Custom Quote
            </motion.button>
          </motion.div>

          {/* Social Proof Bottom */}
          <motion.div variants={itemVariants} className="mt-16 pt-12 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-6">Join our creative community</p>
            <div className="flex justify-center gap-6 mb-8">
              {['Twitter', 'Instagram', 'Discord', 'TikTok'].map((platform, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="text-cyan-400 hover:text-pink-400 transition-colors font-semibold text-sm"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <motion.div
              className="max-w-md mx-auto"
              variants={itemVariants}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-400 text-sm mb-3">Get updates on new drops & exclusive offers</p>
              <motion.div
                className="flex gap-2 bg-gray-900/50 border border-gray-800 rounded-lg p-1 hover:border-cyan-500/50 transition-colors"
                whileHover={{ borderColor: 'rgb(0, 217, 255)' }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-600 outline-none"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded font-semibold text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>
    </section>
  );
};

export default FinalCTA;
