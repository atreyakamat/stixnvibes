import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/custom', label: 'Custom' },
    { to: '/contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b-[4px] border-black px-4 sm:px-10 py-4 bg-white sticky top-0 z-40 selection:bg-[#FFDE03]">
        <div className="flex items-center gap-4 text-black">
          <Link to="/" className="flex items-center gap-4 group" onClick={closeMobileMenu}>
            <div className="size-8 border-[3px] border-black bg-[#FFDE03] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path
                  d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-black text-2xl font-black leading-tight tracking-tighter uppercase italic">Stix N Vibes</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-black text-sm font-black uppercase tracking-widest ${
                  location.pathname === link.to 
                    ? 'bg-[#FFDE03] border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                    : 'hover:text-[#ff4d4d] transition-colors'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  const cartEvent = new CustomEvent('toggleCart');
                  window.dispatchEvent(cartEvent);
                }}
                className="flex cursor-pointer items-center justify-center border-[3px] border-black h-12 px-6 bg-[#ff4d4d] text-white text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all relative"
              >
                <div className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l48.89,178A16,16,0,0,0,98.68,224H208a8,8,0,0,0,0-16H98.68L94.68,192h118.6a16,16,0,0,0,15.74-12.95l14.28-64A8,8,0,0,0,222.14,58.87ZM213.17,176H91.17L57.05,72H206.41Z"></path>
                    <circle cx="104" cy="232" r="8"></circle>
                    <circle cx="200" cy="232" r="8"></circle>
                  </svg>
                </div>
                Cart
                {itemCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#FFDE03] text-black border-2 border-black text-xs h-7 w-7 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="flex lg:hidden items-center gap-4">
          <button 
            onClick={() => {
              const cartEvent = new CustomEvent('toggleCart');
              window.dispatchEvent(cartEvent);
            }}
            className="flex cursor-pointer items-center justify-center border-[3px] border-black h-12 w-12 bg-[#ff4d4d] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l48.89,178A16,16,0,0,0,98.68,224H208a8,8,0,0,0,0-16H98.68L94.68,192h118.6a16,16,0,0,0,15.74-12.95l14.28-64A8,8,0,0,0,222.14,58.87ZM213.17,176H91.17L57.05,72H206.41Z"></path>
              <circle cx="104" cy="232" r="8"></circle>
              <circle cx="200" cy="232" r="8"></circle>
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FFDE03] text-black border-2 border-black text-[10px] h-6 w-6 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-12 h-12 border-[3px] border-black bg-[#42c4ef] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span className={`w-6 h-1 bg-black block transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-1 bg-black block my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-1 bg-black block transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white border-l-[6px] border-black z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-12 pb-6 border-b-[4px] border-black">
                  <h3 className="text-3xl font-black text-black uppercase italic tracking-tighter">Menu</h3>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 border-[3px] border-black bg-[#ff4d4d] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={closeMobileMenu}
                        className={`block px-6 py-4 border-[3px] border-black text-xl font-black uppercase italic tracking-widest transition-all ${
                          location.pathname === link.to 
                            ? 'bg-[#FFDE03] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                            : 'bg-white hover:bg-[#f0f0f0] hover:translate-x-1'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-12 pt-8 border-t-[4px] border-black">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <p className="text-lg font-black text-black uppercase italic mb-6">Made in Goa 🌴</p>
                    <div className="flex justify-center space-x-6">
                      <div className="w-6 h-6 bg-[#ff4d4d] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></div>
                      <div className="w-6 h-6 bg-[#FFDE03] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></div>
                      <div className="w-6 h-6 bg-[#42c4ef] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
