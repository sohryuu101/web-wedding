import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ModernEleganceHeroSectionProps {
  brideName: string
  groomName: string
  weddingDate: string
  venue?: string
}

export function ModernEleganceHeroSection({ 
  brideName, 
  groomName, 
  weddingDate, 
  venue
}: ModernEleganceHeroSectionProps) {

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    })

    // Only use the first name (first word)
    const brideFirstName = brideName.split(' ')[0]
    const groomFirstName = groomName.split(' ')[0]

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
      return date.toLocaleDateString('en-US', options)
    }

  return (
    <section ref={ref} className="hero-section flex flex-col items-start font-normal text-center relative min-h-dvh">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="garden-hero-container min-h-dvh bg-[#3e513c] flex w-full flex-col items-center px-20 pt-[12px] pb-36 max-sm:px-5 max-sm:pb-24 relative overflow-hidden"
      >
        {/* Decorative flowers */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-0 right-0 max-sm:top-8 max-sm:right-4"
        >
          <img
            src="../public/flower1.png"
            alt=""
            className="w-[400px] h-[270px] object-cover max-sm:w-20 max-sm:h-12"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-20 left-0 max-sm:bottom-12 max-sm:left-4"
        >
          <img
            src="../public/flower2.png"
            alt=""
            className="w-[400px] h-[200px] object-cover max-sm:w-18 max-sm:h-10"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="couple-names-container flex w-full max-w-[360px] flex-col items-stretch -mb-12 max-sm:mb-2"
        >
          <div className="initials-and-connector flex w-full max-w-[228px] items-start gap-5 justify-between whitespace-nowrap max-sm:whitespace-normal">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="groom-initial text-[#f3dbb9] tracking-[2.88px] self-start text-[96px] max-sm:text-[40px]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {groomFirstName}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="connector-and text-[#b4b49f] tracking-[3.6px] self-end mt-[103px] max-sm:mt-10 text-[40px]"
              style={{ fontFamily: "'Luxurious Script', cursive" }}
            >
              and
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bride-initial text-[#f3dbb9] tracking-[2.88px] self-end mr-[42px] max-sm:mr-2 text-[96px] max-sm:text-[40px]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {brideFirstName}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="wedding-details flex mt-6 w-full pl-5 flex-col items-stretch uppercase text-base max-sm:pl-5" 
            style={{ fontFamily: "'Bodoni MT', serif" }}
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c2b3edda815153e3402b50bc29a814a5af5abe01?placeholderIfAbsent=true&apiKey=ec6adca57eb244da87a6b11d0c8ba604"
              className="decorative-flourish aspect-[1.28] object-contain object-center w-full max-sm:mx-auto"
              alt="Decorative flourish"
            />
            <div className="celebration-text text-[#b4b49f] tracking-[0.48px] mt-[78px] max-sm:mt-10">
              are celebrating their wedding on
            </div>
            <div className="date-venue-container self-end flex items-stretch gap-6 text-[#f3dbb9] tracking-[1.92px] mt-8 mb-24 mr-6 max-sm:mr-2 max-sm:mb-12">
              <div className="wedding-date my-auto">
                {formatDate(weddingDate)}
              </div>
              <div className="divider-and-venue flex items-stretch gap-3">
                <div className="divider bg-[#f3dbb9] flex w-px shrink-0 h-[74px]" />
                <div className="venue-name my-auto">
                  {venue || "Wedding Venue"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}