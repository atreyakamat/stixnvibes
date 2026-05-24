import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Star } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'
import { Footer } from '../components/Footer'

export default function Inquiries() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("Vibe Check"); // Vibe Check, Custom, Bulk, Other
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const totalSteps = 3;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  // Step wizard calculations
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 select-none relative flex flex-col justify-between">
      {/* Background noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute bottom-20 left-10 w-[30rem] h-[30rem] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Main content wrapper */}
      <div className="flex-grow flex flex-col justify-center py-10 z-10 relative">
        {/* Header */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 py-6 text-center">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-4">
            Direct uplink
          </span>
          
          <WordsPullUpMultiStyle
            segments={[
              { text: "Inject your signal. ", className: "text-[#E1E0CC] font-normal" },
              { text: "We stick with you, ", className: "italic font-serif text-[#DEDBC8]" },
              { text: "no matter what.", className: "text-[#E1E0CC] font-normal" }
            ]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.0] max-w-3xl mx-auto mb-4"
          />
        </section>

        {/* Interactive wizard container */}
        <section className="relative z-10 w-full max-w-xl mx-auto px-6 mt-6">
          
          <div className="bg-[#101010] border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Custom sticker corner peel */}
            <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#212121] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10" />
            </div>

            {isSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="size-20 bg-emerald-500/10 border border-emerald-500/20 text-[#DEDBC8] rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Signal Locked & Loaded</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                  Thank you, <span className="text-[#E1E0CC] font-bold">{name}</span>. Your request has been written onto our primary physical database. Stand by for a transmission check.
                </p>
                <button 
                  onClick={() => {
                    setIsSent(false);
                    setStep(1);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="bg-[#161616] text-[#E1E0CC] hover:bg-[#DEDBC8] hover:text-black border border-white/5 hover:border-black font-semibold text-xs px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300"
                >
                  Send Another Signal
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* Progress bar line */}
                <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: "33%" }}
                    animate={{ width: `${progressPercent}%` }}
                    className="bg-[#DEDBC8] h-full"
                  />
                </div>

                {/* Steps views */}
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="text-primary font-mono text-[10px] uppercase tracking-wider block">Identity coordinates</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">What should we call you?</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-mono text-gray-500">NAME / ALIAS</label>
                          <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="DESIGN_LORD" 
                            className="w-full bg-black border border-white/10 p-4 rounded-xl font-mono text-xs sm:text-sm placeholder:text-gray-800 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-mono text-gray-500">UPLINK EMAIL</label>
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="COORDINATES@DOMAIN.COM" 
                            className="w-full bg-black border border-white/10 p-4 rounded-xl font-mono text-xs sm:text-sm placeholder:text-gray-800 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="text-primary font-mono text-[10px] uppercase tracking-wider block">Frequency configuration</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Choose your signal type</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["Vibe Check", "Custom Collaboration", "Bulk Business Order", "Something Else"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type)}
                            className={`p-4 rounded-xl border text-left text-xs uppercase tracking-wider font-mono transition-all duration-300 ${
                              inquiryType === type 
                                ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] font-bold shadow-lg' 
                                : 'bg-black/20 border-white/5 hover:border-white/10 text-gray-400'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1">
                        <span className="text-primary font-mono text-[10px] uppercase tracking-wider block">Signal content</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Inject the message</h3>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono text-gray-500">YOUR MESSAGE</label>
                        <textarea 
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="ENTER_SIGNAL_HERE..." 
                          className="w-full bg-black border border-white/10 p-4 rounded-xl font-mono text-xs sm:text-sm placeholder:text-gray-800 text-[#E1E0CC] focus:outline-none focus:border-[#DEDBC8]"
                        />
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Wizard Navigation Controls */}
                <div className="pt-6 border-t border-white/5 flex justify-between items-center gap-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-[#161616] text-[#E1E0CC] hover:bg-neutral-800 border border-white/5 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={step === 1 && (!name || !email)}
                      className="bg-[#DEDBC8] text-black disabled:opacity-40 disabled:pointer-events-none hover:bg-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!message}
                      className="bg-[#DEDBC8] text-black disabled:opacity-40 disabled:pointer-events-none hover:bg-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Transmit Uplink</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>
        </section>
      </div>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
}
