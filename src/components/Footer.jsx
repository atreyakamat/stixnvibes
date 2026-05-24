import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowUpRight, HelpCircle } from 'lucide-react'
import { DinoGame3D } from './DinoGame3D'
import Logo from './Logo'

export function Footer() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6 sm:px-12 relative z-20 overflow-hidden">
      
      {/* Visual background decals */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neutral-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Logo block */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <Logo className="w-5 h-5 shrink-0" />
            <Link 
              to="/" 
              className="text-[#E1E0CC] hover:text-[#DEDBC8] font-bold text-base tracking-normal font-sans transition-colors lowercase"
            >
              stix n vibes.
            </Link>
            <span className="text-[10px] text-gray-600 font-mono">© 2026</span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            preserving internet relics in Goa 🏖️
          </p>
        </div>

        {/* Footer shortcuts & play game portal */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs sm:text-sm font-mono text-gray-500 uppercase tracking-widest">
          
          {/* Secret 3D Dino Game shortcut */}
          <button
            onClick={() => setIsGameOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-950 hover:bg-[#101010] border-2 border-primary/20 hover:border-[#DEDBC8] rounded-xl text-[#E1E0CC] font-bold transition-all hover:scale-105 active:scale-95 text-xs tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>🕹️ Play Vibe Dino 3D</span>
          </button>

          <Link to="/story" className="hover:text-[#E1E0CC] transition-colors flex items-center gap-0.5">
            <span>Story</span>
            <ArrowUpRight className="w-3 h-3 text-gray-600" />
          </Link>

          <Link to="/packs" className="hover:text-[#E1E0CC] transition-colors flex items-center gap-0.5">
            <span>Shop</span>
            <ArrowUpRight className="w-3 h-3 text-gray-600" />
          </Link>

          <Link to="/custom" className="hover:text-[#E1E0CC] transition-colors flex items-center gap-0.5">
            <span>Configure</span>
            <ArrowUpRight className="w-3 h-3 text-gray-600" />
          </Link>
          
        </div>

      </div>

      {/* R3F Hidden Game portal overlay container */}
      <DinoGame3D isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

    </footer>
  );
}
export default Footer;
