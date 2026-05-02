import React, { useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Marquee } from '../components/MarqueeComponent'
import { BackgroundBeams, Starfield } from '../components/BackgroundEffects'

// Enhanced Refraction Glass Component
const GlassContainer = ({ children, className = "", intensity = 1 }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const gradientX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const gradientY = useTransform(springY, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${0.03 * intensity})`,
        backdropFilter: `blur(${32 * intensity}px)`,
        border: `1px solid rgba(255, 255, 255, ${0.1 * intensity})`,
      }}
    >
      {/* Real-time refraction highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(255,255,255,0.15), transparent)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};

// Star rating component (Glass style)
const StarRating = ({ rating, size = "20px" }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className={i < rating ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "text-white/10"} 
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            fill="currentColor" 
            viewBox="0 0 256 256"
          >
            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

function LandingPage() {
  const testimonials = [
    { id: 1, name: "Alex J.", text: "These stickers went through rain, coffee spills, and still slayed. Stuck on my laptop like trauma — forever.", rating: 5 },
    { id: 2, name: "Morgan S.", text: "Ordered a custom polaroid set and literally screamed. Colors? Perfect. Quality? Chef's kiss. Me? Obsessed.", rating: 5 },
    { id: 3, name: "Jamie L.", text: "Slapped them on my hydro flask and it instantly had a personality. The quality is wild.", rating: 5 },
    { id: 4, name: "Casey R.", text: "Waterproof stickers that actually work? Revolutionary. My laptop survived a whole semester.", rating: 5 },
    { id: 5, name: "Taylor M.", text: "Die-cut precision is insane. Every detail came out perfect on my custom design.", rating: 5 },
    { id: 6, name: "Jordan K.", text: "Bulk order for my small business was seamless. Quality stayed consistent across all 100 stickers.", rating: 5 }
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500 relative" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      
      {/* Interactive & Reactive Background Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Starfield />
        <BackgroundBeams />
        
        {/* Colorful Refraction Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 150, -50, 0], 
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -150, 100, 0], 
            y: [0, 150, -100, 0],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 100, -150, 0], 
            y: [0, -150, 100, 0],
            scale: [1, 1.1, 0.8, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 left-1/3 w-[900px] h-[900px] bg-pink-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow w-full">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] w-full flex items-center justify-center py-24 px-4">
            <GlassContainer 
              className="max-w-6xl mx-auto text-center p-16 md:p-24 rounded-[4rem] shadow-2xl"
              intensity={1.2}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-block bg-white/[0.08] backdrop-blur-xl border border-white/10 text-white/90 px-8 py-2.5 rounded-full mb-10 font-black text-xs uppercase tracking-[0.3em]"
              >
                Expression Made Tangible
              </motion.div>
              
              <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-[-0.05em] leading-[0.9] uppercase italic drop-shadow-2xl">
                STICK <br />
                WHAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] via-[#f9a8d4] to-[#42c4ef] animate-gradient-x">
                  YOU FEEL
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-white/70 font-bold mb-6 max-w-3xl mx-auto leading-relaxed tracking-tight">
                Not just stickers. Your vibe, your story, your space—made visible. <br className="hidden md:block" /> 
                <span className="text-white">From laptops to bikes, bottles to bedrooms—turn anything into you.</span>
              </p>
            </GlassContainer>
          </section>

          {/* Why Stix N Vibes Section */}
          <section className="py-32 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tight">
                  Feels premium.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] via-[#f9a8d4] to-[#42c4ef]">
                    Priced for everyone.
                  </span>
                </h2>
                <p className="text-xl text-white/60 font-bold max-w-2xl mx-auto">
                  Because good design shouldn't be expensive—it should be everywhere.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                <GlassContainer 
                  className="p-12 rounded-[3rem] text-center group cursor-default"
                  intensity={0.8}
                >
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(66,196,239,0.4)]">💧</div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4 italic text-white">Waterproof</h3>
                  <p className="text-white/60 font-bold text-lg leading-relaxed">Built for real life. Rain, spills, sun—they survive it all.</p>
                </GlassContainer>
                
                <GlassContainer 
                  className="p-12 rounded-[3rem] text-center group cursor-default"
                  intensity={0.8}
                >
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(255,77,77,0.4)]">✨</div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4 italic text-white">Sharp Prints</h3>
                  <p className="text-white/60 font-bold text-lg leading-relaxed">High-quality prints that look crisp and bold, every single time.</p>
                </GlassContainer>

                <GlassContainer 
                  className="p-12 rounded-[3rem] text-center group cursor-default"
                  intensity={0.8}
                >
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">🎨</div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4 italic text-white">Designed Right</h3>
                  <p className="text-white/60 font-bold text-lg leading-relaxed">Crafted with creators, not factories. Art meets quality.</p>
                </GlassContainer>

                <GlassContainer 
                  className="p-12 rounded-[3rem] text-center group cursor-default"
                  intensity={0.8}
                >
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">💰</div>
                  <h3 className="text-2xl font-black uppercase tracking-widest mb-4 italic text-white">Affordable</h3>
                  <p className="text-white/60 font-bold text-lg leading-relaxed">Premium without the premium price tag. Accessible to all.</p>
                </GlassContainer>
              </div>
            </div>
          </section>

          {/* Enhanced Testimonials Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-24">
              <GlassContainer className="inline-block px-12 py-5 rounded-full" intensity={0.5}>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter drop-shadow-xl">Your Vibe. In The Wild.</h2>
              </GlassContainer>
              <p className="text-xl text-white/60 font-bold max-w-2xl mx-auto mt-8">
                See how people are using Stix N Vibes to transform their everyday spaces. From messy desks to clean setups—this is what expression looks like.
              </p>
            </div>
            
            <Marquee pauseOnHover className="[--duration:50s]">
              {testimonials.map((testimonial) => (
                <GlassContainer
                  key={testimonial.id}
                  className="mx-6 p-12 rounded-[3rem] min-w-[400px] max-w-[500px] flex flex-col justify-between my-4 group hover:border-white/30 transition-colors duration-500"
                  intensity={0.7}
                >
                  <div>
                    <div className="flex items-center mb-10">
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-white/90 text-2xl font-bold leading-[1.4] mb-10 italic">"{testimonial.text}"</p>
                  </div>
                  <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                    <div className="size-16 rounded-2xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-white/20 flex items-center justify-center text-white font-black text-2xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {testimonial.name.charAt(0)}
                    </div>
                    <p className="font-black text-xl text-white/70 uppercase tracking-widest">— {testimonial.name}</p>
                  </div>
                </GlassContainer>
              ))}
            </Marquee>
          </section>

          {/* Final CTA Section */}
          <section className="py-32 relative">
            <div className="container mx-auto px-4">
              <GlassContainer 
                className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20 p-16 md:p-24 rounded-[4rem]"
                intensity={1.1}
              >
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[1] uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                    Your vibe <br />deserves to <br />be seen.
                  </h2>
                  <p className="text-white/60 text-2xl font-bold italic tracking-tight">Don't overthink it. Just stick it.</p>
                </div>
                <div className="lg:w-1/2 w-full max-w-md flex flex-col gap-6">
                  <button className="h-20 text-2xl bg-gradient-to-r from-blue-600/40 to-purple-600/40 border border-white/10 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
                    Shop Now →
                  </button>
                  <button className="h-20 text-2xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-white/10 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500">
                    Build Your Pack →
                  </button>
                </div>
              </GlassContainer>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage
