import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import './App.css'

// Shared Components
import { Header } from './components/Header'

// Lazy load pages for peak performance code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const OurStory = lazy(() => import('./pages/OurStory'));
const StickerPacks = lazy(() => import('./pages/StickerPacks'));
const CustomOrders = lazy(() => import('./pages/CustomOrders'));
const ForBrands = lazy(() => import('./pages/ForBrands'));
const Inquiries = lazy(() => import('./pages/Inquiries'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Premium, brand-aligned transition loader
function Loader() {
  return (
    <div className="min-h-screen bg-black text-[#E1E0CC] flex items-center justify-center font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase select-none">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#DEDBC8]/5 rounded-full border border-[#DEDBC8]/10 animate-ping" />
          <span className="text-[#DEDBC8] text-xl animate-pulse">✦</span>
        </div>
        <span className="animate-pulse text-[#DEDBC8]/60">PREPPING_THE_VIBE...</span>
      </div>
    </div>
  );
}

// Auto Scroll Reset Component on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Floating global navigation navbar */}
      <Header />
      
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/packs" element={<StickerPacks />} />
          <Route path="/custom" element={<CustomOrders />} />
          <Route path="/brands" element={<ForBrands />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
