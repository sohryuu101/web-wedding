import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface DateCountdownProps {
  weddingDate: string
}

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function DateCountdown({ weddingDate }: DateCountdownProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime()
      const targetDate = new Date(weddingDate).getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeRemaining({ days, hours, minutes, seconds })
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  return (
    <>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+MT:ital,wght@0,400;1,400&family=Mrs+Saint+Delafield:wght@400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      <section ref={ref} className="w-full min-h-screen bg-[#F3DBB9] relative overflow-hidden flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex max-w-[480px] w-full flex-col items-center text-[36px] font-normal text-center mx-auto"
        >
          {/* Decorative Element */}
          <img
            src="/flower-save-the-date.png"
            alt="Decorative element"
            className="aspect-[0.97] object-contain object-center w-[116px] max-w-full"
          />
          
          {/* Save the Date Text */}
          <div
            className="text-[#3E513C] tracking-[1.08px] mt-7"
            style={{ fontFamily: "'Bodoni MT', serif" }}
          >
            SAVE THE DATE
          </div>
          
          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex mt-[140px] w-[244px] max-w-full items-stretch gap-[100px] text-black whitespace-nowrap tracking-[3.6px]"
            style={{ fontFamily: "'Mrs Saint Delafield', cursive" }}
          >
            {/* Days and Minutes Column */}
            <div className="flex flex-col items-center flex-1">
              <div className="countdown-number">{timeRemaining.days}</div>
              <div
                className="tracking-[1.6px] mt-6 text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Days
              </div>
              <div className="countdown-number mt-[66px]">{timeRemaining.minutes}</div>
              <div
                className="tracking-[1.6px] self-stretch mt-6 text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Minutes
              </div>
            </div>
            
            {/* Hours and Seconds Column */}
            <div className="flex flex-col items-center flex-1">
              <div className="countdown-number">{timeRemaining.hours}</div>
              <div
                className="tracking-[1.6px] mt-6 text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Hours
              </div>
              <div className="countdown-number mt-[69px]">{timeRemaining.seconds}</div>
              <div
                className="tracking-[1.6px] self-stretch mt-6 text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Seconds
              </div>
            </div>
          </motion.div>
          
          {/* Dynamic Wedding Date Text - Positioned above decorative element */}
          <div className="w-full flex flex-col items-center justify-center mt-32">
            <span
              className="block text-[2rem] md:text-[1.5rem] font-bold tracking-[0.18em] text-[#3E513C] uppercase text-center"
              style={{ letterSpacing: '0.18em', fontFamily: 'Bodoni MT, serif' }}
            >
              {new Date(weddingDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).toUpperCase()}
            </span>
          </div>
          
          {/* Bottom Decorative Element */}
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            src="/flower5.png"
            alt="Decorative bottom element"
            className="aspect-[1.63] object-contain object-center w-full self-stretch mt-0"
          />
        </motion.div>
      </section>

      <style>{`
        .countdown-number {
          font-size: 36px;
          line-height: 1;
          color: rgba(0, 0, 0, 1);
          font-family: 'Mrs Saint Delafield', cursive;
          letter-spacing: 3.6px;
        }
      `}</style>
    </>
  )
}
