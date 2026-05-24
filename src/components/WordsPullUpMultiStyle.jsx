import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function WordsPullUpMultiStyle({ 
  segments, 
  className = "", 
  delayOffset = 0 
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  // Flattens segments into flat words, maintaining their styles
  const allWords = [];
  segments.forEach((seg, segIdx) => {
    const words = seg.text.split(" ");
    words.forEach((w, wIdx) => {
      // Avoid pushing empty words if double spaces occurred
      if (w.trim() !== "") {
        allWords.push({
          word: w,
          className: seg.className || "",
          // Add a space after if it is not the very last word of the last segment
          hasSpaceAfter: !(segIdx === segments.length - 1 && wIdx === words.length - 1)
        });
      }
    });
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delayOffset
      }
    }
  };

  const wordVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.span
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center items-center ${className}`}
    >
      {allWords.map((item, index) => {
        return (
          <span 
            key={index} 
            className="inline-block relative whitespace-nowrap overflow-visible py-[0.1em]"
            style={{ marginRight: item.hasSpaceAfter ? '0.22em' : '0' }}
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${item.className}`}
            >
              {item.word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
