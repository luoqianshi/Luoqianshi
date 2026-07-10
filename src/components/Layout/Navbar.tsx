import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { label: '首页', path: '/', anchor: 'top' },
  { label: '工具站', path: '/tools', anchor: null },
  { label: '博文站', path: '/blog', anchor: null },
]

const sectionAnchors = [
  { label: '关于', id: 'profile' },
  { label: '作品', id: 'portfolio' },
  { label: '获奖', id: 'awards' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHomeNav = (anchor: string | null) => {
    if (!isHome) {
      window.location.href = anchor ? `/#${anchor}` : '/'
      return
    }
    if (anchor === 'top' || !anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
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
          onClick={() => handleHomeNav('top')}
          className="font-serif font-bold text-lg text-paper-text hover:text-paper-link transition-colors"
        >
          骆谦实
        </Link>

        <div className="flex items-center gap-6">
          {isHome &&
            sectionAnchors.map((item) => (
              <button
                key={item.id}
                onClick={() => handleHomeNav(item.id)}
                className="text-sm text-paper-muted hover:text-paper-text transition-colors"
              >
                {item.label}
              </button>
            ))}
          {navItems
            .filter((item) => item.label !== '首页')
            .map((item) => (
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
