import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShoppingBag, Send, Mail, Smile, Heart, Flame, HelpCircle } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'
import { Footer } from '../components/Footer'

export default function StickerPacks() {
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState([]);
  
  // Custom click explosion effect on cursor
  const handleCardClick = (e) => {
    setClickCount(prev => prev + 1);
    
    // Get mouse position inside the window/element
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const emojiPool = ["✨", "✦", "💖", "🎨", "🚀", "🔥", "🌈", "👾", "👽", "🦄"];
    
    // Generate 8 floating emoji particles
    const newParticles = Array.from({ length: 8 }).map((_, idx) => {
      const angle = (idx / 8) * 360 + (Math.random() * 20 - 10);
      const speed = 40 + Math.random() * 40;
      const angleRad = (angle * Math.PI) / 180;
      
      return {
        id: Date.now() + "-" + idx + "-" + Math.random(),
        x,
        y,
        dx: Math.cos(angleRad) * speed,
        dy: Math.sin(angleRad) * speed,
        emoji: emojiPool[Math.floor(Math.random() * emojiPool.length)],
        scale: 0.5 + Math.random() * 0.8,
        rotate: Math.random() * 360
      };
    });
    
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Update particles positions over time (simulation loop)
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) => 
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.dx * 0.05,
            y: p.y + p.dy * 0.05,
            dy: p.dy + 5, // add subtle gravity
            scale: Math.max(0, p.scale - 0.04), // fade out scale
            rotate: p.rotate + 5
          }))
          .filter((p) => p.scale > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative overflow-hidden flex flex-col justify-center">
      
      {/* Background utilities */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      
      {/* Dynamic colorful glowing edges in background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/10 via-pink-500/5 to-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-6 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-4 animate-pulse">
          Online vault
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Stix and Vibes ", className: "text-[#E1E0CC] font-normal" },
            { text: "Creative Shop. ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "Vault status: Prepping.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0] max-w-4xl mx-auto mb-4"
        />
      </section>

      {/* Big coming soon card with click burst particle logic */}
      <section className="relative z-10 w-full max-w-2xl mx-auto px-6 mt-4">
        
        <motion.div 
          onClick={handleCardClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#101010] border-2 border-white/5 hover:border-primary/20 rounded-[2.5rem] p-10 sm:p-14 text-center cursor-pointer transition-all duration-500 shadow-2xl relative overflow-hidden group select-none h-[420px] flex flex-col justify-center items-center"
        >
          {/* Neon animated edge lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DEDBC8]/5 to-transparent group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {/* Sticker peel corner decoration */}
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden z-20">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#212121] rotate-45 translate-x-8 -translate-y-8 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
          </div>

          {/* Interactive visual particles inside card */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute pointer-events-none font-sans text-lg sm:text-2xl select-none z-30"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotate}deg)`,
                opacity: p.scale
              }}
            >
              {p.emoji}
            </span>
          ))}

          {/* Icon */}
          <div className="relative mb-6">
            <div className="size-16 sm:size-20 bg-neutral-900 border border-white/10 rounded-[1.5rem] flex items-center justify-center text-3xl sm:text-4xl shadow-xl z-10 relative group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              🛍️
            </div>
            <Sparkles className="absolute -top-2 -right-2 text-primary w-5 h-5 animate-pulse" />
          </div>

          {/* Details */}
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            Store is coming soon
          </h3>
          
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-8">
            The Stix and Vibes vault is getting stocked. The official shop will launch shortly. 
            <span className="block mt-2 font-mono text-[10px] text-primary/70 uppercase tracking-widest font-bold">
              Tap anywhere on this card to release the vibe! ✨ (Taps: {clickCount})
            </span>
          </p>

          {/* Interactive Button */}
          <div className="relative">
            <button 
              type="button"
              className="bg-[#DEDBC8] text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 rounded-full flex items-center gap-2 group-hover:bg-white transition-all duration-300 shadow-lg shadow-[#DEDBC8]/10"
            >
              <span>Tap to Release Vibe</span>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* Manual Ordering Options under the card */}
      <section className="relative z-10 max-w-xl mx-auto px-6 mt-8">
        <div className="bg-[#101010] border border-white/5 rounded-2xl p-6 text-center space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500">
            Can't wait? Secure manual drops:
          </h4>
          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
            <a 
              href="https://wa.me/917744020601" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-[#161616] border border-white/5 hover:border-emerald-500/20 rounded-xl transition-all font-mono text-[11px]"
            >
              <span>💬 WhatsApp</span>
            </a>
            <a 
              href="https://instagram.com/stixnvibes" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-[#161616] border border-white/5 hover:border-pink-500/20 rounded-xl transition-all font-mono text-[11px]"
            >
              <span>📸 Instagram</span>
            </a>
            <a 
              href="mailto:hello@stixnvibes.com" 
              className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-[#161616] border border-white/5 hover:border-[#DEDBC8]/20 rounded-xl transition-all font-mono text-[11px]"
            >
              <span>✉️ Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Global Unified Footer rendering the secret Dino 3D portal */}
      <Footer />

    </div>
  );
}
