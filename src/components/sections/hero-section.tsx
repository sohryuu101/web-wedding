import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Mail } from 'lucide-react'

interface HeroSectionProps {
  brideName: string
  groomName: string
  weddingDate: string
  venue?: string
  coverImage?: string
  islamicVerse?: string
  mainTitle: string
  subtitle: string
  guestName?: string
  onOpenInvitation?: () => void
}

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function HeroSection({
  brideName,
  groomName,
  weddingDate,
  venue,
  coverImage,
  islamicVerse,
  mainTitle,
  guestName = "Nama Tamu",
  onOpenInvitation
}: HeroSectionProps) {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const wedding = new Date(weddingDate)
      
      setCountdown({
        days: differenceInDays(wedding, now),
        hours: differenceInHours(wedding, now) % 24,
        minutes: differenceInMinutes(wedding, now) % 60,
        seconds: differenceInSeconds(wedding, now) % 60
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  const handleOpenInvitation = () => {
    if (onOpenInvitation) {
      onOpenInvitation()
    } else {
      // Scroll to next section
      const nextSection = document.querySelector('section:nth-of-type(2)')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${coverImage || '/placeholder.svg'})`,
        }}
      />
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-serif text-white/90 mb-4">
            {mainTitle}
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {brideName} & {groomName}
          </h2>
        </motion.div>

        {/* Guest Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl font-serif text-white/80 mb-2">
            DEAR
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-white">
            {guestName}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Hari', value: countdown.days },
              { label: 'Jam', value: countdown.hours },
              { label: 'Menit', value: countdown.minutes },
              { label: 'Detik', value: countdown.seconds }
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl md:text-4xl font-bold mb-1">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wedding Date & Venue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Calendar className="h-5 w-5" />
              <p className="text-lg md:text-xl font-semibold">
                {new Date(weddingDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            {venue && (
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5" />
                <p className="text-base md:text-lg">{venue}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Open Invitation Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            onClick={handleOpenInvitation}
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Mail className="h-5 w-5 mr-2" />
            OPEN INVITATION
          </Button>
        </motion.div>

        {/* Islamic Verse */}
        {islamicVerse && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-sm md:text-base text-white/90 leading-relaxed font-serif italic">
                "{islamicVerse}"
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 