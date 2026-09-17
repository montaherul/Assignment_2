export default function SkeletonCard() {
  return (
    <div className="card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-media" />
      <div className="card-content">
        <div className="skeleton skeleton-line skeleton-line-long" />
        <div className="skeleton skeleton-line skeleton-line-short" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  )
}