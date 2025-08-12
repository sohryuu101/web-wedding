import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  title = "Our Gallery",
  subtitle = "Our Engagement"
}: PhotoGallerySectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlaying && photos.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
      }, 4000)
      
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, photos.length])

  if (!photos || photos.length === 0) {
    return null
  }

  const nextPhoto = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevPhoto = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => prevIndex === 0 ? photos.length - 1 : prevIndex - 1)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${photos[currentIndex]?.src || '/placeholder.svg'})`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center pt-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-4 font-light tracking-wider">
            {title}
          </h2>
        </motion.div>

        {/* Main Photo Display */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-2xl w-full"
          >
            {/* Main Photo */}
            <div className="relative aspect-[3/4] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
              <img
                src={photos[currentIndex]?.src}
                alt={photos[currentIndex]?.alt}
                className="w-full h-full object-cover filter grayscale"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Caption */}
            {photos[currentIndex]?.caption && (
              <div className="mt-4 text-center">
                <p className="text-white/80 font-light">
                  {photos[currentIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center pb-16"
        >
          <p className="text-2xl md:text-3xl font-serif text-white/90 mb-8 font-light tracking-wider">
            {subtitle}
          </p>
          
          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Photo Counter */}
          <div className="text-white/60 text-sm font-light">
            {currentIndex + 1} / {photos.length}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
