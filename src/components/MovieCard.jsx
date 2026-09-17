import Poster from './Poster'

function premierYear(show) {
  const date = show.premiered || ''
  const year = date.match(/^\d{4}/)
  return year ? year[0] : '—'
}

function score(show) {
  const value = show.rating?.average
  return value ? value.toFixed(1) : 'N/A'
}

export default function MovieCard({ show, onSelect }) {
  const { name, genres } = show

  return (
    <article className="card">
      <div className="card-media">
        <Poster show={show} size="medium" className="card-poster-img" />
        {genres?.[0] && <span className="card-genre">{genres[0]}</span>}
      </div>

      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-meta">
          ⭐ {score(show)} <span aria-hidden="true">•</span> 📅{' '}
          {premierYear(show)}
        </p>
        <button className="btn btn-ghost card-action" onClick={() => onSelect(show)}>
          See Details
        </button>
      </div>
    </article>
  )
}