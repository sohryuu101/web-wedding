import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    first: gender === 'male' ? 'Putra Pertama' : 'Putri Pertama',
    second: gender === 'male' ? 'Putra Kedua' : 'Putri Kedua',
    third: gender === 'male' ? 'Putra Ketiga' : 'Putri Ketiga',
    fourth: gender === 'male' ? 'Putra Keempat' : 'Putri Keempat',
    fifth: gender === 'male' ? 'Putra Kelima' : 'Putri Kelima'
  }
  return orderMap[order as keyof typeof orderMap] || ''
}

export function CoupleProfilesSection({ bride, groom }: CoupleProfilesSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              Meet the Couple
            </h2>
            <Crown className="h-6 w-6 text-yellow-400" />
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Two hearts, one love story
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              {/* Photo Section */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={bride.photo || '/placeholder.svg'}
                  alt={`${bride.name} - Bride`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Bride
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 bg-gray-800">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {bride.name}
                  </h3>
                  {bride.birthOrder && (
                    <p className="text-sm text-gray-400 mb-2">
                      {getBirthOrderText(bride.birthOrder, bride.gender)} dari
                    </p>
                  )}
                  {(bride.parents.father || bride.parents.mother) && (
                    <div className="text-gray-300">
                      {bride.parents.father && <p className="font-medium">{bride.parents.father}</p>}
                      {bride.parents.father && bride.parents.mother && <p className="text-sm">&</p>}
                      {bride.parents.mother && <p className="font-medium">{bride.parents.mother}</p>}
                    </div>
                  )}
                </div>

                {bride.description && (
                  <p className="text-gray-400 text-center mb-6 leading-relaxed">
                    {bride.description}
                  </p>
                )}

                {bride.socialMedia?.instagram && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://instagram.com/${bride.socialMedia!.instagram}`, '_blank')}
                      className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white"
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      {bride.socialMedia!.instagram}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
              {/* Photo Section */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={groom.photo || '/placeholder.svg'}
                  alt={`${groom.name} - Groom`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Groom
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 bg-gray-800">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {groom.name}
                  </h3>
                  {groom.birthOrder && (
                    <p className="text-sm text-gray-400 mb-2">
                      {getBirthOrderText(groom.birthOrder, groom.gender)} dari
                    </p>
                  )}
                  {(groom.parents.father || groom.parents.mother) && (
                    <div className="text-gray-300">
                      {groom.parents.father && <p className="font-medium">{groom.parents.father}</p>}
                      {groom.parents.father && groom.parents.mother && <p className="text-sm">&</p>}
                      {groom.parents.mother && <p className="font-medium">{groom.parents.mother}</p>}
                    </div>
                  )}
                </div>

                {groom.description && (
                  <p className="text-gray-400 text-center mb-6 leading-relaxed">
                    {groom.description}
                  </p>
                )}

                {groom.socialMedia?.instagram && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://instagram.com/${groom.socialMedia!.instagram}`, '_blank')}
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      {groom.socialMedia!.instagram}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connecting Hearts */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
        
        </motion.div>
      </div>
    </section>
  )
} 