import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Utensils, MessageSquare, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface RSVPFormData {
  guestName: string
  guestEmail?: string
  guestPhone?: string
  attendance: 'yes' | 'no' | 'maybe'
  guestCount: number
  dietaryRequirements?: string
  message?: string
}

interface GuestMessage {
  id: string
  name: string
  message: string
  timestamp: string
  avatar: string
}

interface RSVPSectionProps {
  onRSVP: (data: RSVPFormData) => Promise<void>
  title?: string
  subtitle?: string
  existingMessages?: GuestMessage[]
}

export function RSVPSection({ 
  onRSVP, 
  title = "RESERVATION",
  subtitle = "Berikan Do'a & Ucapan kepada Kedua Mempelai",
  existingMessages = []
}: RSVPSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState<RSVPFormData>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    attendance: 'yes',
    guestCount: 1,
    dietaryRequirements: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onRSVP(formData)
      setIsSubmitted(true)
    } catch {
      setError('Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof RSVPFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isSubmitted) {
    return (
      <section ref={ref} className="py-20 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-2xl shadow-xl p-12 border border-gray-700"
          >
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              We've received your RSVP and are excited to celebrate with you!
            </p>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-green-400 font-medium">
                {formData.guestName} - {formData.attendance === 'yes' ? 'Will Attend' : formData.attendance === 'maybe' ? 'Maybe' : 'Cannot Attend'}
              </p>
              {formData.attendance === 'yes' && formData.guestCount > 1 && (
                <p className="text-green-300 text-sm mt-1">
                  {formData.guestCount} guests total
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
              {title}
            </h2>
            <Heart className="h-6 w-6 text-pink-500" />
          </div>
          <p className="text-lg text-gray-300">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
            {/* Message Count Header */}
            <div className="flex items-center space-x-2 mb-6 p-4 bg-gray-700 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
              <span className="text-white font-medium">
                {existingMessages.length} Ucapan
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* RSVP Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Name */}
                  <div>
                    <Label htmlFor="guestName" className="text-gray-300 font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="guestName"
                      type="text"
                      required
                      value={formData.guestName}
                      onChange={(e) => handleInputChange('guestName', e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guestEmail" className="text-gray-300 font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={formData.guestEmail}
                        onChange={(e) => handleInputChange('guestEmail', e.target.value)}
                        placeholder="your@email.com"
                        className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestPhone" className="text-gray-300 font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="guestPhone"
                        type="tel"
                        value={formData.guestPhone}
                        onChange={(e) => handleInputChange('guestPhone', e.target.value)}
                        placeholder="Your phone number"
                        className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Attendance */}
                  <div>
                    <Label className="text-gray-300 font-medium mb-3 block">
                      Konfirmasi Kehadiran *
                    </Label>
                    <Select
                      value={formData.attendance}
                      onValueChange={(value) => handleInputChange('attendance', value as 'yes' | 'no' | 'maybe')}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="yes" className="text-white">✅ Ya, saya akan hadir</SelectItem>
                        <SelectItem value="maybe" className="text-white">🤔 Mungkin, belum pasti</SelectItem>
                        <SelectItem value="no" className="text-white">❌ Maaf, tidak bisa hadir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guest Count (only if attending) */}
                  {formData.attendance === 'yes' && (
                    <div>
                      <Label htmlFor="guestCount" className="text-gray-300 font-medium">
                        Number of Guests *
                      </Label>
                      <Select
                        value={formData.guestCount.toString()}
                        onValueChange={(value) => handleInputChange('guestCount', parseInt(value))}
                      >
                        <SelectTrigger className="mt-2 bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          {[1, 2, 3, 4, 5, 6].map((count) => (
                            <SelectItem key={count} value={count.toString()} className="text-white">
                              {count} {count === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Dietary Requirements */}
                  {formData.attendance === 'yes' && (
                    <div>
                      <Label htmlFor="dietaryRequirements" className="text-gray-300 font-medium">
                        <Utensils className="h-4 w-4 inline mr-2" />
                        Special Dietary Requirements
                      </Label>
                      <Textarea
                        id="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={(e) => handleInputChange('dietaryRequirements', e.target.value)}
                        placeholder="Any allergies, dietary restrictions, or special requests..."
                        className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        rows={3}
                      />
                    </div>
                  )}

                  {/* Personal Message */}
                  <div>
                    <Label htmlFor="message" className="text-gray-300 font-medium">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Tulis ucapan
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Share your wishes, memories, or any special message..."
                      className="mt-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      rows={4}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center space-x-2 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="text-red-300">{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>Kirim</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>

              {/* Guest Messages */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Guest Messages</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {existingMessages.map((message) => (
                    <div key={message.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {message.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-white font-medium">{message.name}</span>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                          <p className="text-gray-500 text-xs">{message.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {existingMessages.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No messages yet. Be the first to leave a message!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 