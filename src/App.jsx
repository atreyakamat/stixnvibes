import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

// Shared Components
import { Header } from './components/Header'

// Pages
import LandingPage from './pages/LandingPage'
import OurStory from './pages/OurStory'
import StickerPacks from './pages/StickerPacks'
import CustomOrders from './pages/CustomOrders'
import ForBrands from './pages/ForBrands'
import Inquiries from './pages/Inquiries'
import NotFound from './pages/NotFound'

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
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/packs" element={<StickerPacks />} />
        <Route path="/custom" element={<CustomOrders />} />
        <Route path="/brands" element={<ForBrands />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
