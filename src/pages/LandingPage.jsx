import React, { useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Marquee } from '../components/MarqueeComponent'
import { BackgroundBeams, Starfield } from '../components/BackgroundEffects'
import DashboardPreview from '../components/DashboardPreview'
import StickerChaos from '../components/StickerChaos'

// Enhanced Refraction Glass Component
const GlassContainer = ({ children, className = "", intensity = 1 }) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${0.03 * intensity})`,
        backdropFilter: `blur(${32 * intensity}px)`,
        border: `1px solid rgba(255, 255, 255, ${0.1 * intensity})`,
      }}
    >
      {children}
    </motion.div>
  );
};

// Neo-Brutalist Card
const ProductCard = ({ title, desc, icon, color, tags }) => (
  <motion.div 
    whileHover={{ y: -10, rotate: -2 }}
    className={`relative p-8 rounded-[2rem] border-4 border-white ${color} shadow-[12px_12px_0_0_#fff] group cursor-pointer`}
  >
    <div className="size-20 bg-white rounded-2xl flex items-center justify-center text-5xl mb-8 shadow-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex gap-2 mb-4">
      {tags.map(t => (
        <span key={t} className="text-[10px] font-black uppercase bg-black/20 px-2 py-0.5 rounded text-white">{t}</span>
      ))}
    </div>
    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{title}</h3>
    <p className="text-white/80 font-bold leading-tight">{desc}</p>
    <div className="mt-8 pt-6 border-t border-white/20 flex justify-between items-center">
      <span className="font-black text-white italic underline underline-offset-4">VIEW DEPLOYMENT</span>
      <span className="size-10 rounded-full bg-white text-black flex items-center justify-center text-xl font-black">→</span>
    </div>
  </motion.div>
);

function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const testimonials = [
    { id: 1, name: "VIBE_CHECKER", text: "Stickers are absolute chaos. My laptop looks like a fever dream. 11/10.", rating: 5 },
    { id: 2, name: "PIXEL_LORD", text: "The polaroids have that perfect retro-futuristic glitch. Essential gear.", rating: 5 },
    { id: 3, name: "NEO_GHOST", text: "I stuck a ghost on my fridge and now it serves me better snacks.", rating: 5 },
    { id: 4, name: "GLITCH_ARTIST", text: "SaaS for stickers? I thought it was a joke until the quality hit me.", rating: 5 },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500 relative font-sans">
      
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Starfield />
        <BackgroundBeams />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow w-full">
          {/* Hero Section */}
          <section ref={targetRef} className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
            <StickerChaos />
            
            <motion.div 
              style={{ opacity, scale }}
              className="text-center max-w-6xl mx-auto z-30 mb-20"
            >
              <motion.div 
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                className="inline-block bg-[#ffef00] text-black px-8 py-3 rounded-full mb-10 font-black text-sm uppercase tracking-[0.3em] border-4 border-white shadow-[8px_8px_0_0_#fff]"
              >
                UNLEASH THE CHAOS
              </motion.div>
              
              <h1 className="text-7xl md:text-[12rem] font-black text-white mb-10 tracking-[-0.05em] leading-[0.8] uppercase italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                STIX <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#ff0080] animate-gradient-x underline decoration-white/20">
                  N VIBES
                </span><br />
                LAB.
              </h1>
              
              <p className="text-xl md:text-3xl text-white/70 font-black max-w-3xl mx-auto mb-16 leading-tight italic uppercase tracking-tighter">
                Physical artifacts for the digital era. <br className="hidden md:block" />
                <span className="bg-white text-black px-2 not-italic">High-durability chaos</span> deployed to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <button className="px-12 py-6 bg-[#ff0080] text-white font-black uppercase italic tracking-widest rounded-[2rem] border-4 border-white shadow-[10px_10px_0_0_#fff] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300 text-2xl">
                  ENTER SHOP
                </button>
                <div className="text-white/40 font-mono text-sm uppercase tracking-widest">
                  // STATUS: OPERATIONAL
                </div>
              </div>
            </motion.div>

            {/* Dashboard Preview Section */}
            <motion.div 
              initial={{ opacity: 0, rotateX: 45 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="w-full max-w-6xl mx-auto px-4 perspective-2000"
            >
              <DashboardPreview />
            </motion.div>
          </section>

          {/* Product Range - The Service/Product Suite */}
          <section className="py-48 relative">
            <div className="container mx-auto px-4">
              <div className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
                <div className="max-w-3xl">
                  <div className="text-purple-500 font-mono text-xl mb-4 uppercase tracking-[0.5em] font-black">/ PRODUCT_MATRIX</div>
                  <h2 className="text-6xl md:text-[8rem] font-black text-white leading-[0.9] uppercase italic tracking-tighter">
                    THE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">COLLECTION.</span>
                  </h2>
                </div>
                <p className="text-white/40 font-bold text-2xl max-w-md italic text-right">
                  From pixel-perfect stickers to glitchy polaroids and future-proof artifacts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                <ProductCard 
                  title="Sticker Packs"
                  desc="Heavyweight vinyl, UV-proof, and absolute chaos. Designed to survive the apocalypse."
                  icon="🎨"
                  color="bg-purple-600"
                  tags={["Vinyl", "UV-Safe", "Chaos"]}
                />
                <ProductCard 
                  title="Glitched Polaroids"
                  desc="Your memories, but make it futuristic. High-contrast, custom-graded physical prints."
                  icon="📸"
                  color="bg-blue-600"
                  tags={["Analog", "Glitch", "Retro"]}
                />
                <ProductCard 
                  title="Custom Collabs"
                  desc="Deploy your own brand assets onto our physical infrastructure. Professional grade."
                  icon="🤝"
                  color="bg-orange-600"
                  tags={["Enterprise", "Custom", "B2B"]}
                />
                <ProductCard 
                  title="Tech Decals"
                  desc="Precision-cut for MacBooks, Hydroflasks, and Cyber-decks. Zero residue engineering."
                  icon="💻"
                  color="bg-emerald-600"
                  tags={["Precision", "Tech", "Matte"]}
                />
                <ProductCard 
                  title="Vibe Artifacts"
                  desc="Coming Soon: Wearables and physical objects that carry the Stix N Vibes frequency."
                  icon="🧪"
                  color="bg-pink-600"
                  tags={["Future", "Hardware", "??"]}
                />
                <ProductCard 
                  title="The Archives"
                  desc="Limited edition drops and one-of-a-kind physical manifestations. Get 'em before they're legacy."
                  icon="📂"
                  color="bg-yellow-600"
                  tags={["Limited", "Drop", "Legacy"]}
                />
              </div>
            </div>
          </section>

          {/* Contact Section - Redesigned */}
          <section className="py-48 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="container mx-auto px-4">
              <GlassContainer className="max-w-6xl mx-auto p-16 md:p-32 rounded-[4rem] relative flex flex-col md:flex-row gap-20 items-center" intensity={1.2}>
                <div className="absolute -top-20 -left-20 size-64 bg-purple-500/20 blur-[100px] rounded-full" />
                <div className="absolute -bottom-20 -right-20 size-64 bg-pink-500/20 blur-[100px] rounded-full" />
                
                <div className="md:w-1/2 relative z-10">
                  <h2 className="text-6xl md:text-8xl font-black text-white mb-10 leading-none uppercase italic tracking-tighter">
                    INJECT <br />FEEDBACK.
                  </h2>
                  <p className="text-2xl text-white/50 font-bold mb-12 italic leading-tight">
                    Got a question? A custom request? Or just want to shout into the void? Our uplink is open.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 group">
                      <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:bg-white group-hover:text-black transition-all duration-500">📧</div>
                      <div>
                        <div className="text-white/30 font-black uppercase text-xs tracking-widest mb-1">Email Uplink</div>
                        <a href="mailto:hello@stixnvibes.com" className="text-2xl md:text-4xl font-black text-white hover:text-purple-400 transition-colors uppercase italic tracking-tighter">hello@stixnvibes.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 w-full relative z-10">
                  <form className="space-y-8 bg-black/40 p-12 rounded-[3rem] border border-white/10">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Identity</label>
                      <input type="text" placeholder="NAME_OR_ALIAS" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-black italic focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder:text-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Signal</label>
                      <textarea placeholder="YOUR_MESSAGE_HERE..." rows={4} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-black italic focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all placeholder:text-white/10" />
                    </div>
                    <button className="w-full py-6 bg-white text-black font-black uppercase italic tracking-widest rounded-2xl border-4 border-white shadow-[8px_8px_0_0_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 text-xl">
                      SEND SIGNAL →
                    </button>
                  </form>
                </div>
              </GlassContainer>
            </div>
          </section>

          {/* Marquee Status */}
          <div className="py-20 border-y border-white/10 overflow-hidden">
            <Marquee className="[--duration:30s] text-white/10 font-black text-6xl md:text-9xl uppercase italic tracking-tighter">
              STIX N VIBES • PHYSICAL MANIFESTATIONS • CHAOS READY • STIX N VIBES • PHYSICAL MANIFESTATIONS • CHAOS READY •
            </Marquee>
          </div>
        </main>
        
        <Footer />
      </div>

      <style jsx>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default LandingPage
