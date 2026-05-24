import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Terminal, Coffee, Heart, CheckCircle, Smile, HeartHandshake, Box, Flame } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'

// Peel Corner styling
const PeelCorner = () => (
  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
    <div className="absolute top-0 right-0 w-14 h-14 bg-[#2f2e2a] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500" />
  </div>
);

export default function OurStory() {
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" });

  const foundersRef = useRef(null);
  const isFoundersInView = useInView(foundersRef, { once: true, margin: "-100px" });

  const workflowRef = useRef(null);
  const isWorkflowInView = useInView(workflowRef, { once: true, margin: "-100px" });

  const audiences = [
    {
      icon: "📚",
      title: "College & Journalers",
      desc: "Express your thoughts, decorate your hardware, and make your visual personality stick."
    },
    {
      icon: "☕",
      title: "Cafés & Small Brands",
      desc: "Brand your environment with custom layouts that reflect your unique vibe and story."
    },
    {
      icon: "💥",
      title: "Gifting & Support",
      desc: "Perfect for gifts, drops, and those moments when you need chaotic emotional support."
    }
  ];

  const workflowSteps = [
    {
      icon: <Terminal className="w-6 h-6 text-primary" />,
      title: "1. Design",
      desc: "Sparked by memes, late-night hacks, and Goan sunsets. We transform everyday inspirations into premium digital relics ready for print."
    },
    {
      icon: <Flame className="w-6 h-6 text-primary" />,
      title: "2. Print",
      desc: "Printed onto heavyweight, ultra-durable vinyl coated in scratch-resistant UV matte shields. Built to withstand moisture, sun, and active use."
    },
    {
      icon: <Box className="w-6 h-6 text-primary" />,
      title: "3. Pack",
      desc: "Carefully packaged by hand (with a few surprise elements thrown in). Dispatched from our headquarters direct to your doorstep."
    }
  ];

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative">
      {/* Background Noise & Blur */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-6">
          Who We Are
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Not just stickers. ", className: "text-[#E1E0CC] font-normal" },
            { text: "A whole physical vibe. ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "Made in Goa.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.0] max-w-5xl mx-auto mb-6"
        />

        <p className="text-primary/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mt-6">
          Stix 'N' Vibes is a Goa-born creative studio making custom stickers, polaroids, and poster drops for people who live loud, love high-end design, and feel deeply. We are building a universe where self-expression meets raw physical aesthetics.
        </p>
      </section>

      {/* Target Audiences section */}
      <section ref={introRef} className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((aud, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className="bg-[#101010] border border-white/5 hover:border-white/10 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden group transition-all duration-300"
            >
              <PeelCorner />
              <span className="text-4xl block mb-4">{aud.icon}</span>
              <h4 className="text-white font-bold text-base sm:text-lg mb-2">{aud.title}</h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{aud.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section ref={foundersRef} className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block mb-3">
            Creative Directors
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">Meet the Founders</h2>
        </div>

        {/* Tactile Business Card Grids */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          
          {/* Founder 1: Atreya Kamat */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -1 }}
            animate={isFoundersInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="bg-[#101010] border border-white/5 rounded-3xl p-8 w-full md:w-80 h-[420px] flex flex-col justify-between relative overflow-hidden group"
          >
            <PeelCorner />
            
            {/* Visual background decals */}
            <div className="absolute top-4 left-4 text-3xl opacity-5 group-hover:opacity-10 transition-opacity">🚀</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-5 group-hover:opacity-10 transition-opacity">🔮</div>
            
            {/* Header */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center text-2xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                🔮
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Atreya Kamat</h3>
              <span className="text-primary text-[10px] font-bold uppercase tracking-wider block mb-1">
                The Chaos Wizard
              </span>
              <div className="h-px w-10 bg-primary/30 mx-auto" />
            </div>

            {/* Profile Content */}
            <div className="flex-1 flex flex-col justify-center space-y-3 py-4 relative z-10">
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Engineering student by day 📚, startup ninja by night 🥷. Turns coffee into elegant production layouts.
                </p>
              </div>
              <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                Chaos ➔ Structure
              </div>
              <div className="text-center text-xs text-primary/70">
                Powered by Dreams
              </div>
            </div>

            {/* Tactile bumper quote */}
            <div className="bg-[#161616] border border-white/5 text-gray-300 py-2 rounded-xl text-center text-[11px] font-bold relative z-10">
              "Ideas stick — literally!" 🎯
            </div>
          </motion.div>

          {/* Founder 2: Kritik Sawant */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 1 }}
            animate={isFoundersInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="bg-[#101010] border border-white/5 rounded-3xl p-8 w-full md:w-80 h-[420px] flex flex-col justify-between relative overflow-hidden group"
          >
            <PeelCorner />

            <div className="absolute top-4 left-4 text-3xl opacity-5 group-hover:opacity-10 transition-opacity">🎬</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-5 group-hover:opacity-10 transition-opacity">🩺</div>

            {/* Header */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-full flex items-center justify-center text-2xl shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                🩺
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Kritik Sawant</h3>
              <span className="text-primary text-[10px] font-bold uppercase tracking-wider block mb-1">
                The Vibe Doctor
              </span>
              <div className="h-px w-10 bg-primary/30 mx-auto" />
            </div>

            {/* Profile Content */}
            <div className="flex-1 flex flex-col justify-center space-y-3 py-4 relative z-10">
              <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Future doctor 👨‍⚕️, current cinema critic 🍿. Handles client support and drop sanity while studying medicine.
                </p>
              </div>
              <div className="text-center text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                People Person
              </div>
              <div className="text-center text-xs text-primary/70">
                GMC Goa & Your Heart
              </div>
            </div>

            {/* Tactile bumper quote */}
            <div className="bg-[#161616] border border-white/5 text-gray-300 py-2 rounded-xl text-center text-[11px] font-bold relative z-10">
              "Science in books. Stickers in wild." 🔬
            </div>
          </motion.div>

        </div>

        {/* Partnership Story */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isFoundersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 bg-[#101010] border border-white/5 rounded-[2rem] p-6 sm:p-8 text-center relative overflow-hidden group"
        >
          <PeelCorner />
          <h3 className="text-lg font-bold text-white mb-3 flex items-center justify-center gap-2">
            <HeartHandshake className="w-5 h-5 text-primary" />
            <span>The Dynamic Duo</span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            One builds software structures with pure tech engineering precision 🔧, the other directs vibes, customer care, and narrative operations 🩺. Together, they balance organized systems and creative magic.
            <br />
            <span className="text-[10px] text-gray-600 block mt-4 uppercase tracking-widest font-mono">Powered by friendship, fueled by passion</span>
          </p>
        </motion.div>
      </section>

      {/* How We Make It section */}
      <section ref={workflowRef} className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block mb-3">
            Workflow Logic
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight">How we construct artifacts.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isWorkflowInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#101010] border border-white/5 rounded-2xl p-6 relative group"
            >
              <PeelCorner />
              <div className="size-10 bg-[#161616] border border-white/10 rounded flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h4 className="text-white font-bold text-sm sm:text-base mb-2">{step.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Goa Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isWorkflowInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-primary/70 text-xs sm:text-sm italic">
            "Everything is made right here in Goa — inspired by sunsets, beach culture, and creative chaos. You make this chaos beautiful." 🏖️
          </p>
        </motion.div>
      </section>

    </div>
  );
}
