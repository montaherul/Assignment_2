import { useEffect, useState } from 'react'
import { getShowCatalog, searchShows } from '../api/tvmaze'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import SkeletonCard from '../components/SkeletonCard'

const SUGGESTIONS = ['Breaking Bad', 'Stranger Things', 'The Office', 'Narcos']

export default function MoviesPage() {
  const [term, setTerm] = useState('')
  const debouncedTerm = useDebouncedValue(term, 450)

  const [shows, setShows] = useState([])
  const [state, setState] = useState('loading') // loading | ready | error
  const [errorMessage, setErrorMessage] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadShows() {
      try {
        const list = debouncedTerm
          ? await searchShows(debouncedTerm, controller.signal)
          : await getShowCatalog(controller.signal)
        setShows(list)
        setState('ready')
      } catch (error) {
        if (error.name === 'AbortError') return
        setErrorMessage(
          error.message || 'Something went wrong while loading shows.',
        )
        setState('error')
      }
    }

    loadShows()

    return () => controller.abort()
  }, [debouncedTerm])

  const beginSearch = (value) => {
    setTerm(value)
    setState('loading')
  }

  const clearSearch = () => beginSearch('')

  const retry = async () => {
    setErrorMessage('')
    setState('loading')
    try {
      const list = debouncedTerm
        ? await searchShows(debouncedTerm)
        : await getShowCatalog()
      setShows(list)
      setState('ready')
    } catch (error) {
      setErrorMessage(error.message || 'Please try again.')
      setState('error')
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">Catalog</span>
          <h1 className="page-title">Explore the collection</h1>
          <p className="page-subtitle">
            Search by title, or scroll through the full catalog.
          </p>
        </header>

        <div className="search">
          <div className="search-field">
            <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search for a movie…"
              value={term}
              onChange={(event) => beginSearch(event.target.value)}
              aria-label="Search shows by title"
            />
            {term && (
              <button className="search-clear" onClick={clearSearch} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          {!term && (
            <div className="search-suggestions">
              <span className="suggestion-label">Trending:</span>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className="suggestion-chip"
                  onClick={() => beginSearch(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {state === 'loading' && (
          <div className="movie-grid" aria-busy="true" aria-label="Loading shows">
            {Array.from({ length: 12 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {state === 'error' && (
          <div className="state state-error">
            <span className="state-icon" aria-hidden="true">
              ⚠️
            </span>
            <h3>Couldn’t load shows</h3>
            <p>{errorMessage}</p>
            <button className="btn btn-primary" onClick={retry}>
              Try again
            </button>
          </div>
        )}

        {state === 'ready' && shows.length === 0 && (
          <div className="state">
            <span className="state-icon" aria-hidden="true">
              🎬
            </span>
            <h3>No matches for “{term}”</h3>
            <p>Try a different title or clear the search.</p>
            <button className="btn btn-ghost" onClick={clearSearch}>
              Show all shows
            </button>
          </div>
        )}

        {state === 'ready' && shows.length > 0 && (
          <>
            <p className="result-count">
              {term ? (
                <>
                  {shows.length} result{shows.length === 1 ? '' : 's'} for “
                  {term}”
                </>
              ) : (
                <>
                  Showing <strong>{shows.length}</strong> shows
                </>
              )}
            </p>
            <div className="movie-grid">
              {shows.map((show) => (
                <MovieCard key={show.id} show={show} onSelect={setSelected} />
              ))}
            </div>
          </>
        )}
      </div>

      {selected && <MovieModal show={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}