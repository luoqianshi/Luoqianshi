import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Awards from './pages/Awards'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/awards" element={<Awards />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
