import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FinalSectionProps {
  brideName: string
  groomName: string
  weddingDate: string
  hashtag?: string
  poweredBy?: {
    name: string
    logo?: string
  }
  backgroundImage?: string
}

export function FinalSection({
  brideName,
  groomName,
  weddingDate,
  hashtag = "#PromDatetoLifeMate",
  poweredBy = {
    name: "KATSUDOTO",
    logo: "🤍"
  },
  backgroundImage
}: FinalSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="min-h-screen text-white relative overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
        style={{
          backgroundImage: `url(${backgroundImage || '/placeholder.svg'})`,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 65%, black 35%)', opacity: 0.75 }} />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl text-white/90 font-light tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                The Wedding Of
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light" style={{ fontFamily: 'Great Vibes, cursive' }}>
                {brideName} & {groomName}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                {new Date(weddingDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Hashtag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-8"
            >
              <p className="text-lg md:text-xl text-white/80 font-light tracking-wider">
                {hashtag}
              </p>
            </motion.div>

            {/* Powered By */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8"
            >
              <div className="flex items-center justify-center space-x-3 text-white/70">
                <span className="text-sm md:text-base font-light tracking-wider">
                  Powered by
                </span>
                <div className="flex items-center space-x-2">
                  {poweredBy.logo && (
                    <span className="text-lg">{poweredBy.logo}</span>
                  )}
                  <span className="text-sm md:text-base font-bold tracking-wider">
                    {poweredBy.name}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center pb-8"
        >
          <div className="border-t border-white/30 w-64 mx-auto mb-8"></div>
          <p className="text-white/60 text-xs md:text-sm font-light tracking-wider">
            Thank you for sharing our special day
          </p>
        </motion.div>
      </div>
    </section>
  )
} 