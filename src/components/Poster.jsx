import { useState } from 'react'
import noPoster from '../assets/no-poster.svg'

export default function Poster({ show, className = '', size = 'medium' }) {
  const url = show.image?.[size] || show.image?.medium || null
  const [broken, setBroken] = useState(false)
  const alt = `Poster for ${show.name}`

  if (!url || broken) {
    return <img className={`${className} poster-fallback`} src={noPoster} alt={alt} />
  }

  return (
    <img
      className={className}
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  )
}