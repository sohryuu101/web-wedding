import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from 'lucide-react'

interface ThankYouSectionProps {
  bridePhoto?: string
  groomPhoto?: string
  thankYouMessage?: string
  coupleNames: string
}

export function ThankYouSection({
  bridePhoto,
  groomPhoto,
  thankYouMessage = "Kami sangat bersyukur memiliki Anda dalam hidup kami dan kami tidak sabar untuk merayakan hari spesial ini bersama Anda. Kehadiran Anda sangat berarti bagi kami.",
  coupleNames
}: ThankYouSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-[color:var(--primary)]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              TERIMA KASIH
            </h2>
            <Heart className="h-6 w-6 text-[color:var(--primary)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center gap-8 mb-8">
              {bridePhoto && (
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={bridePhoto}
                    alt="Pengantin Wanita"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              )}
              {groomPhoto && (
                <div className="w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={groomPhoto}
                    alt="Pengantin Pria"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              )}
            </div>

            <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              {coupleNames}
            </p>

            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Cardo, serif' }}>
              {thankYouMessage}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 