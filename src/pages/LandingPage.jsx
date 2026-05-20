import React, { useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Marquee } from '../components/MarqueeComponent'
import { BackgroundBeams, Starfield } from '../components/BackgroundEffects'
import DashboardPreview from '../components/DashboardPreview'

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

// Technical Spec Card
const SpecCard = ({ title, value, description, icon }) => (
  <GlassContainer className="p-8 rounded-3xl group hover:border-purple-500/50 transition-all duration-500" intensity={0.8}>
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <div className="text-xs font-black text-purple-400 uppercase tracking-[0.3em] mb-2">{title}</div>
    <div className="text-3xl font-black text-white uppercase italic mb-4 tracking-tighter">{value}</div>
    <p className="text-white/40 font-bold text-sm leading-relaxed">{description}</p>
  </GlassContainer>
);

function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const testimonials = [
    { id: 1, name: "Alex J.", text: "The API for ordering custom sets is so clean. Oh wait, it's just a website, but it FEELS like a high-end dev tool.", rating: 5 },
    { id: 2, name: "Morgan S.", text: "Industrial grade durability. My laptop is now 10x faster because it looks 10x cooler.", rating: 5 },
    { id: 3, name: "Jamie L.", text: "Finally, a sticker company that understands typography and grid systems.", rating: 5 },
    { id: 4, name: "Casey R.", text: "The holographic finish is basically magic. 10/10 deployment.", rating: 5 },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500 relative" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Starfield />
        <BackgroundBeams />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow w-full">
          {/* Hero Section */}
          <section ref={targetRef} className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-24 px-4 overflow-hidden">
            <motion.div 
              style={{ opacity, scale, y }}
              className="text-center max-w-5xl mx-auto z-20 mb-20"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 px-6 py-2 rounded-full mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Production Node: Active</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-[10rem] font-black text-white mb-8 tracking-[-0.05em] leading-[0.85] uppercase italic drop-shadow-2xl">
                PHYSICAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">
                  EXPRESSION
                </span><br />
                ENGINE.
              </h1>
              
              <p className="text-lg md:text-2xl text-white/50 font-bold max-w-2xl mx-auto mb-12 leading-relaxed italic">
                The high-performance platform for turning digital vibes into tangible artifacts. Built for creators, deployed everywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-5 bg-white text-black font-black uppercase italic tracking-widest rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Launch Shop
                </button>
                <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase italic tracking-widest rounded-2xl hover:bg-white/10 transition-all duration-500">
                  View Documentation
                </button>
              </div>
            </motion.div>

            {/* Dashboard Preview Section */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-6xl mx-auto px-4 perspective-1000"
            >
              <div className="rotate-x-12 translate-z-0 group hover:rotate-x-0 transition-all duration-700 ease-out">
                <DashboardPreview />
              </div>
            </motion.div>
          </section>

          {/* Technical Specs Section (The SaaS 'Stack') */}
          <section className="py-32 relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
                    Built for <br />
                    <span className="text-purple-500 underline decoration-purple-500/30 underline-offset-8">Production.</span>
                  </h2>
                  <p className="text-xl text-white/40 font-bold uppercase tracking-widest">
                    Our stickers are engineered, not just printed.
                  </p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-white/10 mx-12 mb-6" />
                <div className="text-right">
                  <div className="text-4xl font-black text-white italic">0.01%</div>
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Error Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <SpecCard 
                  icon="🛡️"
                  title="Persistence"
                  value="5+ Years"
                  description="UV-resistant vinyl architecture ensures your vibe doesn't fade into legacy status."
                />
                <SpecCard 
                  icon="🌊"
                  title="Resilience"
                  value="IP68 Grade"
                  description="Waterproof, dishwasher-safe, and life-proof. Zero downtime in rainy conditions."
                />
                <SpecCard 
                  icon="💎"
                  title="Precision"
                  value="1200 DPI"
                  description="High-fidelity print resolution for pixel-perfect physical deployments."
                />
                <SpecCard 
                  icon="⚡"
                  title="Latency"
                  value="Fast-Track"
                  description="Optimized logistics pipeline for rapid delivery to your physical workspace."
                />
              </div>
            </div>
          </section>

          {/* The "Vibe Engine" Workflow */}
          <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <GlassContainer className="p-16 md:p-32 rounded-[4rem] flex flex-col lg:flex-row gap-20 items-center" intensity={1.1}>
                <div className="lg:w-1/2">
                  <h2 className="text-6xl md:text-8xl font-black text-white mb-10 leading-none uppercase italic tracking-tighter">
                    The Stix <br />Workflow.
                  </h2>
                  <div className="space-y-12">
                    {[
                      { step: "01", title: "Select Interface", desc: "Choose your medium: Holographic, Matte, or Glossy." },
                      { step: "02", title: "Inject Assets", desc: "Upload your designs or browse our curated library." },
                      { step: "03", title: "Physical Deploy", desc: "Our engine prints and ships your stickers globally." }
                    ].map((s, i) => (
                      <div key={i} className="flex gap-8 group">
                        <div className="text-4xl font-black text-purple-500/40 group-hover:text-purple-500 transition-colors">{s.step}</div>
                        <div>
                          <h4 className="text-2xl font-black text-white uppercase italic mb-2 tracking-tight">{s.title}</h4>
                          <p className="text-white/40 font-bold text-lg">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full" />
                  <div className="relative size-80 md:size-[500px] border border-white/10 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 size-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-2xl rotate-45">🎨</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-20 bg-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl -rotate-12">🚀</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 size-20 bg-blue-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl rotate-12">🔥</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-20 bg-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl -rotate-45">💎</div>
                    <div className="size-40 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center">
                      <div className="text-6xl">✨</div>
                    </div>
                  </div>
                </div>
              </GlassContainer>
            </div>
          </section>

          {/* Community & Testimonials */}
          <section className="py-32 relative">
            <div className="container mx-auto px-4 mb-20 text-center">
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-8">
                Network Status: <span className="text-green-500">Live</span>
              </h2>
              <p className="text-xl text-white/40 font-bold uppercase tracking-widest max-w-2xl mx-auto">
                Join thousands of creators deploying expression across the physical world.
              </p>
            </div>
            
            <Marquee pauseOnHover className="[--duration:40s]">
              {testimonials.map((t) => (
                <GlassContainer
                  key={t.id}
                  className="mx-4 p-10 rounded-[2.5rem] min-w-[350px] max-w-[450px] border-white/5 hover:border-white/20 transition-all duration-500"
                  intensity={0.6}
                >
                  <p className="text-white/80 text-xl font-bold italic mb-8">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-sm uppercase tracking-widest">{t.name}</div>
                      <div className="text-[10px] text-white/30 font-black uppercase tracking-tighter">Verified Creator</div>
                    </div>
                  </div>
                </GlassContainer>
              ))}
            </Marquee>
          </section>

          {/* Final CTA */}
          <section className="py-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-7xl md:text-9xl font-black text-white mb-12 uppercase italic tracking-tighter leading-none">
                Ready to <br />Deploy?
              </h2>
              <button className="group relative px-16 py-8 bg-purple-600 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-3xl font-black uppercase italic tracking-widest text-white">Get Started Now →</span>
              </button>
              <div className="mt-12 text-white/30 font-black uppercase tracking-[0.5em] text-xs">No Subscription Required. Just Vibes.</div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-x-12 {
          transform: rotateX(12deg);
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
