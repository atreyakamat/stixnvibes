import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { items, getItemCount, getTotalPrice, updateQuantity, removeItem, generateWhatsAppMessage, clearCart } = useCart()

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  useEffect(() => {
    const handleToggleCart = () => {
      setIsOpen(prev => !prev)
    }

    window.addEventListener('toggleCart', handleToggleCart)
    return () => window.removeEventListener('toggleCart', handleToggleCart)
  }, [])

  if (itemCount === 0 && !isOpen) return null

  return (
    <>
      {/* Floating Cart Button */}
      <AnimatePresence>
        {itemCount > 0 && !isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#ff4d4d] text-white border-[4px] border-black w-20 h-20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16H40.85L69.42,147.57A24,24,0,0,0,92.27,168H200a8,8,0,0,0,0-16H92.27a8,8,0,0,1-7.87-6.57L81.44,128H204.16a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM96,216a16,16,0,1,1-16-16A16,16,0,0,1,96,216Zm128,0a16,16,0,1,1-16-16A16,16,0,0,1,224,216Z"/>
              </svg>
              <span className="text-[10px] font-black uppercase mt-1">Cart</span>
              <span className="absolute -top-3 -right-3 bg-[#FFDE03] text-black border-[3px] border-black text-xs font-black h-8 w-8 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {itemCount}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#f0f0f0] z-50 border-l-[6px] border-black shadow-[-20px_0px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-8 border-b-[4px] border-black bg-white flex items-center justify-between">
                  <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter">YOUR CART</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 border-[3px] border-black bg-[#ff4d4d] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
                    </svg>
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {items.length === 0 ? (
                    <div className="text-center py-20 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] mx-4">
                      <div className="text-8xl mb-6">🏜️</div>
                      <p className="text-2xl font-black text-black uppercase italic">EMPTY AS A DESERT</p>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="mt-8 px-6 py-2 bg-[#FFDE03] border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        Let's Go Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <motion.div
                          key={`${item.id}-${item.material || 'default'}-${item.type || 'default'}`}
                          className="flex items-center gap-6 p-4 bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                          layout
                        >
                          <div className="w-20 h-20 border-[3px] border-black overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-black text-lg uppercase italic truncate leading-none mb-2">
                              {item.title}
                              {item.type === 'collection' && (
                                <span className="text-[10px] bg-black text-white px-2 py-0.5 ml-2 not-italic">PACK</span>
                              )}
                            </h3>
                            <div className="flex items-center gap-3">
                              <p className="bg-black text-[#FFDE03] px-2 py-0.5 font-black text-sm italic">₹{item.price}</p>
                              {item.material && item.type !== 'Collection' && (
                                <div className="flex items-center gap-1 border-2 border-black px-2 py-0.5 bg-white">
                                  <span className="text-xs font-black uppercase italic">
                                    {item.material}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center border-[3px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.type, item.material)}
                                className="w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-[#f0f0f0] border-r-[3px] border-black"
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-black text-lg">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.type, item.material)}
                                className="w-8 h-8 flex items-center justify-center font-black text-xl hover:bg-[#f0f0f0] border-l-[3px] border-black"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.type, item.material)}
                              className="text-xs font-black uppercase underline decoration-2 decoration-[#ff4d4d] hover:text-[#ff4d4d] transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="p-8 border-t-[4px] border-black bg-white">
                    <div className="flex justify-between items-center mb-8 bg-black p-4 rotate-1">
                      <span className="text-2xl font-black text-white uppercase italic tracking-tighter">SUBTOTAL:</span>
                      <span className="text-3xl font-black text-[#FFDE03] italic tracking-tighter">₹{totalPrice}</span>
                    </div>
                    
                    <div className="space-y-4">
                      <a
                        href={generateWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25d366] text-black border-[4px] border-black py-5 px-6 font-black uppercase italic text-xl flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                      >
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5L128,136a79.93,79.93,0,0,1-31.16-31.16l6.66-19.54a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,80.73,40a56.26,56.26,0,0,0-48.26,48.26c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,48.26-48.26A8,8,0,0,0,187.58,144.84Z"/>
                        </svg>
                        Checkout on WhatsApp
                      </a>
                      
                      <button
                        onClick={clearCart}
                        className="w-full bg-white text-black border-[3px] border-black py-3 px-6 font-black uppercase italic tracking-widest hover:bg-gray-100 transition-colors"
                      >
                        Dump Everything
                      </button>
                    </div>

                    <p className="text-center mt-6">
                      <span className="bg-[#42c4ef] text-black px-4 py-1 border-2 border-black font-black uppercase italic text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        Free delivery above ₹500
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default FloatingCart
