import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, HelpCircle, Laptop, Settings, Layers, DollarSign, CheckCircle } from 'lucide-react'
import { WordsPullUp } from '../components/WordsPullUp'
import { WordsPullUpMultiStyle } from '../components/WordsPullUpMultiStyle'

export default function CustomOrders() {
  const [stickerType, setStickerType] = useState("die-cut"); // die-cut, kiss-cut
  const [finish, setFinish] = useState("holographic"); // matte, glossy, holographic
  const [quantity, setQuantity] = useState(100);
  const [uploadedImage, setUploadedImage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Preloaded template graphics for previewing
  const preloadedTemplates = [
    {
      name: "Cyber skull",
      url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
    },
    {
      name: "Smile drop",
      url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
    },
    {
      name: "Cosmic orb",
      url: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
    }
  ];

  // Set default preview image
  const [selectedPreview, setSelectedPreview] = useState(preloadedTemplates[0].url);

  // Math calculations for live price config
  const getUnitPrice = () => {
    let base = 1.50; // default die-cut cost
    if (stickerType === "kiss-cut") base = 1.30;
    
    // Finish modifiers
    if (finish === "holographic") base += 0.40;
    if (finish === "glossy") base += 0.15;
    
    // Tiered bulk discount pricing
    if (quantity >= 1000) return base * 0.50; // 50% discount
    if (quantity >= 500) return base * 0.65; // 35% discount
    if (quantity >= 250) return base * 0.80; // 20% discount
    if (quantity >= 100) return base * 0.90; // 10% discount
    
    return base;
  };

  const unitPrice = getUnitPrice();
  const subtotal = unitPrice * quantity;
  const delivery = "FREE (express)";
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setSelectedPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen pt-28 pb-20 select-none relative">
      {/* Background utilities */}
      <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        <span className="text-primary text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-6">
          Custom configurator
        </span>
        
        <WordsPullUpMultiStyle
          segments={[
            { text: "Configure your custom stickers. ", className: "text-[#E1E0CC] font-normal" },
            { text: "Uploaded by you, ", className: "italic font-serif text-[#DEDBC8]" },
            { text: "cut by us.", className: "text-[#E1E0CC] font-normal" }
          ]}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.0] max-w-5xl mx-auto mb-6"
        />

        <p className="text-primary/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Upload your design, configure dimensions, specify finishes, and preview your custom sticker in a mock layout with instant volume-based pricing.
        </p>
      </section>

      {/* Configurator Workspace */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        
        {/* Left Side: Control Panel Form (7 cols) */}
        <form onSubmit={handleOrderSubmit} className="lg:col-span-7 bg-[#101010] border border-white/5 rounded-[2rem] p-6 sm:p-10 space-y-8 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
            <div className="absolute top-0 right-0 w-14 h-14 bg-[#212121] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10" />
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="size-20 bg-emerald-500/10 border border-emerald-500/20 text-[#DEDBC8] rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Configuration Locked</h3>
              <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your custom sticker order has been uploaded and registered. Our lab directors will perform a visual pre-flight check and ping your inbox.
              </p>
              <button 
                type="button"
                onClick={() => setIsSuccess(false)}
                className="bg-[#161616] text-[#E1E0CC] hover:bg-[#DEDBC8] hover:text-black border border-white/5 hover:border-black font-semibold text-xs sm:text-sm px-6 py-3 rounded-full uppercase tracking-wider transition-all duration-300"
              >
                Reset Configuration
              </button>
            </motion.div>
          ) : (
            <>
              {/* Step 1: Upload / Template picker */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono text-gray-500">
                  <Upload className="w-4 h-4 text-primary" />
                  <span>1. Choose or upload design</span>
                </div>
                
                {/* Upload Zone */}
                <div 
                  onClick={triggerFileSelect}
                  className="border border-dashed border-white/10 hover:border-[#DEDBC8]/50 bg-black/40 rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-colors duration-300 group/drop flex flex-col items-center justify-center gap-2"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden" 
                  />
                  <div className="size-12 rounded-full bg-[#161616] border border-white/10 flex items-center justify-center text-gray-500 group-hover/drop:text-[#E1E0CC] transition-colors duration-300">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm mt-2 text-[#E1E0CC]">Drag & Drop your graphic</h4>
                  <p className="text-gray-500 text-[10px] sm:text-xs">PNG, JPG or SVG formats (Transparent background preferred)</p>
                </div>

                {/* Preloaded Template Shortcut Row */}
                <div className="flex items-center gap-3 mt-4 bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 shrink-0">TEST TEMPLATE:</span>
                  <div className="flex gap-2">
                    {preloadedTemplates.map((tp) => (
                      <button
                        key={tp.name}
                        type="button"
                        onClick={() => {
                          setSelectedPreview(tp.url);
                          setUploadedImage("");
                        }}
                        className={`text-[10px] px-3 py-1.5 rounded-full border transition-all ${
                          selectedPreview === tp.url && !uploadedImage
                            ? 'bg-[#DEDBC8] text-black border-[#DEDBC8]' 
                            : 'bg-[#161616] text-gray-400 border-white/5 hover:border-white/10'
                        }`}
                      >
                        {tp.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Cut Type Selection */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono text-gray-500">
                    <Settings className="w-4 h-4 text-primary" />
                    <span>2. Select Cut Geometry</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setStickerType("die-cut")}
                    className={`rounded-2xl p-5 text-left border transition-all duration-300 relative ${
                      stickerType === "die-cut" 
                        ? 'bg-[#161616] border-[#DEDBC8]' 
                        : 'bg-black/20 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-[#E1E0CC]">Die-Cut Stickers</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-normal">Cut directly through the backing paper, matching the exact shape of your graphic.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStickerType("kiss-cut")}
                    className={`rounded-2xl p-5 text-left border transition-all duration-300 relative ${
                      stickerType === "kiss-cut" 
                        ? 'bg-[#161616] border-[#DEDBC8]' 
                        : 'bg-black/20 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-[#E1E0CC]">Kiss-Cut Stickers</h4>
                    <p className="text-gray-500 text-xs mt-1 leading-normal">Cut only through the vinyl layer, leaving a square protective backing sheet around it.</p>
                  </button>
                </div>
              </div>

              {/* Step 3: Finish options */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-mono text-gray-500">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>3. Choose Premium Finish</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {["matte", "glossy", "holographic"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFinish(f)}
                      className={`rounded-xl p-4 text-center border uppercase tracking-wider font-mono text-xs transition-all duration-300 ${
                        finish === f 
                          ? 'bg-[#DEDBC8] text-black border-[#DEDBC8] font-bold' 
                          : 'bg-black/20 border-white/5 hover:border-white/10 text-gray-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Quantities Slider */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-xs sm:text-sm uppercase tracking-widest font-mono text-gray-500">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>4. Quantity & Volume</span>
                  </div>
                  <span className="text-[#DEDBC8] font-sans font-bold text-base">{quantity} units</span>
                </div>

                <input 
                  type="range" 
                  min="50" 
                  max="2000" 
                  step="50" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full accent-[#DEDBC8] bg-neutral-800 h-1.5 rounded-full cursor-pointer"
                />

                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>MIN: 50</span>
                  <span>TIERS: 250 (20% off) / 500 (35% off) / 1000+ (50% off)</span>
                  <span>MAX: 2000</span>
                </div>
              </div>

              {/* Subtotal & Call-To-Action submission */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Subtotal</span>
                  <div className="flex items-baseline justify-center sm:justify-start gap-1">
                    <span className="text-[#E1E0CC] font-bold text-3xl">${subtotal.toFixed(2)}</span>
                    <span className="text-gray-500 text-xs font-mono">(${unitPrice.toFixed(2)} / unit)</span>
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#DEDBC8] text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-4 rounded-xl hover:bg-white transition-all duration-300"
                >
                  Lock Configuration
                </button>
              </div>
            </>
          )}

        </form>

        {/* Right Side: Visual Laptop Lid Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#101010] border border-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            
            {/* Holographic Glowing border */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-pink-500/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2 mb-6 text-gray-500 text-xs font-mono uppercase tracking-wider">
              <Laptop className="w-4 h-4 text-primary" />
              <span>Live hardware preview</span>
            </div>

            {/* Laptop Device mock */}
            <div className="relative w-full max-w-[320px] aspect-[16/10] bg-neutral-900 border-4 border-neutral-800 rounded-xl flex items-center justify-center shadow-2xl p-4 overflow-hidden">
              
              {/* Subtle grid pattern for texture */}
              <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

              {/* Glowing logo / custom sticker element */}
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateY: 10, rotateX: -10 }}
                className="relative cursor-grab z-10 shrink-0"
              >
                {/* Visual rendering representing Sticker backing boundary */}
                <div 
                  className={`w-36 h-36 rounded-full flex items-center justify-center relative ${
                    finish === "holographic" 
                      ? 'bg-gradient-to-r from-teal-400 via-pink-500 to-yellow-300 animate-gradient-x p-1 border-2 border-white' 
                      : finish === "glossy" 
                        ? 'bg-neutral-800 border-4 border-white shadow-xl'
                        : 'bg-neutral-800 border-4 border-white/80 border-dashed'
                  }`}
                  style={{
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Glowing shader overlay for holographic */}
                  {finish === "holographic" && (
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse rounded-full pointer-events-none" />
                  )}

                  {/* Main graphic */}
                  <img 
                    src={selectedPreview} 
                    alt="Custom Sticker Preview"
                    className={`w-full h-full object-contain rounded-full bg-neutral-900/60 p-2 ${
                      finish === "glossy" ? 'brightness-110 contrast-105' : ''
                    }`} 
                  />
                  
                  {/* Shine reflection bar across lid */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />
                </div>
              </motion.div>

              {/* Decorative brand marks on background */}
              <div className="absolute bottom-3 right-4 text-[8px] font-mono text-gray-700">STIX VIBES CORP.</div>
            </div>

            {/* Laptop Base Mock */}
            <div className="w-[340px] h-3 bg-neutral-800 border-b-2 border-neutral-700 rounded-b-lg shadow-xl" />

            {/* Display Stats Info */}
            <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/5 text-center text-xs font-mono text-gray-500">
              <div>
                <span className="block text-[10px] text-gray-600 uppercase">CUT</span>
                <span className="text-[#E1E0CC] font-bold block mt-0.5">{stickerType === "die-cut" ? "Die-Cut" : "Kiss-Cut"}</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-600 uppercase">FINISH</span>
                <span className="text-[#E1E0CC] font-bold block mt-0.5 capitalize">{finish}</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-600 uppercase">DELIVERY</span>
                <span className="text-[#E1E0CC] font-bold block mt-0.5">Express</span>
              </div>
            </div>

          </div>

          {/* Visual Contact Coordinates Block */}
          <div className="bg-[#101010] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none overflow-hidden z-20">
              <div className="absolute top-0 right-0 w-14 h-14 bg-[#212121] rotate-45 translate-x-7 -translate-y-7 shadow-[2px_2px_8px_rgba(0,0,0,0.5)] border-l border-b border-white/10" />
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>Or order manually</span>
            </div>

            <h3 className="text-white font-bold text-lg">Direct Booking Uplink</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Have an extremely specific request, unique materials in mind, or prefer booking manually? Reach out on our verified frequencies:
            </p>

            <div className="space-y-3">
              <a 
                href="https://wa.me/917744020601" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all group/coord"
              >
                <div className="size-8 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center font-bold text-emerald-400">
                  💬
                </div>
                <div>
                  <span className="text-[9px] text-gray-600 block uppercase font-mono">WHATSAPP</span>
                  <span className="text-white text-xs sm:text-sm font-semibold group-hover/coord:text-primary transition-colors">+91 77440 20601</span>
                </div>
              </a>

              <a 
                href="tel:+918668859020" 
                className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all group/coord"
              >
                <div className="size-8 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center font-bold text-blue-400">
                  📞
                </div>
                <div>
                  <span className="text-[9px] text-gray-600 block uppercase font-mono">PHONE UPLINK</span>
                  <span className="text-white text-xs sm:text-sm font-semibold group-hover/coord:text-primary transition-colors">+91 86688 59020</span>
                </div>
              </a>

              <a 
                href="https://instagram.com/stixnvibes" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all group/coord"
              >
                <div className="size-8 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center font-bold text-pink-400">
                  📸
                </div>
                <div>
                  <span className="text-[9px] text-gray-600 block uppercase font-mono">INSTAGRAM</span>
                  <span className="text-white text-xs sm:text-sm font-semibold group-hover/coord:text-primary transition-colors">@stixnvibes</span>
                </div>
              </a>

              <a 
                href="mailto:hello@stixnvibes.com" 
                className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl hover:border-[#DEDBC8]/30 hover:bg-[#161616] transition-all group/coord"
              >
                <div className="size-8 bg-neutral-900 border border-white/10 rounded-lg flex items-center justify-center font-bold text-amber-100">
                  ✉️
                </div>
                <div>
                  <span className="text-[9px] text-gray-600 block uppercase font-mono">EMAIL DIRECT</span>
                  <span className="text-white text-xs sm:text-sm font-semibold group-hover/coord:text-primary transition-colors">hello@stixnvibes.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
