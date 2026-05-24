import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function WordsPullUp({ 
  text, 
  className = "", 
  showSparkle = false,
  delayOffset = 0 
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        
        return (
          <span 
            key={index} 
            className="inline-block relative mr-[0.2em] whitespace-nowrap overflow-visible py-[0.1em]"
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
            
            {isLastWord && showSparkle && (
              <motion.span
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -45, opacity: 0 }}
                transition={{ delay: delayOffset + (words.length * 0.08) + 0.3, duration: 0.6, ease: "easeOut" }}
                className="absolute top-[-0.2em] -right-[0.45em] text-[0.3em] font-normal leading-none inline-flex items-center justify-center text-primary filter drop-shadow-[0_2px_4px_rgba(222,219,200,0.3)] hover:scale-125 transition-transform cursor-default"
                style={{ fontFamily: 'sans-serif' }}
              >
                ✦
              </motion.span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}
