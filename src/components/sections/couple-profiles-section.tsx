import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram } from 'lucide-react'

interface ParentInfo {
  father: string
  mother: string
}

interface SocialMedia {
  instagram?: string
}

interface CoupleProfile {
  name: string
  photo?: string
  parents: ParentInfo
  socialMedia?: SocialMedia
  description?: string
  birthOrder?: 'first' | 'second' | 'third' | 'fourth' | 'fifth'
  gender: 'male' | 'female'
}

interface CoupleProfilesSectionProps {
  bride: CoupleProfile
  groom: CoupleProfile
}

const getBirthOrderText = (order: string, gender: 'male' | 'female') => {
  const orderMap = {
    first: gender === 'male' ? 'Son of' : 'Daughter of',
    second: gender === 'male' ? 'Second Son of' : 'Second Daughter of',
    third: gender === 'male' ? 'Third Son of' : 'Third Daughter of',
    fourth: gender === 'male' ? 'Fourth Son of' : 'Fourth Daughter of',
    fifth: gender === 'male' ? 'Fifth Son of' : 'Fifth Daughter of'
  }
  return orderMap[order as keyof typeof orderMap] || 'Son of'
}

export function CoupleProfilesSection({ bride, groom }: CoupleProfilesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <>
      {/* Bride Page */}
      <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
          style={{
            backgroundImage: `url(${bride.photo || '/placeholder.svg'})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 min-h-screen flex flex-col justify-between p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center pt-16"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-white/90 mb-4 font-light tracking-wider">
              The pleasure of your company is requested at the
            </h2>
            <h3 className="text-xl md:text-2xl font-serif text-white/90 font-light tracking-wider">
              marriage of
            </h3>
          </motion.div>

          {/* Bride Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center flex-1 flex flex-col justify-end pb-32"
          >
            <div className="border-b border-white/30 w-64 mx-auto mb-8"></div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-4 font-light">
              The Bride
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Groom Page */}
      <section className="min-h-screen bg-black text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
          style={{
            backgroundImage: `url(${groom.photo || '/placeholder.svg'})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="border-b border-white/30 w-64 mx-auto"></div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-light">
              The Groom
            </h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-none px-8 py-6 max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 font-light">
                {groom.name}
              </h2>
              <p className="text-base md:text-lg text-white/80 mb-2 font-light">
                {getBirthOrderText(groom.birthOrder || 'first', groom.gender)}
              </p>
              {(groom.parents.father || groom.parents.mother) && (
                <div className="text-white/90 space-y-1">
                  {groom.parents.father && <p className="font-light">{groom.parents.father}</p>}
                  {groom.parents.father && groom.parents.mother && <p className="text-sm">&</p>}
                  {groom.parents.mother && <p className="font-light">{groom.parents.mother}</p>}
                </div>
              )}
              {groom.socialMedia?.instagram && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <Instagram className="h-4 w-4" />
                  <span className="text-sm">@{groom.socialMedia.instagram}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
} 