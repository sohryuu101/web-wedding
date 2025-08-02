import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Sparkles } from 'lucide-react'

interface ThankYouSectionProps {
  bridePhoto?: string
  groomPhoto?: string
  thankYouMessage?: string
  coupleNames: string
}

export function ThankYouSection({
  bridePhoto,
  groomPhoto,
  thankYouMessage = "We are truly blessed to have you in our lives and we can't wait to celebrate this special day with you. Your presence means the world to us.",
  coupleNames
}: ThankYouSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              Thank You
            </h2>
            <Sparkles className="h-6 w-6 text-rose-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For being part of our journey and sharing in our joy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Bride Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={bridePhoto || '/placeholder.svg'}
                alt="Bride"
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">The Bride</h3>
                <p className="text-gray-200">Beautiful & Graceful</p>
              </div>
            </div>
            
          </motion.div>

          {/* Groom Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={groomPhoto || '/placeholder.svg'}
                alt="Groom"
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">The Groom</h3>
                <p className="text-gray-200">Handsome & Charming</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-rose-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif">
                {coupleNames}
              </h3>
              <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif italic">
              "{thankYouMessage}"
            </p>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-rose-300"></div>
              <Heart className="h-6 w-6 text-rose-500" />
              <div className="w-16 h-px bg-rose-300"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 