import React, { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Sparkles, Smile, Star, Layers, Palette } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'
import { ScrollRevealText } from '../components/AnimatedLetter'
import { Footer } from '../components/Footer'

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
        rotate: [0, 4, -4, 0]
      }}
      transition={{
        duration: 6,
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
    { title: "Die-cut and kiss-cut options", desc: "Perfect contours for any creative layout." },
    { title: "Custom shapes, sizes, and finishes", desc: "Glossy, matte, holographic, and transparent." },
    { title: "Perfect for laptops and bottles", desc: "Designed for premium everyday hardware." },
    { title: "Bulk orders for events & brands", desc: "High volume production with precision scaling." }
  ];

  const card3Items = [
    { title: "Stickers for cafés & startups", desc: "Inject physical brand touchpoints anywhere." },
    { title: "Packaging inserts and logo stickers", desc: "Delight customers from the moment they unbox." },
    { title: "Event & campaign-based drops", desc: "Hype up your release with tangible gear." },
    { title: "Designed to make brands memorable", desc: "Long-lasting premium vinyl that never fades." }
  ];

  const card4Items = [
    { title: "Limited-edition collections", desc: "Curated aesthetic themes dropped monthly." },
    { title: "Collaboration packs with artists", desc: "Showcasing bold and underground illustrators." },
    { title: "Trend-based and aesthetic drops", desc: "Fresh stickers for Gen Z, creators, and lovers." },
    { title: "Built to stick, stand out, and express", desc: "Waterproof, UV-protected heavyweight vinyl." }
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
      <section className="h-screen w-full p-4 md:p-6 relative select-none">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between">
          
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
                  className="w-full sm:w-auto"
                >
                  <button 
                    className="w-full sm:w-auto bg-[#DEDBC8] text-black font-semibold text-sm sm:text-base px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-between sm:justify-start gap-4 hover:gap-6 group transition-all duration-500 shadow-xl hover:shadow-[#DEDBC8]/10"
                  >
                    <span>Create your sticker</span>
                    <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <ArrowRight className="text-[#E1E0CC] w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </button>
                </motion.div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 sm:py-36 md:py-48 px-4 sm:px-6 relative z-20 overflow-visible">
        
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

        <div className="bg-[#101010] rounded-[2rem] p-8 sm:p-14 md:p-24 text-center max-w-6xl mx-auto border border-white/5 relative overflow-hidden group">
          
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

        {/* Responsive 4-Column Card Grid (CARDS EXPANDED TO lg:min-h-[580px] TO PREVENT TEXT OVERFLOW) */}
        <motion.div 
          ref={featuresRef}
          variants={cardContainerVariants}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-2 lg:gap-1 max-w-[92vw] lg:max-w-7xl mx-auto px-4"
        >
          
          {/* Card 1 - Video Card */}
          <motion.div 
            variants={cardVariants}
            className="relative lg:min-h-[580px] min-h-[440px] h-full rounded-2xl overflow-hidden group border border-white/5 flex flex-col justify-end"
          >
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10" />
            <div className="relative z-20 p-6 sm:p-8">
              <h3 className="text-[#E1E0CC] font-bold text-lg sm:text-xl md:text-2xl tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                Your ideas, made stickable.
              </h3>
            </div>
          </motion.div>

          {/* Card 2 - Custom Sticker Packs (01) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[580px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-colors duration-500"
          >
            <PeelCorner />
            <div>
              {/* Graphic Icon Header */}
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" 
                alt="Custom Pack Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6 border border-white/10"
              />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#E1E0CC] font-bold text-base sm:text-lg tracking-wide">Custom Sticker Packs.</h3>
                <span className="text-gray-600 font-mono text-xs sm:text-sm">01</span>
              </div>

              {/* Checklist */}
              <ul className="space-y-4">
                {card2Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                      <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 text-xs sm:text-sm font-semibold leading-tight">{item.title}</h4>
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Action */}
            <button className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Card 3 - Brand Merch Stickers (02) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[580px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-colors duration-500"
          >
            <PeelCorner />
            <div>
              {/* Graphic Icon Header */}
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" 
                alt="Brand Merch Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6 border border-white/10"
              />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#E1E0CC] font-bold text-base sm:text-lg tracking-wide">Brand Merch Stickers.</h3>
                <span className="text-gray-600 font-mono text-xs sm:text-sm">02</span>
              </div>

              {/* Checklist */}
              <ul className="space-y-4">
                {card3Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                      <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 text-xs sm:text-sm font-semibold leading-tight">{item.title}</h4>
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Action */}
            <button className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Card 4 - Artist & Vibe Drops (03) */}
          <motion.div 
            variants={cardVariants}
            className="lg:min-h-[580px] min-h-[440px] h-full bg-[#161616] hover:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/5 relative overflow-hidden group transition-colors duration-500"
          >
            <PeelCorner />
            <div>
              {/* Graphic Icon Header */}
              <img 
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" 
                alt="Artist Drop Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-6 border border-white/10"
              />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#E1E0CC] font-bold text-base sm:text-lg tracking-wide">Artist & Vibe Drops.</h3>
                <span className="text-gray-600 font-mono text-xs sm:text-sm">03</span>
              </div>

              {/* Checklist */}
              <ul className="space-y-4">
                {card4Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 bg-[#252525] rounded p-0.5 border border-white/5 flex items-center justify-center shrink-0">
                      <Check className="text-primary w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-gray-300 text-xs sm:text-sm font-semibold leading-tight">{item.title}</h4>
                      <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Action */}
            <button className="text-[#E1E0CC] flex items-center gap-2 mt-8 text-xs sm:text-sm font-semibold tracking-wider uppercase group/btn self-start">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 rotate-[-45deg] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>

        </motion.div>
      </section>

      {/* Global Unified Footer rendering the secret Dino 3D portal */}
      <Footer />

    </div>
  )
}
