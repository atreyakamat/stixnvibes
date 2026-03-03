import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// Refraction/Glass constants
const GLASS_PANEL = "bg-white/[0.03] backdrop-blur-[32px] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
const GLASS_CARD = "bg-white/[0.05] backdrop-blur-[24px] border border-white/10 shadow-[0_4px_24px_0_rgba(0,0,0,0.2)]"

function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic">
                Get In <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">Touch</span>
              </h1>
              <p className="text-2xl text-white/50 font-bold italic tracking-tight mb-16 max-w-md leading-relaxed">
                Have a question? A collab idea? Or just want to send some vibes? We're all ears.
              </p>

              <div className="space-y-10">
                {[
                  { label: "Email", value: "hello@stixnvibes.com", icon: "📧" },
                  { label: "Instagram", value: "@stixnvibes", icon: "📸" },
                  { label: "Location", value: "Goa, India 🌴", icon: "📍" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-pointer">
                    <div className="size-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">{item.label}</p>
                      <p className="text-xl font-black uppercase italic tracking-wider">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-12 md:p-16 rounded-[4rem] ${GLASS_PANEL} relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-pink-500" />
              
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30 ml-2">Name</label>
                    <input 
                      type="text" 
                      placeholder="YOUR NAME"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 font-black text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30 ml-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="YOUR EMAIL"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 font-black text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30 ml-2">Subject</label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 font-black text-white focus:outline-none focus:border-pink-500 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#0a0a0a]">General Inquiry</option>
                    <option className="bg-[#0a0a0a]">Custom Order</option>
                    <option className="bg-[#0a0a0a]">Collaboration</option>
                    <option className="bg-[#0a0a0a]">Support</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.3em] text-white/30 ml-2">Message</label>
                  <textarea 
                    rows="5"
                    placeholder="WHAT'S ON YOUR MIND?"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-6 font-black text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10 resize-none"
                  ></textarea>
                </div>

                <button className="w-full relative group overflow-hidden h-20 rounded-3xl bg-gradient-to-r from-blue-600/40 to-purple-600/40 border border-white/10 font-black uppercase italic tracking-[0.3em] text-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] active:scale-95">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                  <span className="relative z-10">Send Message</span>
                </button>
              </form>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default ContactPage;
