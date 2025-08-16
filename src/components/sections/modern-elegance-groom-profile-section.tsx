import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram } from 'lucide-react'

interface SocialMedia {
  instagram?: string
}

interface ParentInfo {
  father: string
  mother: string
}

interface ModernEleganceGroomProfileSectionProps {
  name: string
  photo?: string
  parents: ParentInfo
  socialMedia?: SocialMedia
  birthOrder?: 'first' | 'second' | 'third' | 'fourth' | 'fifth'
}

const getBirthOrderText = (order: string) => {
  const orderMap = {
    first: 'Son of',
    second: 'Second Son of',
    third: 'Third Son of',
    fourth: 'Fourth Son of',
    fifth: 'Fifth Son of'
  }
  return orderMap[order as keyof typeof orderMap] || 'Son of'
}

export function ModernEleganceGroomProfileSection({ 
  name, 
  photo, 
  parents, 
  socialMedia, 
  birthOrder = 'first' 
}: ModernEleganceGroomProfileSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Split the name into parts for styling
  const nameWords = name.split(' ')
  const firstName = nameWords[0] || ''
  const lastName = nameWords.slice(1).join(' ') || ''

  return (
    <>
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&display=swap');
      `}</style>

      <section ref={ref} className="w-full min-h-screen bg-[#F3DBB9] relative overflow-hidden flex flex-col items-center justify-center p-8">
        {/* Groom Name Typography */}
        <div className="relative text-center">
          {/* First Name */}
          <span 
            className="text-[96px] leading-none text-[#3E513C]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {firstName}
          </span>

          {/* Last Name */}
          <span 
            className="text-[96px] leading-none text-[#3E513C] block mt-[-20px]"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {lastName}
          </span>
        </div>

        {/* Photo with decorative frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          {/* Outer green frame */}
          <div 
            className="relative bg-[#3E513C] rounded-full overflow-hidden"
            style={{ width: '238px', height: '407px' }}
          >
            {/* Inner photo container */}
            <div 
              className="absolute bg-[#D9D9D9] rounded-full overflow-hidden"
              style={{ 
                width: '210px', 
                height: '359px',
                left: '14px',
                top: '23px'
              }}
            >
              {photo ? (
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500 text-sm text-center px-4">
                    No Photo<br />Available
                  </span>
                </div>
              )}
            </div>

            {/* Decorative flowers */}
            <div className="absolute" style={{ left: '0px', top: '200px' }}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/d3811636177a18cb1ccb7370a8fb5b717f5440e5?width=654"
                alt=""
                className="w-[327px] h-[184px] object-cover"
                style={{ transform: 'rotate(38.431deg)' }}
              />
            </div>
            <div className="absolute" style={{ left: '210px', top: '200px' }}>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/9f67735511a6452b22882fac3bd07514fc99b90b?width=654"
                alt=""
                className="w-[327px] h-[184px] object-cover"
                style={{ transform: 'rotate(-141.569deg)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Parents information */}
        <p 
          className="text-[16px] leading-normal text-black text-center tracking-[1.6px] mt-8"
          style={{ fontFamily: "'Cardo', serif" }}
        >
          {getBirthOrderText(birthOrder)} Mr. {parents.father || '[Father Name]'}
          <br />
          & Mrs. {parents.mother || '[Mother Name]'}
        </p>

        {/* Social Media */}
        {socialMedia?.instagram && (
          <div className="flex items-center space-x-4 mt-4">
            <Instagram className="w-6 h-6 text-black" />
            <span 
              className="text-[16px] leading-normal text-black tracking-[1.6px]"
              style={{ fontFamily: "'Cardo', serif" }}
            >
              {socialMedia.instagram}
            </span>
          </div>
        )}
      </section>
    </>
  )
}
