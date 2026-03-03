import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-3xl py-24 mt-0">
      <div className="container mx-auto px-6 flex flex-col gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 text-white">
                <Logo className="w-7 h-7" />
              </div>
              <span className="text-4xl font-black text-white uppercase italic tracking-tighter group-hover:tracking-normal transition-all duration-500">Stix N Vibes</span>
            </Link>
            <p className="text-white/50 font-bold text-xl max-w-sm italic leading-relaxed tracking-tight">
              Premium custom stickers for creatives, journalers, and stationery enthusiasts.
            </p>
            <div className="flex gap-6 mt-10">
              {[
                { name: 'Instagram', url: 'https://instagram.com/stixnvibes', icon: <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/> },
                { name: 'Twitter', url: '#', icon: <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"/> },
                { name: 'Facebook', url: '#', icon: <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/> }
              ].map(social => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center shadow-2xl hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-500"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-white/70">{social.icon}</svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-white mb-10 uppercase italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Quick Links</h3>
            <ul className="space-y-6">
              {['Contact'].map(item => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-white/40 font-black uppercase italic tracking-[0.2em] hover:text-white hover:translate-x-3 inline-block transition-all duration-500"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-white mb-10 uppercase italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Newsletter</h3>
            <form className="flex flex-col gap-6">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="px-8 py-5 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-black italic focus:outline-none focus:border-purple-500 transition-all duration-500 placeholder:text-white/20"
              />
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 text-white border border-white/10 py-5 px-8 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-500 shadow-2xl"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-16 text-center text-white/20 font-black uppercase italic tracking-[0.5em] text-xs">
          &copy; {new Date().getFullYear()} Stix N Vibes. Built for the streets.
        </div>
      </div>
    </footer>
  )
}

export default Footer
