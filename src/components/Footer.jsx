import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-about">
          <div className="footer-brand">
            <svg className="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3.5v17l15-8.5-15-8.5z" fill="currentColor" />
            </svg>
            <span>MovieExplorer</span>
          </div>
          <p>
            A small movie explorer built with React. Browse the catalog, search
            titles, and dig into show details.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">All movies</Link>
            </li>
            <li>
              <Link to="/movies">Search</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">About</h4>
          <ul className="footer-list">
            <li>
              <span className="footer-dot" aria-hidden="true" />
              Data by {' '}
              <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
                TVMaze
              </a>
            </li>
            <li>
              <span className="footer-dot" aria-hidden="true" />
              Built with <a href="https://react.dev" target="_blank" rel="noreferrer">React</a> &amp; Vite
            </li>
            <li>
              <span className="footer-dot" aria-hidden="true" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Project repository on GitHub"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 MovieExplorer. All rights reserved.</p>
        <p>Made for learning — not affiliated with TVMaze.</p>
      </div>
    </footer>
  )
}