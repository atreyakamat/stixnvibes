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
    { to: '/old-home', label: 'Old Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/collections', label: 'Collections' },
    { to: '/collabs', label: 'Collabs' },
    { to: '/about', label: 'About' },
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
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3e7e8] px-4 sm:px-10 py-3 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-4 text-[#1b0e0f]">
          <Link to="/" className="flex items-center gap-4" onClick={closeMobileMenu}>
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path
                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#1b0e0f] text-lg font-bold leading-tight tracking-[-0.015em]">Stix N Vibes</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[#1b0e0f] text-sm font-medium leading-normal ${
                  location.pathname === link.to ? 'text-[#e92932]' : 'hover:text-[#e92932]'
                } transition-colors`}
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
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] min-w-0 relative hover:bg-[#d61f27] transition-colors"
              >
                <div className="text-white" data-icon="ShoppingCart" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l48.89,178A16,16,0,0,0,98.68,224H208a8,8,0,0,0,0-16H98.68L94.68,192h118.6a16,16,0,0,0,15.74-12.95l14.28-64A8,8,0,0,0,222.14,58.87ZM213.17,176H91.17L57.05,72H206.41Z"></path>
                    <circle cx="104" cy="232" r="8"></circle>
                    <circle cx="200" cy="232" r="8"></circle>
                  </svg>
                </div>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff6b9d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Cart Button */}
          <button 
            onClick={() => {
              const cartEvent = new CustomEvent('toggleCart');
              window.dispatchEvent(cartEvent);
            }}
            className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 w-10 bg-[#e92932] text-white relative hover:bg-[#d61f27] transition-colors"
          >
            <div className="text-white" data-icon="ShoppingCart" data-size="18px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16H34.05l48.89,178A16,16,0,0,0,98.68,224H208a8,8,0,0,0,0-16H98.68L94.68,192h118.6a16,16,0,0,0,15.74-12.95l14.28-64A8,8,0,0,0,222.14,58.87ZM213.17,176H91.17L57.05,72H206.41Z"></path>
                <circle cx="104" cy="232" r="8"></circle>
                <circle cx="200" cy="232" r="8"></circle>
              </svg>
            </div>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff6b9d] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px]">
                {itemCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-[#e92932] to-[#ff6b9d] text-white hover:from-[#d61f27] hover:to-[#e5518a] transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-center items-center w-6 h-6"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-5 h-0.5 bg-white block transition-all duration-300 origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-5 h-0.5 bg-white block transition-all duration-300 my-1"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-5 h-0.5 bg-white block transition-all duration-300 origin-center"
              />
            </motion.div>
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-[#1b0e0f]">Menu</h3>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-4">
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
                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                          location.pathname === link.to 
                            ? 'bg-gradient-to-r from-[#e92932] to-[#ff6b9d] text-white shadow-lg' 
                            : 'text-[#1b0e0f] hover:bg-gray-100 hover:text-[#e92932]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <p className="text-sm text-gray-600 mb-4">Made with ❤️ in Goa</p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-2 h-2 bg-[#e92932] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#ff6b9d] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#42c4ef] rounded-full"></div>
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
