import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WeddingWish {
  id: string
  name: string
  message: string
  date: string
}

interface WeddingWishSectionProps {
  title?: string
  wishes?: WeddingWish[]
  onSendWish?: (wish: { name: string; message: string }) => void
  onDeleteWish?: (wishId: string) => void
}

export function WeddingWishSection({
  title = "Wedding Wish",
  wishes = [
    {
      id: "1",
      name: "Katsudoto",
      message: "May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, a touch or romance and a spoonful of understanding. May your joy last forever. Congratulation!",
      date: "10 Feb 2024, 18:00"
    },
    {
      id: "2", 
      name: "Zahwa & Partner",
      message: "cek",
      date: "02 Aug 2025, 13:30"
    },
    {
      id: "3",
      name: "Zahwa & Partner", 
      message: "cek",
      date: "15 May 2025, 18:59"
    }
  ],
  onSendWish,
  onDeleteWish
}: WeddingWishSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [wishForm, setWishForm] = useState({
    name: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setWishForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSendWish = () => {
    if (wishForm.name.trim() && wishForm.message.trim()) {
      onSendWish?.(wishForm)
      setWishForm({ name: '', message: '' })
    }
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
        style={{
          backgroundImage: `url('/placeholder.svg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            {title}
          </h2>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-2xl w-full space-y-8">
            {/* Wish Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-none p-6 border border-white/20">
                <textarea
                  name="message"
                  placeholder="Give your wish"
                  value={wishForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-transparent border-none text-white placeholder-white/60 font-light resize-none focus:outline-none"
                />
              </div>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={wishForm.name}
                  onChange={handleInputChange}
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/60 font-light"
                />
                <Button
                  onClick={handleSendWish}
                  className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border border-white/50 px-8 py-3 rounded-none font-light tracking-wider"
                  variant="outline"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </motion.div>

            {/* Wishes List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-none p-4 border border-white/20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-white font-light">
                      {wish.name}
                    </h4>
                    {onDeleteWish && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteWish(wish.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mb-2">
                    {wish.date}
                  </p>
                  <p className="text-white/90 font-light leading-relaxed">
                    {wish.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 