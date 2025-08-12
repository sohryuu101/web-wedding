import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart } from 'lucide-react'

interface Milestone {
  title: string
  description: string
  date: string
}

interface LoveStorySectionProps {
  milestones: Milestone[]
  title?: string
  subtitle?: string
}

export function LoveStorySection({ 
  milestones, 
  title = "Kisah Cinta Kami",
  subtitle = "Perjalanan Cinta yang Membawa Kami Bersama"
}: LoveStorySectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  if (!milestones || milestones.length === 0) {
    return null
  }

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
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
              {title}
            </h2>
            <Heart className="h-6 w-6 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-200" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{milestone.description}</p>
                    <p className="text-sm text-pink-600 font-medium">
                      {milestone.date}
                    </p>
                  </div>
                </div>

                {/* Timeline Point */}
                <div className="w-4 h-4 bg-pink-500 rounded-full absolute left-1/2 transform -translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
