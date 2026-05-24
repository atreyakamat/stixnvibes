import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Our story", path: "/story" },
    { label: "Sticker Packs", path: "/packs" },
    { label: "Custom Orders", path: "/custom" },
    { label: "For Brands", path: "/brands" },
    { label: "Inquiries", path: "/inquiries" }
  ];

  return (
    <>
      {/* Global Floating Pill Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4">
        <div className="bg-black/90 backdrop-blur-md rounded-full px-6 py-2.5 flex items-center justify-between gap-6 md:gap-10 pointer-events-auto border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] max-w-max mx-auto relative">
          
          {/* Logo Brand Link */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-[#E1E0CC] hover:text-[#DEDBC8] font-bold text-xs sm:text-sm tracking-tight transition-colors py-1.5 pl-2 select-none"
          >
            <span className="font-sans">stix n vibes</span>
            <span className="text-primary text-xs shrink-0 animate-pulse">✦</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative px-4 py-2 rounded-full overflow-visible select-none"
                  style={{ 
                    color: isActive ? '#E1E0CC' : 'rgba(225, 224, 204, 0.55)' 
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlobalNav"
                      className="absolute inset-0 bg-[#DEDBC8]/10 rounded-full border border-white/5"
                      transition={{ 
                        type: "spring", 
                        stiffness: 280, 
                        damping: 26 
                      }}
                      style={{ originY: '0px' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E1E0CC] hover:text-white p-1.5 transition-colors flex items-center justify-center pr-2"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-45 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Slide down container */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-[#0c0c0c] border-b border-white/5 z-48 md:hidden pt-28 pb-10 px-8 shadow-2xl flex flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-5 items-center text-center w-full max-w-xs">
                {navLinks.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="w-full"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-2.5 text-base sm:text-lg font-bold uppercase tracking-widest transition-colors relative rounded-full"
                        style={{ 
                          color: isActive ? '#E1E0CC' : 'rgba(225, 224, 204, 0.45)' 
                        }}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <div className="w-8 h-[2px] bg-[#DEDBC8] mx-auto mt-1 rounded" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Visual spark decorative */}
                <div className="mt-8 border-t border-white/5 w-full pt-8 flex flex-col items-center gap-2">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-mono">physical manifests</p>
                  <Sparkles className="text-primary w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
export default Header;
