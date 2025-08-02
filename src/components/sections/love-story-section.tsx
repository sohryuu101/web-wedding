import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Calendar, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface LoveStoryMilestone {
  id: string
  date: string
  title: string
  description: string
  location?: string
  image?: string
}

interface LoveStorySectionProps {
  milestones: LoveStoryMilestone[]
  title?: string
  subtitle?: string
}

export function LoveStorySection({ 
  milestones, 
  title = "Our Love Story",
  subtitle = "Every moment that brought us together"
}: LoveStorySectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  if (!milestones || milestones.length === 0) {
    return null
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              {title}
            </h2>
            <Heart className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 to-pink-400 h-full hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg hidden md:block z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                    {/* Image */}
                    {milestone.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600 font-medium">
                          {format(new Date(milestone.date), 'EEEE, d MMMM yyyy', { locale: id })}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {milestone.title}
                      </h3>

                      {milestone.location && (
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {milestone.location}
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Timeline Dot */}
                <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg md:hidden my-4" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Story Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: milestones.length * 0.2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-purple-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800">
                And the story continues...
              </h3>
              <Heart className="h-8 w-8 text-purple-500 animate-pulse" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              Every day we write a new chapter in our love story, and we're excited to share this special moment with all of you.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
