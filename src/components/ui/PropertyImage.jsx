import { useState } from 'react'

export default function PropertyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  hoverZoom = false,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-beige-200 ${className}`}>
      <div
        className={`absolute inset-0 bg-beige-200 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
        } ${hoverZoom ? 'group-hover:scale-105' : ''} ${imgClassName}`}
      />
    </div>
  )
}
