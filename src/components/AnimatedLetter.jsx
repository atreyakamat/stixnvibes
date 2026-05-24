import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function AnimatedLetter({ character, index, totalChars, scrollYProgress }) {
  const charProgress = index / totalChars;
  
  // Opacity transitions from 0.2 to 1 based on character position
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);
  
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
}

export function ScrollRevealText({ text, className = "" }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const characters = text.split("");
  const totalChars = characters.length;

  return (
    <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <AnimatedLetter
          key={index}
          character={char}
          index={index}
          totalChars={totalChars}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
