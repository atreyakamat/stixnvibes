import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t-[6px] border-black bg-white py-16 mt-0">
      <div className="container mx-auto px-4 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="size-10 border-[3px] border-black bg-[#FFDE03] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                </svg>
              </div>
              <span className="text-3xl font-black text-black uppercase italic tracking-tighter">Stix N Vibes</span>
            </Link>
            <p className="text-black font-bold text-lg max-w-xs uppercase italic leading-tight">
              Premium custom stickers for creatives, journalers, and stationery enthusiasts.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { name: 'Instagram', icon: <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/> },
                { name: 'Twitter', icon: <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"/> },
                { name: 'Facebook', icon: <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/> }
              ].map(social => (
                <a 
                  key={social.name} 
                  href="#" 
                  className="size-12 border-[3px] border-black bg-white flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE03] transition-all"
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className="text-black">{social.icon}</svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-black mb-8 uppercase italic underline decoration-[4px] decoration-[#42c4ef] underline-offset-8">Quick Links</h3>
            <ul className="space-y-4">
              {['Custom', 'Contact'].map(item => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-black font-black uppercase italic tracking-wider hover:text-[#ff4d4d] hover:translate-x-2 inline-block transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-black mb-8 uppercase italic underline decoration-[4px] decoration-[#ff4d4d] underline-offset-8">Newsletter</h3>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="px-6 py-4 border-[3px] border-black bg-white text-black font-black focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,222,3,1)] transition-all placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-[#FFDE03] text-black border-[3px] border-black py-4 px-6 font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
        <div className="border-t-[4px] border-black pt-10 text-center text-black font-black uppercase italic tracking-widest text-sm">
          &copy; {new Date().getFullYear()} Stix N Vibes. Built for the streets.
        </div>
      </div>
    </footer>
  )
}

export default Footer
