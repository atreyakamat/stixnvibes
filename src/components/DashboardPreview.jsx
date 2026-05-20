import React from 'react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl">
      {/* Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 border-r border-white/5 bg-white/[0.02] flex flex-col items-center py-8 gap-8">
        <div className="size-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
        </div>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors cursor-pointer">
            <div className="w-5 h-5 rounded bg-current" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="pl-16 md:pl-20 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h3 className="text-2xl font-black text-white italic tracking-tight uppercase">Stix Dashboard <span className="text-xs font-mono bg-green-500/20 text-green-400 px-2 py-0.5 rounded ml-2 uppercase not-italic tracking-normal">v2.0.4</span></h3>
            <p className="text-white/40 text-sm font-bold">Manage your physical expression infrastructure.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/80 text-xs font-black uppercase tracking-widest">Analytics</div>
            <div className="px-4 py-2 bg-purple-600/40 border border-purple-500/40 rounded-lg text-white text-xs font-black uppercase tracking-widest">New Order</div>
          </div>
        </div>

        {/* Grid of "Stickers" as SaaS Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Cyber Ghost", status: "Active", type: "Holographic", icon: "👻" },
            { name: "Neon Heart", status: "In Production", type: "Matte", icon: "💖" },
            { name: "Retro Vibe", status: "Shipped", type: "Glitter", icon: "🌈" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-4xl group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                <div className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                  item.status === 'Active' ? 'bg-blue-500/20 text-blue-400' : 
                  item.status === 'Shipped' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {item.status}
                </div>
              </div>
              <h4 className="text-lg font-black text-white uppercase italic mb-1">{item.name}</h4>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">{item.type} finish</p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-time feed placeholder */}
        <div className="mt-12 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-white/30 space-y-1">
          <div>[SYSTEM] INITIALIZING VIBE_ENGINE_CORE...</div>
          <div>[INFO] CONNECTED TO GLOBAL_STICKER_NETWORK</div>
          <div>[AUTH] USER_VIBE_TOKEN VERIFIED</div>
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-3 bg-purple-500 inline-block align-middle ml-1"
          />
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default DashboardPreview;
