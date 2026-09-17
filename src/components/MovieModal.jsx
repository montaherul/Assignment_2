import { useEffect, useRef } from 'react'
import Poster from './Poster'

function plainText(html) {
  const node = document.createElement('div')
  node.innerHTML = html || ''
  return (node.textContent || '').replace(/\s+/g, ' ').trim()
}

function premierYear(show) {
  const year = (show.premiered || '').match(/^\d{4}/)
  return year ? year[0] : 'Unknown'
}

export default function MovieModal({ show, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const summary = plainText(show.summary) || 'No description available for this title.'
  const year = premierYear(show)
  const rating = show.rating?.average
  const network = show.network?.name || show.webChannel?.name || null

  return (
    <div className="modal-layer" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${show.name}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close details">
          ✕
        </button>

        <div className="modal-banner">
          <Poster show={show} size="original" className="modal-banner-img" />
          <div className="modal-banner-shade" aria-hidden="true" />
        </div>

        <div className="modal-body">
          <div className="modal-poster">
            <Poster show={show} size="medium" className="modal-poster-img" />
          </div>

          <div className="modal-info">
            <div className="modal-eyebrow">Show details</div>
            <h2 className="modal-title">{show.name}</h2>

            <div className="modal-stats">
              <span className={`stat score ${rating ? '' : 'stat-empty'}`}>
                <span className="star">⭐</span> Rating:{' '}
                {rating ? rating.toFixed(1) : 'N/A'}
              </span>
              <span className="stat-divider" aria-hidden="true">
                |
              </span>
              <span className="stat">📅 Release: {year}</span>
              {show.status && (
                <>
                  <span className="stat-divider" aria-hidden="true">
                    •
                  </span>
                  <span className="stat">{show.status}</span>
                </>
              )}
            </div>

            {show.genres?.length > 0 && (
              <ul className="genre-list">
                {show.genres.map((genre) => (
                  <li key={genre} className="genre-chip">
                    {genre}
                  </li>
                ))}
              </ul>
            )}

            <p className="modal-summary">{summary}</p>

            <dl className="fact-grid">
              <div className="fact-item">
                <dt>Language</dt>
                <dd>{show.language || '—'}</dd>
              </div>
              <div className="fact-item">
                <dt>Type</dt>
                <dd>{show.type || '—'}</dd>
              </div>
              <div className="fact-item">
                <dt>Network</dt>
                <dd>{network || '—'}</dd>
              </div>
              <div className="fact-item">
                <dt>Premiered</dt>
                <dd>{show.premiered || '—'}</dd>
              </div>
            </dl>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}