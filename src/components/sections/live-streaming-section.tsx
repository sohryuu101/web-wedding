import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X } from 'lucide-react'

interface LiveStreamingSectionProps {
  title?: string
  subtitle?: string
  storyText?: string
  streamUrl?: string
  previewImage?: string
  photoGallery?: Array<{
    src: string
    alt: string
  }>
}

export function LiveStreamingSection({
  title = "Live Streaming",
  subtitle = "Our Story",
  storyText = "Daffa and Shakira's love story is nothing but adorable! It is the simple things in life that keeps the sparkles flying. \"Carson and I met in college through mutual friends. Our first date was watching this movie together...\"",
  streamUrl,
  previewImage,
  photoGallery = []
}: LiveStreamingSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const openVideo = () => {
    setIsVideoOpen(true)
  }

  const closeVideo = () => {
    setIsVideoOpen(false)
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
        style={{
          backgroundImage: `url(${previewImage || '/placeholder.svg'})`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center pt-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            {title}
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full">
            {/* Video Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 mb-8 cursor-pointer"
              onClick={openVideo}
            >
              <img
                src={previewImage || '/placeholder.svg'}
                alt="Live Stream Preview"
                className="w-full h-full object-cover filter grayscale"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>

              {/* Vevo logo overlay */}
              <div className="absolute bottom-4 left-4">
                <div className="text-white font-bold text-2xl">vevo</div>
              </div>
            </motion.div>

            {/* Story Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-6xl font-serif text-white mb-8 font-light tracking-wider">
                {subtitle}
              </h3>
              
              {/* Gallery Preview */}
              {photoGallery.length > 0 && (
                <div className="mb-8">
                  <div className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 max-w-md mx-auto">
                    <img
                      src={photoGallery[0]?.src || '/placeholder.svg'}
                      alt={photoGallery[0]?.alt || 'Gallery Preview'}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                </div>
              )}

              {/* Story Text */}
              <div className="bg-white/10 backdrop-blur-sm rounded-none p-8 border border-white/20 max-w-2xl mx-auto">
                <p className="text-white/90 font-light leading-relaxed text-base md:text-lg">
                  {storyText}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && streamUrl && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={streamUrl}
                  title="Live Stream"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
