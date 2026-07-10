import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Tools', path: '/tools' },
  { label: 'Blog', path: '/blog' },
]

const sectionAnchors = [
  { label: 'About', id: 'profile' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Awards', id: 'awards' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
      window.scrollTo({ top: 0 })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper-bg/80 backdrop-blur-md border-b border-paper-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault()
            goHome()
          }}
          className="font-serif font-bold text-lg text-paper-text hover:text-paper-link transition-colors"
        >
          Qianshi Luo
        </Link>

        <div className="flex items-center gap-6">
          {isHome &&
            sectionAnchors.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-paper-muted hover:text-paper-text transition-colors"
              >
                {item.label}
              </button>
            ))}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-paper-muted hover:text-paper-text transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
