import React from 'react';
import { motion } from 'framer-motion';

const StickerChaos = () => {
  const stickers = [
    { icon: "👻", color: "bg-purple-500", x: "10%", y: "20%", rotate: -15 },
    { icon: "💖", color: "bg-pink-500", x: "85%", y: "15%", rotate: 20 },
    { icon: "🌈", color: "bg-blue-500", x: "75%", y: "80%", rotate: -10 },
    { icon: "🔥", color: "bg-orange-500", x: "5%", y: "75%", rotate: 25 },
    { icon: "✨", color: "bg-yellow-500", x: "90%", y: "50%", rotate: 5 },
    { icon: "👽", color: "bg-green-500", x: "15%", y: "55%", rotate: -20 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -20, 0],
            rotate: [s.rotate, s.rotate + 10, s.rotate]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className={`absolute size-16 md:size-24 ${s.color} rounded-2xl border-4 border-white shadow-[8px_8px_0_0_rgba(255,255,255,0.2)] flex items-center justify-center text-4xl md:text-5xl`}
          style={{ left: s.x, top: s.y, rotate: `${s.rotate}deg` }}
        >
          {s.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default StickerChaos;
