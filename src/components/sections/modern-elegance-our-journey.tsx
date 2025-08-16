import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ModernEleganceOurJourneySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+MT:ital,wght@0,400;1,400&family=Luxurious+Script:wght@400&family=Cardo:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>

      <section ref={ref} className="w-full min-h-screen bg-[#F3DBB9] relative overflow-hidden flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex max-w-[480px] w-full flex-col items-center text-[36px] text-[#3E513C] font-normal text-center mx-auto"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/7468a0dd563a8c1e48c9212143b200e9f791a5a1?placeholderIfAbsent=true"
            alt="Decorative element"
            className="aspect-[1.78] object-contain object-center w-[205px] max-w-full"
          />
          
          <div
            className="tracking-[1.08px] mt-2"
            style={{ fontFamily: "'Bodoni MT', serif" }}
          >
            OUR JOURNEY
          </div>
          
          <div
            className="tracking-[4.32px] mt-[6px]"
            style={{ fontFamily: "'Luxurious Script', cursive" }}
          >
            Together
          </div>
          
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/26a21e83-a9fa-4e95-ad49-4e5f908e1ec6?placeholderIfAbsent=true"
            alt="Journey illustration"
            className="aspect-square object-contain object-center w-full self-stretch mt-7"
          />
          
          <div
            className="tracking-[0.45px] mt-7 text-[15px] leading-relaxed"
            style={{ fontFamily: "'Cardo', serif" }}
          >
            "This journey is a story of two hearts brought together by fate,
            traveling through time together, through smiles, laughter, and emotion.
            Every step we take, every moment we hold, is part of a beautiful story
            we are writing together. This is the beginning of a never-ending
            journey, where love is the direction, and togetherness is the goal."
          </div>
        </motion.div>
      </section>
    </>
  )
}
