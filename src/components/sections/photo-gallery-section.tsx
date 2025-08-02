import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: string
  src: string
  alt: string
  caption?: string
}

interface PhotoGallerySectionProps {
  photos: Photo[]
  title?: string
  subtitle?: string
}

export function PhotoGallerySection({ 
  photos, 
  title = "Photo Gallery",
  subtitle = "Capturing our precious moments"
}: PhotoGallerySectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!photos || photos.length === 0) {
    return null
  }

  const openLightbox = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowRight') {
      nextPhoto()
    } else if (e.key === 'ArrowLeft') {
      prevPhoto()
    }
  }



  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6 text-amber-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              {title}
            </h2>
            <Camera className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(photo, index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-[114px] h-[171px] object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium truncate">{photo.caption}</p>
                </div>
              )}
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>



              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevPhoto()
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextPhoto()
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              {/* Photo */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative"
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                {selectedPhoto.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 rounded-b-lg">
                    <p className="text-white text-center">{selectedPhoto.caption}</p>
                  </div>
                )}
              </div>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm">
                  {currentIndex + 1} / {photos.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-100 max-w-2xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              Click on any photo to view it in full size. Use arrow keys or swipe to navigate through the gallery.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
