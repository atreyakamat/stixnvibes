import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const faqs = [
    {
      question: 'What makes your stickers premium quality?',
      answer:
        'We use premium 3-mil vinyl with professional-grade inks and UV-resistant coatings. Every sticker is hand-inspected for quality. Our process ensures durability against water, sun, and everyday wear.',
      icon: '✨',
    },
    {
      question: 'How fast are your turnarounds?',
      answer:
        'Standard orders process in 3-5 business days. Rush orders available for 24-48 hours. All orders ship same-day once printed. International shipping available with tracking.',
      icon: '⚡',
    },
    {
      question: 'Do you offer custom designs or artwork?',
      answer:
        'Absolutely! We can work with your designs or our in-house designers can help. Custom artwork service available. Minimum order quantities: 100 units for custom prints.',
      icon: '🎨',
    },
    {
      question: 'What about pricing and volume discounts?',
      answer:
        'Volume pricing starts at 100 units. Bulk orders get significant discounts. Contact our team for custom quotes on large orders. Transparent pricing—no hidden fees.',
      icon: '💰',
    },
    {
      question: 'How do I request a refund or handle issues?',
      answer:
        'We have a 100% satisfaction guarantee. If there are any issues, contact support within 14 days of receipt. We either replace or refund. No questions asked.',
      icon: '🛡️',
    },
    {
      question: 'Can I collaborate or create drops with you?',
      answer:
        'Yes! We love working with creators. Revenue share models, limited edition drops, and exclusive collaborations available. Reach out to discuss terms that work for you.',
      icon: '🤝',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Questions? We Got Answers.
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about ordering, quality, and collaborations.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900/30 to-gray-900/10 hover:border-cyan-500/50 transition-all"
            >
              <motion.button
                className="w-full flex items-start gap-4 p-6 text-left hover:bg-gray-900/20 transition-colors"
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                whileHover={{ paddingLeft: 28 }}
              >
                <span className="text-2xl flex-shrink-0">{faq.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  className="flex-shrink-0 text-cyan-500"
                  animate={{ rotate: expandedIdx === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6"
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
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedIdx === idx && (
                  <motion.div
                    className="px-6 pb-6 border-t border-gray-800/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          className="mt-16 p-8 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-pink-500/5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Our team is here 24/7 to help. Reach out on Discord, email, or live chat.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              className="px-6 py-2 rounded-lg text-white border border-cyan-500 hover:bg-cyan-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email Support
            </motion.button>
            <motion.button
              className="px-6 py-2 rounded-lg text-white border border-pink-500 hover:bg-pink-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discord
            </motion.button>
            <motion.button
              className="px-6 py-2 rounded-lg text-white border border-purple-500 hover:bg-purple-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
