import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Minus, Trash2, X, Sparkles, Check, ChevronRight } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'

export default function StickerPacks() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Curated Sticker Packs catalog
  const stickerPacks = [
    {
      id: "cyberpunk-core",
      name: "Cyberpunk Core",
      tagline: "High-contrast dystopian hardware accents",
      price: 18.00,
      stickersCount: 12,
      finish: "Matte + Holographic Highlights",
      icon: "⚡",
      color: "from-purple-500/20 via-pink-500/10 to-transparent",
      stickers: ["neon_grid", "hacker_skull", "error_404", "terminal_command", "cyber_eye", "glitched_pulse"]
    },
    {
      id: "cafe-chill",
      name: "Café Chill & Lo-Fi",
      tagline: "Warm, cozy aesthetics for silent workflows",
      price: 15.00,
      stickersCount: 10,
      finish: "Soft Matte Finish",
      icon: "☕",
      color: "from-amber-600/20 via-yellow-700/5 to-transparent",
      stickers: ["lofi_cat", "steaming_mug", "vinyl_turntable", "chill_cloud", "cassette_tape", "greenhouse_leaf"]
    },
    {
      id: "holo-glitch",
      name: "Holographic Glitch",
      tagline: "Ultra-reflective prismatic anomalies",
      price: 22.00,
      stickersCount: 8,
      finish: "Full Metallic Holographic",
      icon: "✨",
      color: "from-blue-500/20 via-emerald-500/10 to-transparent",
      stickers: ["rainbow_prism", "ghost_anomaly", "liquid_chrome", "static_noise", "pixel_heart", "retro_spark"]
    },
    {
      id: "startup-fuel",
      name: "Startup Fuel & Memes",
      tagline: "Office comedy and engineering subversions",
      price: 16.50,
      stickersCount: 15,
      finish: "Glossy Protective Shield",
      icon: "🚀",
      color: "from-red-500/20 via-orange-500/10 to-transparent",
      stickers: ["works_on_my_machine", "git_merge_panic", "rocket_ship", "coffee_coder", "rubber_duck", "bug_feature"]
    }
  ];

  // Helper to add item to cart
  const addToCart = (pack) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === pack.id);
      if (existing) {
        return prevCart.map((item) => 
          item.id === pack.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...pack, qty: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutComplete(false);
  };

  // Helper to update quantity
  const updateQty = (id, delta) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  // Helper to remove item
  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const shipping = cartSubtotal > 35 ? 0 : 4.99;
  const total = cartSubtotal + shipping;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setCart([]);
  };

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative">
      {/* Background utilities */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#DEDBC8]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-6">
          The Sticker Store
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Premium sticker packs, ", className: "text-[#E1E0CC] font-normal" },
            { text: "crafted for creative minds. ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "Collect and deploy.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.0] max-w-5xl mx-auto mb-6"
        />

        <p className="text-primary/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Unlock tactile visual relics printed on heavy-grade waterproof vinyl. Bundle up, stick anywhere, and let your environment carry your frequency.
        </p>

        {/* COMING SOON BANNER */}
        <div className="max-w-xl mx-auto mt-10 bg-[#101010] border border-primary/20 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#DEDBC8]/40 to-transparent" />
          <div className="text-primary font-mono text-[9px] tracking-[0.25em] uppercase block animate-pulse font-bold">SYSTEM ANNOUNCEMENT</div>
          <h3 className="text-white font-bold text-lg">Store is coming soon & will launch shortly</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            The Stix and Vibes vault is getting stocked with creative assets. Our shopping cart systems will be launched shortly. In the meantime, custom creations can be configured or ordered directly via WhatsApp or Instagram!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2 text-[11px] font-mono text-gray-500">
            <span>INSTA: <a href="https://instagram.com/stixnvibes" target="_blank" rel="noopener noreferrer" className="text-[#E1E0CC] hover:underline font-bold">@stixnvibes</a></span>
            <span>•</span>
            <span>WHATSAPP: <a href="https://wa.me/917744020601" className="text-[#E1E0CC] hover:underline font-bold">+91 77440 20601</a></span>
            <span>•</span>
            <span>EMAIL: <a href="mailto:hello@stixnvibes.com" className="text-[#E1E0CC] hover:underline font-bold">hello@stixnvibes.com</a></span>
          </div>
        </div>

        {/* Floating Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#DEDBC8] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(222,219,200,0.3)] hover:scale-110 active:scale-95 transition-transform border border-black"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-full border border-black">
                {cartItemCount}
              </span>
            )}
          </div>
        </button>
      </section>

      {/* Store Showcase Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {stickerPacks.map((pack) => (
          <div 
            key={pack.id} 
            className="bg-[#101010] border border-white/5 hover:border-white/10 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
          >
            {/* Holographic Glowing card background */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${pack.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

            {/* Sticker Peel corner styling */}
            <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#212121] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500" />
            </div>

            <div>
              {/* Header block */}
              <div className="flex justify-between items-start mb-6">
                <div className="size-12 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center text-2xl relative shadow-lg">
                  {pack.icon}
                  {pack.id === "holo-glitch" && (
                    <Sparkles className="absolute -top-1 -right-1 text-primary w-3 h-3 animate-pulse" />
                  )}
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs uppercase tracking-widest block font-mono">Pack Config</span>
                  <span className="text-gray-400 text-xs block">{pack.stickersCount} heavy vinyl cutouts</span>
                </div>
              </div>

              {/* Title & info */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight text-[#E1E0CC]">{pack.name}</h3>
              <p className="text-primary/70 text-xs sm:text-sm font-light mb-6">{pack.tagline}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-xs text-gray-400 font-mono mb-8">
                <div>
                  <span className="text-gray-600 block mb-0.5">FINISH</span>
                  <span className="text-gray-300 font-sans font-semibold">{pack.finish}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-0.5">RESISTANCE</span>
                  <span className="text-gray-300 font-sans font-semibold">100% Waterproof / UV</span>
                </div>
              </div>

              {/* Collage tags layout representation */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pack.stickers.map((st) => (
                  <span key={st} className="text-[10px] bg-[#161616] border border-white/5 text-gray-500 px-2.5 py-1 rounded-full font-mono">
                    #{st}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="flex justify-between items-center mt-auto pt-4 relative z-20">
              <div>
                <span className="text-gray-600 text-[10px] uppercase font-mono tracking-widest block">PRICE</span>
                <span className="text-white font-bold text-2xl">${pack.price.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => addToCart(pack)}
                className="bg-[#161616] text-[#E1E0CC] hover:bg-[#DEDBC8] hover:text-black border border-white/10 hover:border-[#DEDBC8] text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 group transition-all duration-300"
              >
                <span>Add to Cart</span>
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Sliding Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0c0c0c] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              
              {/* Drawer Header */}
              <div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-primary w-5 h-5" />
                    <h3 className="text-lg font-bold uppercase tracking-widest">Your Vault</h3>
                    <span className="text-gray-600 text-xs">({cartItemCount} packs)</span>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 hover:bg-[#161616] rounded-full text-gray-500 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Success feedback */}
                {checkoutComplete && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#101010] border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-start gap-3 mb-6"
                  >
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Order transmitted!</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Your physical artifacts are being prepped. Check your coordinates (email) soon.</p>
                    </div>
                  </motion.div>
                )}

                {/* Cart list items */}
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-gray-500">
                    <span className="text-4xl block mb-4">📭</span>
                    <p className="text-sm">Your vault is empty.</p>
                    <p className="text-xs text-gray-600 mt-1">Deploy some packs into your setup!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-[#101010] border border-white/5 p-4 rounded-xl flex justify-between gap-4"
                      >
                        <div className="flex gap-3">
                          <div className="size-10 bg-neutral-900 border border-white/10 rounded flex items-center justify-center text-xl shrink-0 select-none">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#E1E0CC]">{item.name}</h4>
                            <span className="text-[10px] text-gray-600 block uppercase font-mono">{item.finish}</span>
                            <span className="text-xs text-white font-semibold block mt-1">${item.price.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col justify-between items-end">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="flex items-center bg-black border border-white/5 rounded-full px-2 py-0.5 mt-2 gap-2 text-xs">
                            <button onClick={() => updateQty(item.id, -1)} className="text-gray-500 hover:text-white p-0.5">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-white min-w-[12px] text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="text-gray-500 hover:text-white p-0.5">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer Calculations */}
              {cart.length > 0 && (
                <div className="border-t border-white/5 pt-6 mt-6">
                  <div className="space-y-2 text-xs text-gray-400 font-mono mb-6">
                    <div className="flex justify-between">
                      <span>SUBTOTAL</span>
                      <span className="text-[#E1E0CC]">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SHIPPING</span>
                      <span className="text-[#E1E0CC]">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[9px] text-gray-600 text-right">Add ${(35 - cartSubtotal).toFixed(2)} more for FREE shipping</p>
                    )}
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/5">
                      <span className="text-white">TOTAL</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#DEDBC8] text-black font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white active:scale-98 transition-all duration-300"
                  >
                    <span>Deploy Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
