import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="MovieExplorer home">
          <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 3.5v17l15-8.5-15-8.5z" fill="currentColor" />
          </svg>
          <span className="brand-name">MovieExplorer</span>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Movies
          </NavLink>
          <Link to="/movies" className="btn btn-primary nav-cta">
            Browse catalog
          </Link>
        </nav>
      </div>
    </header>
  )
}