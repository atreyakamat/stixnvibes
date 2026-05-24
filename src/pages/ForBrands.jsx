import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, Coffee, Building, ShieldCheck, Truck, Send, HelpCircle, Briefcase, Award } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'
import { Footer } from '../components/Footer'
import { CinematicAmbientBackground } from '../components/CinematicAmbientBackground'

// Custom Sticker Peel corner component
const PeelCorner = () => (
  <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
    <div className="absolute top-0 right-0 w-14 h-14 bg-[#2f2e2a] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500 ease-out" />
  </div>
);

export default function ForBrands() {
  const [bulkQty, setBulkQty] = useState(1000);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const leadTime = bulkQty >= 5000 ? "5-7 business days" : "3-5 business days";

  // Preloaded Brand Use Cases
  const collabs = [
    {
      title: "Tech Cafés & Restaurants",
      desc: "Brand your counter tables, take-away cups, and packaging. Our custom vinyl is scratchproof, thermal-resistant, and handles heavy coffee spills with absolute ease.",
      icon: <Coffee className="w-6 h-6 text-primary" />,
      tag: "Offline Merges"
    },
    {
      title: "Corporate Stickers",
      desc: "Bespoke developer laptop sticker sheets, startup retreat bundles, and corporate giveaways. Engineered with zero-residue backings to protect high-end hardware.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      tag: "Business Gear"
    },
    {
      title: "Festivals & Music Drops",
      desc: "Curate limited-edition sticker drops, street art promotions, and branding collabs. Scratch-shielded and weather-shielded to withstand Goan sun and rain.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      tag: "Culture & Events"
    }
  ];

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative overflow-hidden">
      {/* Cinematic ambient moving background animations */}
      <CinematicAmbientBackground />
      
      {/* Background utilities with colorful glowing blur edges */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-gradient-to-tr from-primary/5 via-pink-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-6 animate-pulse">
          B2B collaborations
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Bespoke branding assets for ", className: "text-[#E1E0CC] font-normal" },
            { text: "forward-thinking brands. ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "We are open for collaboration.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0] max-w-5xl mx-auto mb-6"
        />

        <p className="text-primary/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Stix and Vibes is actively expanding corporate sticker making and partnership drops for tech cafes, restaurants, offline brand integrations, startups, and events.
        </p>
      </section>

      {/* Brand Collabs grid with custom visual card details */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {collabs.map((col, idx) => (
          <div 
            key={idx} 
            className="bg-[#101010] border-2 border-white/5 hover:border-primary/20 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
          >
            {/* Corner peel */}
            <PeelCorner />
            
            {/* Hover visual border glows */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DEDBC8]/5 to-transparent group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />

            <div>
              <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest block mb-4">{col.tag}</span>
              <div className="size-12 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {col.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{col.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{col.desc}</p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 text-xs font-mono text-gray-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Indestructible Goan Quality</span>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Bulk Quote Estimator */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 bg-[#101010] border border-white/5 rounded-[2.5rem] overflow-hidden group">
        
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Calc sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-10">
          <div className="space-y-2">
            <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block">
              Volume Configuration
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">Select B2B asset quantities.</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-baseline font-mono text-xs text-gray-500">
              <span>TARGET QUANTITY:</span>
              <span className="text-[#DEDBC8] text-lg font-bold font-sans">{bulkQty} brand assets</span>
            </div>

            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500" 
              value={bulkQty}
              onChange={(e) => setBulkQty(parseInt(e.target.value))}
              className="w-full accent-[#DEDBC8] bg-neutral-800 h-1.5 rounded-full cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>500 (Base B2B)</span>
              <span>2500 (Tier 2)</span>
              <span>5000 (Tier 3)</span>
              <span>10000 (Corporate Scale)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-center text-xs font-mono text-gray-400">
            <div>
              <Truck className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">TURNAROUND</span>
              <span className="text-white font-bold block mt-0.5">{leadTime}</span>
            </div>
            <div>
              <Award className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">DESIGN CHECK</span>
              <span className="text-white font-bold block mt-0.5">Complimentary</span>
            </div>
            <div>
              <Building className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">SETUP COST</span>
              <span className="text-emerald-400 font-bold block mt-0.5">₹0 Setup Fee</span>
            </div>
          </div>
        </div>

        {/* Dynamic Cost Panel (5 cols) - PRICING DISCLOSURE REMOVED */}
        <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-8 text-center space-y-6">
          <div>
            <div className="size-12 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center mb-4 mx-auto text-xl shadow-lg">
              🏢
            </div>
            <span className="text-primary text-[9px] uppercase font-mono tracking-widest block font-bold">Partnership Uplink</span>
            <h3 className="text-white font-bold text-lg mt-2">Open for Collaborations</h3>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              We customize volume orders in India (INR ₹). Slide the volume bar to lock your configuration, then hit one of our direct B2B quote networks!
            </p>
          </div>

          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-emerald-400 text-xs sm:text-sm font-semibold p-4 border border-emerald-500/20 bg-black/20 rounded-xl"
            >
              Uplink locked. Check your coordinates (inbox) shortly!
            </motion.div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-white/5 text-left">
              <div className="text-[9px] text-gray-500 uppercase font-mono tracking-widest text-center mb-2">Manual B2B Uplinks</div>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4">
                <a 
                  href="https://wa.me/917744020601" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/50 border border-white/5 p-2.5 rounded-lg text-center hover:border-emerald-400/30 hover:bg-[#161616] transition-all block"
                >
                  💬 WhatsApp
                </a>
                <a 
                  href="https://instagram.com/stixnvibes" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/50 border border-white/5 p-2.5 rounded-lg text-center hover:border-pink-400/30 hover:bg-[#161616] transition-all block"
                >
                  📸 Instagram
                </a>
                <a 
                  href="tel:+918668859020" 
                  className="bg-black/50 border border-white/5 p-2.5 rounded-lg text-center hover:border-blue-400/30 hover:bg-[#161616] transition-all block"
                >
                  📞 Phone
                </a>
                <a 
                  href="mailto:hello@stixnvibes.com" 
                  className="bg-black/50 border border-white/5 p-2.5 rounded-lg text-center hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all block"
                >
                  ✉️ Email
                </a>
              </div>

              <div className="border-t border-white/5 pt-4">
                <input 
                  type="email" 
                  placeholder="YOUR_UPLINK@EMAIL.COM" 
                  className="w-full bg-[#161616] border border-white/10 p-3 rounded-lg text-xs font-mono placeholder:text-gray-700 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                />
                <button 
                  onClick={() => setFormSubmitted(true)}
                  className="w-full mt-2 bg-[#DEDBC8] text-black font-bold uppercase tracking-wider text-xs py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
                >
                  Place B2B Vibe
                </button>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* Global Unified Footer rendering the secret Dino 3D portal */}
      <Footer />

    </div>
  );
}
