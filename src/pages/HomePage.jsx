import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getShowCatalog } from '../api/tvmaze'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import SkeletonCard from '../components/SkeletonCard'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-hero">MovieExplorer</span>
          <h1 className="hero-title">
            Discover<br />
            <span>Movies</span>
          </h1>
          <p className="hero-lead">
            Explore and discover your favorite movies from around the world.
          </p>
          <div className="hero-actions">
            <Link to="/movies" className="btn btn-primary btn-lg">
              Explore Now
            </Link>
          </div>
          <ul className="hero-stats" aria-label="Statistics">
            <li>
              <strong>Thousands</strong>
              <span>of titles</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>free API</span>
            </li>
            <li>
              <strong>One tap</strong>
              <span>to details</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      icon: '🔎',
      title: 'Search',
      text: 'Type any movie or show title and let the grid update instantly.',
    },
    {
      icon: '⭐',
      title: 'Compare',
      text: 'Scores and release years sit right on every card for quick scanning.',
    },
    {
      icon: '🎞️',
      title: 'Explore',
      text: 'Open the details view for summaries, genres, networks and more.',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="section-title">Three small steps</h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="step-icon" aria-hidden="true">
                {step.icon}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [popular, setPopular] = useState([])
  const [loadingPopular, setLoadingPopular] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadPopular() {
      try {
        const shows = await getShowCatalog()
        if (cancelled) return
        const sorted = [...shows].sort(
          (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
        )
        setPopular(sorted.slice(0, 10))
      } catch {
        if (!cancelled) setPopular([])
      } finally {
        if (!cancelled) setLoadingPopular(false)
      }
    }

    loadPopular()

    return () => {
      cancelled = true
    }
  }, [])

  const heading = useMemo(
    () => (loadingPopular ? 'Picking tonight’s lineup…' : 'Popular right now'),
    [loadingPopular],
  )

  return (
    <main className="page page-home">
      <Hero />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Trending</span>
            <h2 className="section-title">{heading}</h2>
            <Link to="/movies" className="section-link">
              View all →
            </Link>
          </div>

          {loadingPopular && (
            <div className="scroller" aria-busy="true">
              {Array.from({ length: 5 }, (_, index) => (
                <div className="scroller-item" key={index}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          )}

          {!loadingPopular && popular.length > 0 && (
            <div className="scroller">
              {popular.map((show) => (
                <div className="scroller-item" key={show.id}>
                  <MovieCard show={show} onSelect={setSelected} />
                </div>
              ))}
            </div>
          )}

          {!loadingPopular && popular.length === 0 && (
            <p className="state-note">
              Couldn’t fetch the lineup right now — head to the catalog instead.
            </p>
          )}
        </div>
      </section>

      <HowItWorks />

      {selected && <MovieModal show={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}