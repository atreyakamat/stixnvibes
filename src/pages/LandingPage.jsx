import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Smile, Star, Layers, Palette, Laptop, Sparkle } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'
import { ScrollRevealText } from '../components/AnimatedLetter'
import { Footer } from '../components/Footer'
import { CinematicAmbientBackground } from '../components/CinematicAmbientBackground'

// Custom Sticker Peel corner component
const PeelCorner = () => (
  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
    {/* Page peel representation */}
    <div 
      className="absolute top-0 right-0 w-14 h-14 bg-[#2f2e2a] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500 ease-out" 
      style={{ transformOrigin: 'center' }}
    />
  </div>
);

// Floating animated sticker elements for background visual juice
const FloatingBackgroundSticker = ({ children, className = "", delay = 0, yOffset = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 6, -6, 0]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{ y: yOffset }}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax translation scroll offsets for floating background elements
  const stickerY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const stickerY2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const stickerY3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Custom easing for smooth premium motion
  const customEase = [0.16, 1, 0.3, 1];

  // Checklist arrays
  const card2Items = [
    { title: "Die-cut and kiss-cut sticker options", desc: "Perfect contours for any creative layout." },
    { title: "Custom shapes, sizes, and finishes", desc: "Glossy, matte, holographic, and transparent." },
    { title: "Perfect for laptops, bottles, and packaging", desc: "Designed for premium everyday hardware." },
    { title: "Bulk orders for events, colleges, and brands", desc: "High volume production with precision scaling." }
  ];

  const card3Items = [
    { title: "Stickers for cafés, startups, and creators", desc: "Inject physical brand touchpoints anywhere." },
    { title: "Packaging inserts and logo stickers", desc: "Delight customers from the moment they unbox." },
    { title: "Event and campaign-based sticker drops", desc: "Hype up your release with tangible gear." },
    { title: "Designed to make your brand memorable", desc: "Long-lasting premium vinyl that never fades." }
  ];

  const card4Items = [
    { title: "Limited-edition sticker collections", desc: "Curated aesthetic themes dropped monthly." },
    { title: "Collaboration packs with global artists", desc: "Showcasing bold and underground illustrators." },
    { title: "Trend-based and aesthetic drops", desc: "Fresh stickers for Gen Z, creators, and lovers." },
    { title: "Built to stick, stand out, and express", desc: "Waterproof, UV-protected heavyweight" }
  ];

  // Features staggered card container animation
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-[#E1E0CC] selection:bg-[#DEDBC8] selection:text-black overflow-x-hidden relative">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full relative select-none overflow-hidden">
        <div className="relative w-full h-full flex flex-col justify-between">
          
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
          </div>

          {/* Noise Overlay */}
          <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10" />

          {/* Hero Content (Bottom aligned) */}
          <div className="mt-auto w-full p-6 sm:p-10 md:p-14 lg:p-16 z-20 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              
              {/* Giant Heading */}
              <div className="lg:col-span-8 flex flex-col justify-end items-start overflow-visible">
                <WordsPullUp 
                  text="Stix and Vibes"
                  showSparkle={true}
                  className="text-[11vw] sm:text-[10vw] md:text-[9vw] lg:text-[7.5vw] xl:text-[7.2vw] 2xl:text-[7.5vw] font-medium leading-[0.85] tracking-[-0.06em]"
                  style={{ color: '#E1E0CC' }}
                />
              </div>

              {/* Description & CTA */}
              <div className="lg:col-span-4 flex flex-col items-start gap-6 lg:pb-3">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
                  className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.3] tracking-wide"
                >
                  Stix and Vibes creates custom stickers that turn ideas, brands, moods, and moments into bold little pieces of personality. From laptops and bottles to packaging, events, and businesses — we make stickers that stick with people.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: customEase }}
                  className="w-full sm:w-auto animate-pulse"
                >
                  <Link 
                    to="/custom" 
                    className="w-full sm:w-auto bg-[#DEDBC8] text-black font-semibold text-sm sm:text-base px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-between sm:justify-start gap-4 hover:gap-6 group transition-all duration-500 shadow-xl hover:shadow-[#DEDBC8]/10 select-none cursor-pointer"
                  >
                    <span>Create your sticker</span>
                    <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <ArrowRight className="text-[#E1E0CC] w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BRAND VALUES TRUST TICKER / MARQUEE */}
      <section className="relative w-full py-5 bg-black border-y border-white/5 overflow-hidden z-20 select-none">
        <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />
        <div className="flex w-full overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1030] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear"
              }
            }}
            className="flex gap-10 whitespace-nowrap text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#DEDBC8]/60"
          >
            <div className="flex items-center gap-10 shrink-0 pr-10">
              <span className="flex items-center gap-2">✦ Perfect for laptops, bottles, cafés, colleges, events</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Custom sizes & premium finishes</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">✦ Bulk orders & wholesale scaling</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Made in Goa / India-focused 🌴</span>
              <span className="text-[#DEDBC8]/25">|</span>
            </div>
            
            <div className="flex items-center gap-10 shrink-0 pr-10">
              <span className="flex items-center gap-2">✦ Perfect for laptops, bottles, cafés, colleges, events</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Custom sizes & premium finishes</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">✦ Bulk orders & wholesale scaling</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Made in Goa / India-focused 🌴</span>
              <span className="text-[#DEDBC8]/25">|</span>
            </div>

            <div className="flex items-center gap-10 shrink-0 pr-10">
              <span className="flex items-center gap-2">✦ Perfect for laptops, bottles, cafés, colleges, events</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Custom sizes & premium finishes</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">✦ Bulk orders & wholesale scaling</span>
              <span className="text-[#DEDBC8]/25">|</span>
              <span className="flex items-center gap-2">★ Made in Goa / India-focused 🌴</span>
              <span className="text-[#DEDBC8]/25">|</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 sm:py-36 md:py-48 px-4 sm:px-6 relative z-20 overflow-visible">
        
        {/* Cinematic ambient background animations */}
        <CinematicAmbientBackground />
        
        {/* Animated Background Stickers (Parallax Scroll) */}
        <FloatingBackgroundSticker 
          className="top-10 left-10 md:left-24 text-5xl md:text-7xl opacity-20 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
          delay={0}
          yOffset={stickerY1}
        >
          💀
        </FloatingBackgroundSticker>

        <FloatingBackgroundSticker 
          className="bottom-10 right-10 md:right-24 text-6xl md:text-8xl opacity-15 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
          delay={2.5}
          yOffset={stickerY2}
        >
          ✦
        </FloatingBackgroundSticker>

        <FloatingBackgroundSticker 
          className="top-1/2 right-[10%] text-5xl md:text-6xl opacity-10 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.1)]"
          delay={1.2}
          yOffset={stickerY3}
        >
          🛸
        </FloatingBackgroundSticker>

        <div className="bg-[#101010] rounded-[2rem] p-8 sm:p-14 md:p-24 text-center max-w-6xl mx-auto border border-white/5 relative overflow-hidden group z-10">
          
          {/* Subtle glow behind card */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />
          <PeelCorner />

          {/* Top Label */}
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block mb-8 sm:mb-10">
            Sticker culture
          </span>

          {/* Main Heading */}
          <WordsPullUpMultiStyle 
            segments={[
              { text: "We are Stix and Vibes, ", className: "font-normal text-[#E1E0CC]" },
              { text: "a sticker brand built for expression. ", className: "italic font-serif text-[#DEDBC8]" },
              { text: "We create custom stickers for people, brands, artists, events, and everyday vibes.", className: "font-normal text-[#E1E0CC]" }
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[1.05] sm:leading-[1.0] tracking-tight"
          />

          {/* Body Paragraph Scroll Reveal */}
          <div className="max-w-2xl mx-auto mt-12 sm:mt-16">
            <ScrollRevealText 
              text="Every sticker starts with a vibe — a brand idea, a funny line, a college moment, a business identity, or a piece of art waiting to travel. At Stix and Vibes, we turn those ideas into high-quality stickers made for laptops, bottles, packaging, events, cafés, creators, and communities."
              className="text-[#DEDBC8]/80 text-xs sm:text-sm md:text-base leading-[1.6] sm:leading-[1.7] text-center tracking-wide"
            />
          </div>

        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="relative min-h-screen bg-black py-24 sm:py-36 z-20 flex flex-col justify-center overflow-visible">
        
        {/* Cinematic ambient background animations */}
        <CinematicAmbientBackground />
        
        {/* Subtle Noise Background */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none z-0" />

        {/* Animated Background Stickers (Parallax Scroll) */}
        <FloatingBackgroundSticker 
          className="top-20 right-[15%] text-5xl md:text-6xl opacity-15 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
          delay={1}
          yOffset={stickerY3}
        >
          🚀
        </FloatingBackgroundSticker>

        <FloatingBackgroundSticker 
          className="bottom-40 left-[10%] text-6xl md:text-7xl opacity-20 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
          delay={3.5}
          yOffset={stickerY1}
        >
          💖
        </FloatingBackgroundSticker>

        <FloatingBackgroundSticker 
          className="top-1/3 left-[4%] text-5xl md:text-6xl opacity-10 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.1)]"
          delay={1.8}
          yOffset={stickerY2}
        >
          🛹
        </FloatingBackgroundSticker>

        <FloatingBackgroundSticker 
          className="bottom-20 right-[6%] text-5xl md:text-6xl opacity-15 filter drop-shadow-[0_10px_20px_rgba(222,219,200,0.1)] animate-pulse"
          delay={4.2}
          yOffset={stickerY3}
        >
          ⚡
        </FloatingBackgroundSticker>

        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-16 sm:mb-20">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Sticker-ready designs for every vibe.", className: "text-[#E1E0CC] font-normal" }
            ]}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight block mb-3"
          />
          <WordsPullUpMultiStyle
            segments={[
              { text: "Made to peel, stick, and stand out.", className: "text-gray-500 font-normal" }
            ]}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight block"
            delayOffset={0.3}
          />
        </div>

        {/* Responsive 4-Column Card Grid (CARDS EXPANDED AND REDESIGNED TO PREVENT TEXT OVERFLOW) */}
        <motion.div 
          ref={featuresRef}
          variants={cardContainerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 max-w-[92vw] lg:max-w-7xl mx-auto px-4"
        >
          
          {/* Card 1 - Video Card */}
          <motion.div 
            variants={cardVariants}
            className="relative lg:min-h-[640px] xl:min-h-[600px] min-h-[440px] h-full rounded-2xl overflow-hidden group border border-white/5 flex flex-col justify-end"
          >
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 p-6 sm:p-8">
              <h3 className="text-[#E1E0CC] font-bold text-lg sm:text-xl md:text-2xl tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Your ideas, made stickable.
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Custom Sticker Packs (01) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[640px] xl:min-h-[600px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1c1c1c] rounded-2xl p-5 sm:p-7 xl:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-[#DEDBC8]/5 sticker-dashed-cut vinyl-sheen-shine"
          >
            <PeelCorner />
            
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Header section with compact Image & Title aligned horizontally */}
                <div className="flex items-center gap-3.5 mb-6">
                  <img 
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOtt%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" 
                    alt="Custom Pack Icon" 
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide leading-tight group-hover:text-[#DEDBC8] transition-colors duration-300">
                      Custom Sticker Packs.
                    </h3>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">
                      01 / Packs
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-4 xl:space-y-4.5">
                  {card2Items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                        <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-gray-300 text-xs sm:text-[13px] font-semibold leading-tight tracking-wide">{item.title}</h4>
                        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to Shop/Notify */}
              <Link 
                to="/packs" 
                className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start pt-4 border-t border-white/5 w-full cursor-pointer select-none"
              >
                <span>Notify me</span>
                <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3 - Brand Merch Stickers (02) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[640px] xl:min-h-[600px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1c1c1c] rounded-2xl p-5 sm:p-7 xl:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-[#DEDBC8]/5 sticker-dashed-cut vinyl-sheen-shine"
          >
            <PeelCorner />
            
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Header section with compact Image & Title aligned horizontally */}
                <div className="flex items-center gap-3.5 mb-6">
                  <img 
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOtt%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" 
                    alt="Brand Merch Icon" 
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide leading-tight group-hover:text-[#DEDBC8] transition-colors duration-300">
                      Brand Merch Stickers.
                    </h3>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">
                      02 / Brand
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-4 xl:space-y-4.5">
                  {card3Items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                        <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-gray-300 text-xs sm:text-[13px] font-semibold leading-tight tracking-wide">{item.title}</h4>
                        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to B2B Inquiry */}
              <Link 
                to="/brands" 
                className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start pt-4 border-t border-white/5 w-full cursor-pointer select-none"
              >
                <span>B2B inquiry</span>
                <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4 - Artist & Vibe Drops (03) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[640px] xl:min-h-[600px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1c1c1c] rounded-2xl p-5 sm:p-7 xl:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-[#DEDBC8]/5 sticker-dashed-cut vinyl-sheen-shine"
          >
            <PeelCorner />
            
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Header section with compact Image & Title aligned horizontally */}
                <div className="flex items-center gap-3.5 mb-6">
                  <img 
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOtt%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" 
                    alt="Artist Drop Icon" 
                    className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide leading-tight group-hover:text-[#DEDBC8] transition-colors duration-300">
                      Artist & Vibe Drops.
                    </h3>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">
                      03 / Artist
                    </span>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-4 xl:space-y-4.5">
                  {card4Items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                        <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-gray-300 text-xs sm:text-[13px] font-semibold leading-tight tracking-wide">{item.title}</h4>
                        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to Notify Drops */}
              <Link 
                to="/packs" 
                className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start pt-4 border-t border-white/5 w-full cursor-pointer select-none"
              >
                <span>Notify me</span>
                <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* NEW SECTION: PHYSICAL MOCKUPS */}
      <section className="relative bg-black py-24 sm:py-36 px-4 sm:px-6 z-20 overflow-visible border-t border-white/5">
        <CinematicAmbientBackground />
        <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none z-0" />
        
        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-4">
            Tactile Manifests
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Stickers in the wild.
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            From Goan cafés to developer workstations — here is how our premium vinyl stickers look on real, everyday hardware.
          </p>
        </div>

        {/* Mockup Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[92vw] lg:max-w-7xl mx-auto px-4">
          
          {/* Mockup 1: Laptop */}
          <div className="group relative bg-[#101010] border border-white/5 rounded-3xl p-4 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-2xl sticker-dashed-cut">
            <PeelCorner />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600" 
                alt="Developer Laptop Stickers" 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              {/* Overlapping Floating sticker graphic decal */}
              <div className="absolute -bottom-2 -right-2 bg-[#DEDBC8] text-black font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-tl-xl border-l border-t border-black select-none tracking-widest shadow-lg">
                DEV HARDWARE
              </div>
            </div>
            <h4 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide mb-1">Laptop Decals</h4>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-normal">
              Indestructible zero-residue shields designed to declare your stack in premium style.
            </p>
          </div>

          {/* Mockup 2: Water Bottles */}
          <div className="group relative bg-[#101010] border border-white/5 rounded-3xl p-4 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-2xl sticker-dashed-cut">
            <PeelCorner />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600" 
                alt="Sticker Flask" 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 bg-[#DEDBC8] text-black font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-tl-xl border-l border-t border-black select-none tracking-widest shadow-lg">
                100% WASHABLE
              </div>
            </div>
            <h4 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide mb-1">Flask & Bottle Decals</h4>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-normal">
              Waterproof heavy-duty vinyl that stands up to rugged travel and daily washes.
            </p>
          </div>

          {/* Mockup 3: Café takeaway bags */}
          <div className="group relative bg-[#101010] border border-white/5 rounded-3xl p-4 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-2xl sticker-dashed-cut">
            <PeelCorner />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600" 
                alt="Café Takeaway Bags" 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 bg-[#DEDBC8] text-black font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-tl-xl border-l border-t border-black select-none tracking-widest shadow-lg">
                BRAND MERGE
              </div>
            </div>
            <h4 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide mb-1">Café Takeaway Labels</h4>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-normal">
              Durable kraft paper inserts and bag sealers that make unboxing look 10x cooler.
            </p>
          </div>

          {/* Mockup 4: Helmets & Bikes */}
          <div className="group relative bg-[#101010] border border-white/5 rounded-3xl p-4 overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-2xl sticker-dashed-cut">
            <PeelCorner />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-neutral-900 border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600" 
                alt="Sticker Notebook Helmet" 
                className="w-full h-full object-cover filter brightness-[0.8] contrast-105 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 bg-[#DEDBC8] text-black font-mono text-[9px] uppercase font-bold px-3 py-1 rounded-tl-xl border-l border-t border-black select-none tracking-widest shadow-lg">
                UV PROTECTED
              </div>
            </div>
            <h4 className="text-[#E1E0CC] font-bold text-sm sm:text-base tracking-wide mb-1">Helmets & Ride Decals</h4>
            <p className="text-gray-500 text-[10px] sm:text-xs leading-normal">
              UV-shielded color vinyl that survives heavy weather and intense Goan sun.
            </p>
          </div>

        </div>
      </section>

      {/* NEW SECTION: TESTIMONIAL VIBE BOARD */}
      <section className="relative bg-black py-24 sm:py-36 px-4 sm:px-6 z-20 overflow-visible border-t border-white/5">
        <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
        
        {/* Section Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-4">
            Vibe Checks & Fables
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white mb-4">
            Our stickers stick around.
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Honest feedback from founders, creators, and daily peel-and-stick warriors.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[92vw] lg:max-w-6xl mx-auto px-4">
          
          {/* Review 1 */}
          <div className="relative bg-[#101010] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group sticker-dashed-cut">
            <PeelCorner />
            <div className="space-y-4">
              <div className="flex gap-1 text-primary text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-[#E1E0CC]/80 text-xs sm:text-sm leading-relaxed italic font-serif">
                "We ordered 500 die-cut custom logo stickers for our coworking café. Regular coffee spills and hot mugs haven't made them budge or lose color. Incredible Goan craftsmanship."
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4">
              <h5 className="text-[#E1E0CC] font-bold text-xs">Atreya K.</h5>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">Co-working Cafe Owner</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="relative bg-[#101010] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group sticker-dashed-cut">
            <PeelCorner />
            <div className="space-y-4">
              <div className="flex gap-1 text-primary text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-[#E1E0CC]/80 text-xs sm:text-sm leading-relaxed italic font-serif">
                "Our takeaway paper bags and coffee cups went from boring to a street-art canvas. Customers actually collect our stickers now. The packaging upgrade paid for itself in week one."
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4">
              <h5 className="text-[#E1E0CC] font-bold text-xs">Siddharth M.</h5>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">Café Director</span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="relative bg-[#101010] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden group sticker-dashed-cut">
            <PeelCorner />
            <div className="space-y-4">
              <div className="flex gap-1 text-primary text-xs">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-[#E1E0CC]/80 text-xs sm:text-sm leading-relaxed italic font-serif">
                "Heavyweight premium grade. The matte finish is so buttery and smooth, and the ink contrasts are incredibly deep. Finally, a brand that cares about sticker density in India."
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4">
              <h5 className="text-[#E1E0CC] font-bold text-xs">Kritika S.</h5>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block mt-0.5">Vector Illustrator</span>
            </div>
          </div>

        </div>
      </section>

      {/* Global Unified Footer rendering the secret Dino 3D portal */}
      <Footer />

    </div>
  )
}
