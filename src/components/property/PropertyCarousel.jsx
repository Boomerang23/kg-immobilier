import { useState, useRef, useCallback } from 'react'
import Lightbox from '../ui/Lightbox'
import PropertyImage from '../ui/PropertyImage'

const SWIPE_THRESHOLD = 50

export default function PropertyCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const touchStart = useRef(null)
  const touchDelta = useRef(0)

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + images.length) % images.length)
    },
    [images.length],
  )

  const navigate = useCallback(
    (direction) => goTo(activeIndex + direction),
    [activeIndex, goTo],
  )

  const openLightbox = (index) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  const navigateLightbox = (direction) => {
    setActiveIndex((prev) => (prev + direction + images.length) % images.length)
  }

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
    touchDelta.current = 0
  }

  const onTouchMove = (e) => {
    if (touchStart.current === null) return
    touchDelta.current = e.touches[0].clientX - touchStart.current
  }

  const onTouchEnd = () => {
    if (Math.abs(touchDelta.current) > SWIPE_THRESHOLD) {
      navigate(touchDelta.current > 0 ? -1 : 1)
    }
    touchStart.current = null
    touchDelta.current = 0
  }

  return (
    <>
      <div className="space-y-3">
        <div
          className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-beige-200 sm:aspect-[16/10]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            className="relative h-full w-full"
            aria-label="Agrandir la photo"
          >
            {images.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                aria-hidden={index !== activeIndex}
              >
                <PropertyImage
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
            ))}
            <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/15">
              <span className="flex items-center gap-2 rounded-sm bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-wider text-charcoal opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
                Agrandir
              </span>
            </span>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md transition-all hover:bg-white hover:scale-105 sm:left-4 sm:h-11 sm:w-11"
                aria-label="Photo précédente"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate(1)}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md transition-all hover:bg-white hover:scale-105 sm:right-4 sm:h-11 sm:w-11"
                aria-label="Photo suivante"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
              <span className="absolute bottom-3 right-3 rounded-sm bg-charcoal/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm sm:bottom-4 sm:right-4">
                {activeIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(index)}
                className={`group relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-sm transition-all duration-300 sm:w-24 ${
                  activeIndex === index
                    ? 'ring-2 ring-gold-500 ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Voir ${image.alt}`}
                aria-current={activeIndex === index}
              >
                <PropertyImage
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full"
                  imgClassName="group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  )
}
