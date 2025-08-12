import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, X } from 'lucide-react'

interface Video {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  description?: string
}

interface VideoGallerySectionProps {
  videos: Video[]
  title?: string
  subtitle?: string
}

export function VideoGallerySection({ 
  videos, 
  title = "Our Footage",
  subtitle = "The Pre-Wedding"
}: VideoGallerySectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (!videos || videos.length === 0) {
    return null
  }

  const openVideo = (video: Video) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            {title}
          </h2>
          <p className="text-2xl md:text-3xl font-serif text-white/90 font-light tracking-wider">
            {subtitle}
          </p>
        </motion.div>

        {/* Video Thumbnails */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => openVideo(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Polaroid-style frame */}
                  <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-white/80 rounded-lg transform rotate-3 -z-10"></div>
                </div>

                {/* Video Title */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-serif text-white/90 font-light">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-white/60 mt-1">
                      {video.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
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
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-serif text-white mb-2">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-white/80 font-light">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
