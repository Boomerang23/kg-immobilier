import { useState } from 'react'
import Lightbox from './Lightbox'
import PropertyImage from './PropertyImage'

export default function ImageGalleryGrid({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const lightboxImages = images.map((img) => ({
    src: img.src,
    alt: img.alt,
  }))

  const navigateLightbox = (direction) => {
    setLightboxIndex((prev) => (prev + direction + images.length) % images.length)
  }

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[240px]">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className={`group relative overflow-hidden rounded-sm text-left ${image.span}`}
            aria-label={`Voir ${image.alt}`}
          >
            <PropertyImage
              src={image.src}
              alt={image.alt}
              className="h-full w-full"
              imgClassName="group-hover:scale-110"
            />
            <span className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-sm text-white">{image.alt}</span>
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  )
}
