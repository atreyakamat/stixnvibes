import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StickerFloatScene from '../components/StickerFloatScene'
import { Marquee } from '../components/MarqueeComponent'
import { getTrendingProducts, getFeaturedCollections } from '../data/dataUtils'

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
)

// Star rating component
const StarRating = ({ rating, size = "20px" }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className={i < rating ? "text-[#111618]" : "text-[#bac9ce]"} 
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

// Custom button component
const Button = ({ children, color = "blue", className = "", ...props }) => {
  const colorClasses = {
    blue: "bg-[#42c4ef] text-[#111618] hover:bg-[#2bb4e3]",
    gray: "bg-[#f0f3f4] text-[#111618] hover:bg-[#e0e3e4]",
    red: "bg-[#e92932] text-white hover:bg-[#d91922]",
    white: "bg-white text-[#111618] border border-[#e0e3e4] hover:bg-[#f8f8f8]",
  };

  return (
    <button
      className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const ProductCard = ({ product }) => (
  <motion.div 
    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#f3e7e8] group"
    whileHover={{ y: -5 }}
  >
    <div className="aspect-square relative overflow-hidden bg-[#fcf8f8]">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-2 right-2">
        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-[#e92932] shadow-sm uppercase tracking-wider">
          {product.type}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-[#1b0e0f] text-sm mb-1 truncate">{product.title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[#e92932] font-black text-base">₹{product.price}</span>
        <Link to="/shop">
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#e92932] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
)

function LandingPage() {
  const trendingProducts = getTrendingProducts(8);
  const featuredCollections = getFeaturedCollections().slice(0, 3);
  
  const testimonials = [
    { id: 1, name: "Alex J.", text: "These stickers went through rain, coffee spills, and still slayed. Stuck on my laptop like trauma — forever.", rating: 5 },
    { id: 2, name: "Morgan S.", text: "Ordered a custom polaroid set and literally screamed. Colors? Perfect. Quality? Chef's kiss. Me? Obsessed.", rating: 5 },
    { id: 3, name: "Jamie L.", text: "Slapped them on my hydro flask and it instantly had a personality. The quality is wild.", rating: 5 },
    { id: 4, name: "Casey R.", text: "Waterproof stickers that actually work? Revolutionary. My laptop survived a whole semester.", rating: 5 },
    { id: 5, name: "Taylor M.", text: "Die-cut precision is insane. Every detail came out perfect on my custom design.", rating: 5 },
    { id: 6, name: "Jordan K.", text: "Bulk order for my small business was seamless. Quality stayed consistent across all 100 stickers.", rating: 5 }
  ];

  return (
    <div className="min-h-screen w-full bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <Header />
      
      <main className="mx-auto w-full">
        {/* Hero Section */}
        <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 z-0">
            <StickerFloatScene />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-6xl md:text-8xl font-black text-[#1b0e0f] mb-6 tracking-tight pointer-events-auto">
                STICKERS THAT <br />
                <span className="bg-gradient-to-r from-[#e92932] via-[#ff6b9d] to-[#42c4ef] bg-clip-text text-transparent">ACTUALLY SLAP</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed pointer-events-auto">
                Premium custom stickers for your laptop, journal, or chaos. Waterproof, non-tearable, and 100% aesthetic.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pointer-events-auto">
                <Link to="/shop">
                  <Button color="red" className="h-14 px-10 text-lg rounded-2xl shadow-lg shadow-red-200">Shop Now</Button>
                </Link>
                <Link to="/custom">
                  <Button color="blue" className="h-14 px-10 text-lg rounded-2xl shadow-lg shadow-blue-100">Make Your Own</Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll Down</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-gray-400 to-transparent"></div>
          </motion.div>
        </section>

        {/* USPs Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="size-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto text-4xl">💧</div>
                <h3 className="text-xl font-bold">Unbreakable Quality</h3>
                <p className="text-gray-500">Waterproof, scratch-resistant, and non-tearable. Built to survive your life.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="size-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto text-4xl">🎨</div>
                <h3 className="text-xl font-bold">Custom Everything</h3>
                <p className="text-gray-500">From Polaroid memories to brand logos. We bring your vision to life.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="size-20 bg-pink-50 rounded-3xl flex items-center justify-center mx-auto text-4xl">✨</div>
                <h3 className="text-xl font-bold">Artist Collabs</h3>
                <p className="text-gray-500">Unique drops from indie artists around the world. Exclusively here.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-24 bg-[#fcf8f8]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-[#e92932] font-black uppercase tracking-widest text-xs">Best Sellers</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#1b0e0f] mt-2">TRENDING NOW</h2>
              </div>
              <Link to="/shop">
                <Button color="white" className="rounded-xl border-2">View All Stickers</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#1b0e0f]">FEATURED PACKS</h2>
              <p className="text-gray-500 mt-4 text-lg">Curated sets at discounted prices. More vibes, less price.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <motion.div 
                  key={collection.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-100"
                >
                  <img 
                    src={collection.image} 
                    alt={collection.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <span className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-2">
                      {collection.isLimited ? 'Limited Edition' : 'New Collection'}
                    </span>
                    <h3 className="text-2xl font-black text-white mb-2">{collection.title}</h3>
                    <p className="text-white/80 text-sm mb-6 line-clamp-2">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-black text-xl">₹{collection.price}</span>
                      <Link to="/collections">
                        <Button color="white" className="h-10 px-6 rounded-xl text-xs">View Collection</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-[#42c4ef] rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-black text-[#1b0e0f] mb-6">WANT IT <br />UNIQUE?</h2>
                  <p className="text-lg text-[#1b0e0f]/70 mb-10 max-w-lg">
                    Turn your art, your cat, or your brand into high-quality stickers. No minimum orders, maximum quality.
                  </p>
                  <Link to="/custom">
                    <Button color="red" className="h-14 px-10 text-lg rounded-2xl shadow-xl">Start Designing</Button>
                  </Link>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white p-2 rounded-2xl shadow-xl rotate-[-6deg]"
                  >
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&auto=format&fit=crop" alt="Custom sample" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white p-2 rounded-2xl shadow-xl rotate-[12deg] mt-8"
                  >
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" alt="Custom sample" className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 text-center mb-16">
            <span className="text-[#e92932] font-black uppercase tracking-widest text-xs">Vibe Tribe</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1b0e0f] mt-2">LOVE FROM THE STREETS</h2>
          </div>
          
          <Marquee pauseOnHover className="[--duration:40s]">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="mx-4 bg-[#fcf8f8] p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 min-w-[350px] max-w-[450px]"
              >
                <div className="flex items-center mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-[#1b0e0f] text-lg mb-6 font-medium leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-[#e92932] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="font-bold text-[#1b0e0f]">— {testimonial.name}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-[#1b0e0f] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black mb-4">DON'T MISS <br />THE DROP</h2>
                <p className="text-gray-400 text-lg">New collections, artist collabs, and secret discounts straight to your inbox.</p>
              </div>
              <div className="md:w-1/2 w-full">
                <form className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#e92932] transition-all"
                  />
                  <Button color="red" className="h-14 px-10 text-lg rounded-2xl whitespace-nowrap">Join Now</Button>
                </form>
                <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-widest text-center md:text-left">No spam. Just vibes. unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default LandingPage
