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
        <div className="bg-black/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between gap-6 md:gap-12 lg:gap-14 pointer-events-auto border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-max mx-auto">
          
          {/* Logo Brand Link */}
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-[#E1E0CC] hover:text-[#DEDBC8] font-bold text-sm sm:text-base transition-colors py-0.5"
          >
            <span className="font-sans tracking-tight">stix n vibes</span>
            <span className="text-primary text-xs shrink-0 select-none animate-pulse">✦</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 relative py-1"
                  style={{ 
                    color: isActive ? '#E1E0CC' : 'rgba(225, 224, 204, 0.6)' 
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlobalNav"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#DEDBC8]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E1E0CC] hover:text-white p-1 transition-colors flex items-center justify-center"
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
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Slide down container */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-[#0c0c0c] border-b border-white/5 z-45 md:hidden pt-28 pb-10 px-8 shadow-2xl flex flex-col items-center justify-center"
            >
              <div className="flex flex-col gap-6 items-center text-center w-full max-w-xs">
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
                        className="block py-2 text-lg sm:text-xl font-bold uppercase tracking-widest transition-colors relative"
                        style={{ 
                          color: isActive ? '#E1E0CC' : 'rgba(225, 224, 204, 0.5)' 
                        }}
                      >
                        {link.label}
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
