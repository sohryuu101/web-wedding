import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Check, X, Minus, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

interface RSVPFormData {
  name: string
  message: string
  attendance: "hadir" | "tidak_hadir"
  totalGuests: number
}

interface GuestMessage {
  name: string
  message: string
  attendance: "hadir" | "tidak_hadir"
  totalGuests: number
  date: string
}

interface RSVPSectionProps {
  onRSVP: (data: RSVPFormData) => Promise<void>
  title?: string
  subtitle?: string
  existingMessages: GuestMessage[]
}

export function RSVPSection({ 
  onRSVP, 
  title = "KONFIRMASI KEHADIRAN",
  subtitle = "Berikan Do'a & Ucapan kepada Kedua Mempelai",
  existingMessages = []
}: RSVPSectionProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir">("hadir")
  const [totalGuests, setTotalGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onRSVP?.({
        name,
        message,
        attendance,
        totalGuests
      })

      // Reset form
      setName("")
      setMessage("")
      setAttendance("hadir")
      setTotalGuests(1)
    } catch (error) {
      console.error("RSVP submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
              {title}
            </h2>
            <Heart className="h-6 w-6 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Konfirmasi Kehadiran</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={attendance === "hadir" ? "default" : "outline"}
                  className={attendance === "hadir" ? "bg-pink-600 hover:bg-pink-700" : ""}
                  onClick={() => setAttendance("hadir")}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Hadir
                </Button>
                <Button
                  type="button"
                  variant={attendance === "tidak_hadir" ? "default" : "outline"}
                  className={attendance === "tidak_hadir" ? "bg-gray-600 hover:bg-gray-700" : ""}
                  onClick={() => setAttendance("tidak_hadir")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Tidak Hadir
                </Button>
              </div>
            </div>

            {attendance === "hadir" && (
              <div className="space-y-2">
                <Label htmlFor="totalGuests">Jumlah Tamu</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTotalGuests(Math.max(1, totalGuests - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{totalGuests}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setTotalGuests(Math.min(10, totalGuests + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Maksimal 10 orang</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Ucapan & Do'a</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ucapan dan do'a Anda untuk kedua mempelai"
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Ucapan"
              )}
            </Button>
          </form>
        </motion.div>

        {/* Existing Messages */}
        {existingMessages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Ucapan & Do'a
            </h3>
            <div className="space-y-6">
              {existingMessages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{msg.name}</h4>
                      <p className="text-sm text-gray-500">
                        {msg.attendance === "hadir" ? (
                          <>
                            <Check className="inline-block h-4 w-4 text-green-500 mr-1" />
                            Hadir ({msg.totalGuests} orang)
                          </>
                        ) : (
                          <>
                            <X className="inline-block h-4 w-4 text-red-500 mr-1" />
                            Tidak Hadir
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{msg.date}</p>
                  </div>
                  <p className="text-gray-600">{msg.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 