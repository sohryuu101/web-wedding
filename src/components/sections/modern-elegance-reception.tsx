import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ReceptionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+MT:ital,wght@0,400;1,400&display=swap');
      `}</style>

      <section ref={ref} className="w-full min-h-screen bg-[#F3DBB9] relative overflow-hidden flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex max-w-[480px] w-full flex-col items-center text-[#3E513C] text-center mx-auto"
          style={{ fontFamily: "'Bodoni MT', serif" }}
        >
          {/* Main Header with Background Image */}
          <div className="flex flex-col self-stretch relative aspect-[1.673] text-[36px] tracking-[1.08px] pt-[184px] pb-9 px-[49px]">
            <img
              src="/flower5.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative text-[36px] tracking-[1.08px]">
              THE RECEPTION
            </div>
          </div>

          {/* Venue Section */}
          <div className="text-[26px] tracking-[0.78px] mt-7">
            VENUE
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/fb523c1c71a3993533be9448ecfdf5ed77488f73?placeholderIfAbsent=true"
            alt="Venue decoration"
            className="aspect-[1.61] object-contain w-[258px] max-w-full mt-[29px]"
          />

          <div className="text-[20px] tracking-[0.6px] mt-[25px] leading-relaxed">
            We're celebrating at the Brajamustika Events Hall in our hometown,
            Bogor.
          </div>

          {/* Attire Section */}
          <div className="text-[26px] tracking-[0.78px] mt-[43px]">
            ATTIRE
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/cd886f1f830a73addb0bf56e1e2f64b092ff3118?placeholderIfAbsent=true"
            alt="Attire guideline"
            className="aspect-[1.61] object-contain w-[258px] max-w-full rounded-[47px] mt-[29px]"
          />

          <div className="text-[20px] tracking-[0.6px] mt-[25px] leading-relaxed">
            Please come in light and breezy smart casual attire, as our wedding will
            be held outdoors.
          </div>
        </motion.div>
      </section>
    </>
  )
}
