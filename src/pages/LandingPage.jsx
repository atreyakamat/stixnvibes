import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Marquee } from '../components/MarqueeComponent'

// Refraction/Glass constants
const GLASS_PANEL = "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
const GLASS_CARD = "bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_4px_24px_0_rgba(0,0,0,0.1)]"

// Star rating component (Glass style)
const StarRating = ({ rating, size = "20px" }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className={i < rating ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "text-white/30"} 
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            fill="currentColor" 
            viewBox="0 0 256 256"
          >
            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

// Custom glass button
const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      {children}
    </button>
  )
}

function LandingPage() {
  const testimonials = [
    { id: 1, name: "Alex J.", text: "These stickers went through rain, coffee spills, and still slayed. Stuck on my laptop like trauma — forever.", rating: 5 },
    { id: 2, name: "Morgan S.", text: "Ordered a custom polaroid set and literally screamed. Colors? Perfect. Quality? Chef's kiss. Me? Obsessed.", rating: 5 },
    { id: 3, name: "Jamie L.", text: "Slapped them on my hydro flask and it instantly had a personality. The quality is wild.", rating: 5 },
    { id: 4, name: "Casey R.", text: "Waterproof stickers that actually work? Revolutionary. My laptop survived a whole semester.", rating: 5 },
    { id: 5, name: "Taylor M.", text: "Die-cut precision is insane. Every detail came out perfect on my custom design.", rating: 5 },
    { id: 6, name: "Jordan K.", text: "Bulk order for my small business was seamless. Quality stayed consistent across all 100 stickers.", rating: 5 }
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-purple-500 selection:text-white relative" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      
      {/* Abstract Background Refraction Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] bg-pink-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="mx-auto w-full">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] w-full flex items-center justify-center py-20 px-4">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className={`max-w-5xl mx-auto text-center p-12 md:p-20 rounded-[3rem] ${GLASS_PANEL}`}
            >
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full mb-8 font-bold text-sm uppercase tracking-widest">
                Warning: High Vibes Only
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 mb-8 tracking-tighter leading-tight uppercase drop-shadow-lg">
                Stickers <br />
                That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                  Actually Slap
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-white/80 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
                Premium custom stickers for your laptop, journal, or chaos. Waterproof, non-tearable, and 100% aesthetic.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link to="/custom">
                  <Button className="h-16 px-10 text-xl bg-gradient-to-r from-pink-500/50 to-purple-500/50">Start Designing</Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1 bg-white/5 backdrop-blur-sm">
                <motion.div 
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              </div>
            </div>
          </section>

          {/* USPs Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-3xl ${GLASS_CARD} text-center space-y-6`}
                >
                  <div className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">💧</div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">Unbreakable</h3>
                  <p className="text-white/70 font-medium text-lg leading-relaxed">Waterproof, scratch-resistant, and non-tearable. Built to survive your life.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-3xl ${GLASS_CARD} text-center space-y-6`}
                >
                  <div className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">🎨</div>
                  <h3 className="text-2xl font-bold uppercase tracking-wide">Custom AF</h3>
                  <p className="text-white/70 font-medium text-lg leading-relaxed">From Polaroid memories to brand logos. We bring your vision to life.</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Custom CTA Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className={`p-8 md:p-20 relative overflow-hidden rounded-[3rem] ${GLASS_PANEL}`}>
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] uppercase tracking-tighter drop-shadow-lg">
                      WANT IT <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">UNIQUE?</span>
                    </h2>
                    <p className="text-xl text-white/80 font-medium mb-12 max-w-lg leading-relaxed">
                      Turn your art, your cat, or your brand into high-quality stickers. No minimum orders, maximum quality.
                    </p>
                    <Link to="/custom">
                      <Button className="h-16 px-10 text-xl bg-gradient-to-r from-pink-500/50 to-purple-500/50">Start Designing</Button>
                    </Link>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-2 gap-6 p-4">
                    <motion.div 
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className={`p-4 rounded-3xl ${GLASS_CARD} rotate-[-6deg]`}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                        <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&auto=format&fit=crop" alt="Custom sample" className="w-full h-full object-cover mix-blend-overlay" />
                      </div>
                    </motion.div>
                    <motion.div 
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className={`p-4 rounded-3xl ${GLASS_CARD} rotate-[12deg] mt-12`}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden bg-white/5">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" alt="Custom sample" className="w-full h-full object-cover mix-blend-overlay" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-20">
              <div className={`inline-block px-8 py-4 rounded-3xl ${GLASS_PANEL}`}>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-md">LOVE FROM THE STREETS</h2>
              </div>
            </div>
            
            <Marquee pauseOnHover className="[--duration:40s]">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`mx-4 p-8 rounded-3xl ${GLASS_CARD} min-w-[350px] max-w-[450px] flex flex-col justify-between my-4 backdrop-blur-md`}
                >
                  <div>
                    <div className="flex items-center mb-6">
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-white/90 text-xl font-medium leading-relaxed mb-8">"{testimonial.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="size-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {testimonial.name.charAt(0)}
                    </div>
                    <p className="font-bold text-lg text-white/80">— {testimonial.name}</p>
                  </div>
                </div>
              ))}
            </Marquee>
          </section>

          {/* Newsletter */}
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className={`max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 p-12 md:p-20 rounded-[3rem] ${GLASS_PANEL}`}>
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    DON'T MISS <br />THE DROP
                  </h2>
                  <p className="text-white/70 text-xl font-medium">New collections, artist collabs, and secret discounts straight to your inbox.</p>
                </div>
                <div className="lg:w-1/2 w-full">
                  <form className="flex flex-col gap-6">
                    <input 
                      type="email" 
                      placeholder="YOUR EMAIL HERE" 
                      className="w-full px-8 py-5 rounded-2xl bg-white/5 border border-white/20 text-white font-medium text-lg focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all placeholder:text-white/30 backdrop-blur-sm"
                    />
                    <Button className="h-16 text-xl bg-gradient-to-r from-blue-500/50 to-purple-500/50">Join The Squad</Button>
                  </form>
                  <p className="text-xs text-white/40 mt-6 uppercase tracking-widest text-center lg:text-left font-bold">No spam. Just vibes. unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage
