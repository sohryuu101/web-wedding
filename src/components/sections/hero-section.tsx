import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  brideName: string
  groomName: string
  weddingDate: string
  venue?: string
  coverImage?: string
  islamicVerse?: { arabic: string; translation: string; source: string }
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
  coverImage,
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

  const { days, hours, minutes, seconds } = countdown

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
        style={{
          backgroundImage: `url(${coverImage || '/placeholder.svg'})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'color-mix(in oklab, var(--primary) 65%, black 35%)', opacity: 0.75 }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl text-white/90 mb-8 font-light tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
            The Wedding Of
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 font-light" style={{ fontFamily: 'Great Vibes, cursive' }}>
            {brideName} &
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-12 font-light" style={{ fontFamily: 'Great Vibes, cursive' }}>
            {groomName}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
            {new Date(weddingDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      </div>

      {/* Countdown Timer at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mb-16 w-full max-w-md mx-auto px-4"
      >
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center mb-2">
              <p className="text-2xl md:text-3xl font-light text-white">{days}</p>
            </div>
            <p className="text-sm md:text-base text-white/80 font-light">Days</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center mb-2">
              <p className="text-2xl md:text-3xl font-light text-white">{hours}</p>
            </div>
            <p className="text-sm md:text-base text-white/80 font-light">Hours</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center mb-2">
              <p className="text-2xl md:text-3xl font-light text-white">{minutes}</p>
            </div>
            <p className="text-sm md:text-base text-white/80 font-light">Minutes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 flex items-center justify-center mb-2">
              <p className="text-2xl md:text-3xl font-light text-white">{seconds}</p>
            </div>
            <p className="text-sm md:text-base text-white/80 font-light">Seconds</p>
          </div>
        </div>
      </motion.div>

      {/* Add to Calendar Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mb-8"
      >
        <div className="border-t border-white/30 w-64 mx-auto mb-6"></div>
        <Button
          onClick={handleOpenInvitation}
          className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border border-white/50 px-8 py-3 rounded-none text-base font-light tracking-wider"
          variant="outline"
        >
          Add to Calendar
        </Button>
      </motion.div>
    </section>
  )
} 