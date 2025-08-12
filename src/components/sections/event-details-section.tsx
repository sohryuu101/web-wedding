import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface EventDetails {
  akadNikah: {
    date: string
    time: string
    venue: string
    address: string
    googleMapsUrl?: string
  }
  resepsi: {
    date: string
    time: string
    venue: string
    address: string
    googleMapsUrl?: string
  }
}

interface EventDetailsSectionProps {
  eventDetails: EventDetails
}

export function EventDetailsSection({ 
  eventDetails
}: EventDetailsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleGoogleMaps = (url?: string, venue?: string, address?: string) => {
    if (url) {
      window.open(url, '_blank')
    } else if (venue && address) {
      // Fallback to Google Maps search
      const searchQuery = encodeURIComponent(`${venue}, ${address}`)
      window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank')
    }
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        {/* Akad Nikah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            Akad Nikah
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-white mb-2 font-light">
                {format(new Date(eventDetails.akadNikah.date), 'EEEE, MMMM', { locale: id })}
              </p>
              <p className="text-6xl md:text-8xl font-serif text-white mb-2 font-light">
                {format(new Date(eventDetails.akadNikah.date), 'd', { locale: id })}
                <sup className="text-2xl md:text-3xl">th</sup>
              </p>
              <p className="text-3xl md:text-4xl font-serif text-white font-light">
                {format(new Date(eventDetails.akadNikah.date), 'yyyy', { locale: id })}
              </p>
            </div>

            <div className="text-center py-6">
              <p className="text-xl md:text-2xl text-white/90 font-light">
                {eventDetails.akadNikah.time}
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 font-light">
                {eventDetails.akadNikah.venue}
              </h3>
              <div className="text-white/80 text-base md:text-lg space-y-1 mb-6">
                {eventDetails.akadNikah.address.split(',').map((line, index) => (
                  <p key={index} className="font-light">
                    {line.trim()}
                  </p>
                ))}
              </div>
              
              <Button
                onClick={() => handleGoogleMaps(
                  eventDetails.akadNikah.googleMapsUrl, 
                  eventDetails.akadNikah.venue, 
                  eventDetails.akadNikah.address
                )}
                className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border border-white/50 px-8 py-3 rounded-none text-base font-light tracking-wider"
                variant="outline"
              >
                View Maps
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Resepsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            Resepsi
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-white mb-2 font-light">
                {format(new Date(eventDetails.resepsi.date), 'EEEE, MMMM', { locale: id })}
              </p>
              <p className="text-6xl md:text-8xl font-serif text-white mb-2 font-light">
                {format(new Date(eventDetails.resepsi.date), 'd', { locale: id })}
                <sup className="text-2xl md:text-3xl">th</sup>
              </p>
              <p className="text-3xl md:text-4xl font-serif text-white font-light">
                {format(new Date(eventDetails.resepsi.date), 'yyyy', { locale: id })}
              </p>
            </div>

            <div className="text-center py-6">
              <p className="text-xl md:text-2xl text-white/90 font-light">
                {eventDetails.resepsi.time}
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 font-light">
                {eventDetails.resepsi.venue}
              </h3>
              <div className="text-white/80 text-base md:text-lg space-y-1 mb-6">
                {eventDetails.resepsi.address.split(',').map((line, index) => (
                  <p key={index} className="font-light">
                    {line.trim()}
                  </p>
                ))}
              </div>
              
              <Button
                onClick={() => handleGoogleMaps(
                  eventDetails.resepsi.googleMapsUrl, 
                  eventDetails.resepsi.venue, 
                  eventDetails.resepsi.address
                )}
                className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border border-white/50 px-8 py-3 rounded-none text-base font-light tracking-wider"
                variant="outline"
              >
                View Maps
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
