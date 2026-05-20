import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 sm:px-12 py-5 bg-white/[0.03] backdrop-blur-xl sticky top-0 z-40 selection:bg-purple-500">
        <div className="flex items-center gap-4 text-white">
          <Link to="/" className="flex items-center gap-4 group" onClick={closeMobileMenu}>
            <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 text-white">
              <Logo className="w-6 h-6" />
            </div>
            <h2 className="text-white text-2xl font-black leading-tight tracking-tighter uppercase italic group-hover:tracking-normal transition-all duration-500">Stix N Vibes</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-12 items-center">
          <div className="flex items-center gap-10">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  location.pathname === link.to 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-12 h-12 border border-white/10 bg-white/[0.05] text-white rounded-full"
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-6 h-0.5 bg-white block my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full bg-[#0a0a0a]/50 backdrop-blur-[40px] border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-12 h-full flex flex-col">
                <div className="flex items-center justify-between mb-20">
                  <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">Menu</h3>
                  <button
                    onClick={closeMobileMenu}
                    className="p-4 border border-white/10 bg-white/[0.05] text-white rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMobileMenu}
                        className={`block text-5xl font-black uppercase italic tracking-tighter transition-all ${
                          location.pathname === link.to 
                            ? 'text-white underline decoration-[#ff4d4d]' 
                            : 'text-white/30 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <p className="text-lg font-black text-white/50 uppercase italic mb-8 tracking-[0.3em]">Made in Goa 🌴</p>
                    <div className="flex justify-center space-x-8">
                      <div className="w-8 h-8 rounded-full bg-[#ff4d4d] border border-white/10 shadow-2xl"></div>
                      <div className="w-8 h-8 rounded-full bg-[#f9a8d4] border border-white/10 shadow-2xl"></div>
                      <div className="w-8 h-8 rounded-full bg-[#42c4ef] border border-white/10 shadow-2xl"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
