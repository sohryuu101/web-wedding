import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, ExternalLink, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface EventDetails {
  date: string
  time: string
  venue: string
  address: string
  googleMapsUrl?: string
  dressCode?: string
  additionalInfo?: string
}

interface EventDetailsSectionProps {
  eventDetails: EventDetails
  onRSVP?: () => void
  rsvpButtonText?: string
}

export function EventDetailsSection({ 
  eventDetails, 
  onRSVP,
  rsvpButtonText = "RSVP Now"
}: EventDetailsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleGoogleMaps = () => {
    if (eventDetails.googleMapsUrl) {
      window.open(eventDetails.googleMapsUrl, '_blank')
    } else {
      // Fallback to Google Maps search
      const searchQuery = encodeURIComponent(`${eventDetails.venue}, ${eventDetails.address}`)
      window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank')
    }
  }



  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              RESEPSI
            </h2>
            <Calendar className="h-6 w-6 text-pink-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700 max-w-2xl mx-auto"
        >
          {/* Date */}
          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl font-semibold text-white">
              {format(new Date(eventDetails.date), 'EEEE, d MMMM yyyy', { locale: id }).toUpperCase()}
            </p>
          </div>

          {/* Time */}
          <div className="text-center mb-6">
            <p className="text-lg md:text-xl text-gray-300">
              {eventDetails.time} WIB - 20:00 WIB
            </p>
          </div>

          {/* Venue */}
          <div className="text-center mb-6">
            <p className="text-xl md:text-2xl font-semibold text-white">
              {eventDetails.venue.toUpperCase()}
            </p>
          </div>

          {/* Address */}
          <div className="text-center mb-8">
            <div className="text-gray-300 space-y-1">
              {eventDetails.address.split(',').map((line, index) => (
                <p key={index} className="text-sm md:text-base">
                  {line.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Google Maps Button */}
          <div className="text-center">
            <Button
              onClick={handleGoogleMaps}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              GOOGLE MAPS
            </Button>
          </div>

          {/* Additional Info (if provided) */}
          {eventDetails.dressCode && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Dress Code</h4>
              <p className="text-gray-300">{eventDetails.dressCode}</p>
            </div>
          )}

          {eventDetails.additionalInfo && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Additional Information</h4>
              <p className="text-gray-300 text-sm">{eventDetails.additionalInfo}</p>
            </div>
          )}

          {/* RSVP Button */}
          {onRSVP && (
            <div className="mt-8 text-center">
              <Button
                onClick={onRSVP}
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                {rsvpButtonText}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
