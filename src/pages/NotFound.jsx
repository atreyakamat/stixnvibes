import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Refraction/Glass constants
const GLASS_PANEL = "bg-white/[0.03] backdrop-blur-[32px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"

function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center px-6 py-24 w-full text-center">
          <GlassContainer className="p-20 rounded-[4rem]" intensity={1.2}>
            <h1 className="text-9xl font-black mb-8 tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">404</h1>
            <h2 className="text-4xl font-black uppercase italic mb-8">Vibe Check Failed</h2>
            <p className="text-white/50 font-bold mb-12 text-xl">The page you're looking for doesn't exist.</p>
            <Link to="/">
              <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:scale-105 transition-all duration-500">
                Back to Reality
              </button>
            </Link>
          </GlassContainer>
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Simple Glass Container for NotFound since it doesn't need mouse tracking logic duplication
const GlassContainer = ({ children, className }) => (
  <div className={`bg-white/[0.03] backdrop-blur-[32px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] ${className}`}>
    {children}
  </div>
);

export default NotFound;
