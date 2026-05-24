import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Terminal, Coffee, Building, ShieldCheck, Truck, Percent, Send } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'

export default function ForBrands() {
  const [bulkQty, setBulkQty] = useState(1000);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Pricing calculator helper
  const getBulkUnitPrice = () => {
    if (bulkQty >= 10000) return 0.22;
    if (bulkQty >= 5000) return 0.28;
    if (bulkQty >= 2500) return 0.35;
    if (bulkQty >= 1000) return 0.45;
    return 0.55; // 500 base B2B price
  };

  const unitCost = getBulkUnitPrice();
  const subtotal = unitCost * bulkQty;
  const leadTime = bulkQty >= 5000 ? "5-7 business days" : "3-5 business days";

  // Preloaded Brand Use Cases
  const collabs = [
    {
      title: "Tech Cafés & Workspaces",
      desc: "Turn your counter tables and beverage containers into highly dynamic visual hotspots. Premium vinyl handles moisture, coffee spills, and heat effortlessly.",
      icon: <Coffee className="w-6 h-6 text-primary" />,
      tag: "Hospitality"
    },
    {
      title: "Startups & Tech Agencies",
      desc: "Deploy logo packs for company retreats, onboardings, and developer laptop lids. Zero residue backings ensure premium hardware stays protected.",
      icon: <Terminal className="w-6 h-6 text-primary" />,
      tag: "Developer Gear"
    },
    {
      title: "Festivals & Music Campaigns",
      desc: "Curate limited-edition merch drops and heavy-gauge street art campaigns. Scratchproof and weather-shielded to ride outdoors.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      tag: "Culture & Events"
    }
  ];

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative">
      {/* Background utilities */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-6">
          B2B solutions
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Deploy premium physical branding. ", className: "text-[#E1E0CC] font-normal" },
            { text: "Built for visionaries, ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "trusted by brands.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.0] max-w-5xl mx-auto mb-6"
        />

        <p className="text-primary/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Cafés, startups, universities, and creators partner with Stix and Vibes to deploy high-grade heavy vinyl assets that double as physical visual validators.
        </p>
      </section>

      {/* Brand Collabs grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {collabs.map((col, idx) => (
          <div 
            key={idx} 
            className="bg-[#101010] border border-white/5 hover:border-white/10 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
          >
            {/* Corner peel */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#1f1e1a] rotate-45 translate-x-6 -translate-y-6 shadow-md border-l border-b border-white/10" />
            </div>

            <div>
              <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest block mb-4">{col.tag}</span>
              <div className="size-12 bg-[#161616] rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                {col.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{col.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{col.desc}</p>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 text-xs font-mono text-gray-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full weather/scratch protection</span>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Bulk Quote Estimator */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12 bg-[#101010] border border-white/5 rounded-[2rem] overflow-hidden group">
        
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Calc sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-8 p-6 sm:p-10">
          <div className="space-y-2">
            <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold block">
              B2B bulk calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">Instant bulk pricing estimate.</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-baseline font-mono text-xs text-gray-500">
              <span>ESTIMATED QUANTITY:</span>
              <span className="text-[#DEDBC8] text-lg font-bold font-sans">{bulkQty} stickers</span>
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
              <span>10000 (Max B2B)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-center text-xs font-mono text-gray-400">
            <div>
              <Truck className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">TURNAROUND</span>
              <span className="text-white font-bold block mt-0.5">{leadTime}</span>
            </div>
            <div>
              <Percent className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">UNIT PRICE</span>
              <span className="text-white font-bold block mt-0.5">${unitCost.toFixed(2)}</span>
            </div>
            <div>
              <Building className="w-5 h-5 mx-auto text-primary mb-2" />
              <span className="block text-[9px] text-gray-600">SETUP COST</span>
              <span className="text-emerald-400 font-bold block mt-0.5">$0.00</span>
            </div>
          </div>
        </div>

        {/* Dynamic Cost Panel (5 cols) */}
        <div className="lg:col-span-5 bg-black/40 border border-white/5 rounded-2xl p-8 text-center space-y-6">
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Estimated Total Cost</span>
            <span className="text-[#E1E0CC] font-bold text-4xl sm:text-5xl mt-2 block">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-gray-600 text-xs mt-1 block">Includes express worldwide delivery</span>
          </div>

          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-emerald-400 text-xs sm:text-sm font-semibold p-4 border border-emerald-500/20 bg-black/20 rounded-xl"
            >
              Signal received! Check your coordinates.
            </motion.div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-white/5 text-left">
              <div className="text-[9px] text-gray-500 uppercase font-mono tracking-widest text-center mb-2">Instant Quote Uplinks</div>
              
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4">
                <a 
                  href="https://wa.me/917744020601" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/50 border border-white/5 p-2 rounded-lg text-center hover:border-emerald-400/30 hover:bg-[#161616] transition-all block"
                >
                  💬 WhatsApp
                </a>
                <a 
                  href="https://instagram.com/stixnvibes" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-black/50 border border-white/5 p-2 rounded-lg text-center hover:border-pink-400/30 hover:bg-[#161616] transition-all block"
                >
                  📸 Instagram
                </a>
                <a 
                  href="tel:+918668859020" 
                  className="bg-black/50 border border-white/5 p-2 rounded-lg text-center hover:border-blue-400/30 hover:bg-[#161616] transition-all block"
                >
                  📞 Phone
                </a>
                <a 
                  href="mailto:hello@stixnvibes.com" 
                  className="bg-black/50 border border-white/5 p-2 rounded-lg text-center hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all block"
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
                  <span>Email B2B Deck</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
