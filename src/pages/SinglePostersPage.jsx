import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// Refraction/Glass constants
const GLASS_PANEL = "bg-white/[0.03] backdrop-blur-[32px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
const GLASS_CARD = "bg-white/[0.05] backdrop-blur-[24px] border border-white/10 shadow-[0_4px_24px_0_rgba(0,0,0,0.2)]"

function SinglePostersPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow max-w-7xl mx-auto px-6 py-24 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
              Single <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient-x">Posters</span>
            </h1>
            <p className="text-2xl text-white/50 font-bold italic tracking-tight">
              Premium individual posters for your space.
            </p>
          </motion.div>

          <div className={`p-20 rounded-[4rem] ${GLASS_PANEL} inline-block`}>
            <div className="text-9xl mb-10 opacity-20">🖼️</div>
            <h2 className="text-4xl font-black uppercase italic mb-4">Coming Soon</h2>
            <p className="text-white/30 font-bold uppercase tracking-widest text-sm">Our solo masterpieces are on their way.</p>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default SinglePostersPage;
