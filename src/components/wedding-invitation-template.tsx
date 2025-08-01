import { Heart, Calendar, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export interface InvitationData {
  id: number
  slug: string
  bride_name: string
  groom_name: string
  wedding_date: string
  venue?: string
  main_title: string
  subtitle: string
  message: string
  theme: string
  cover_image?: string
  is_published: boolean
  views: number
  rsvps: number
  created_at: string
  updated_at: string
}

interface WeddingInvitationTemplateProps {
  invitation: InvitationData
  onRSVP?: (rsvpData: RSVPFormData) => void
  isPreview?: boolean
}

export interface RSVPFormData {
  guest_name: string
  guest_email?: string
  guest_phone?: string
  attendance: 'yes' | 'no' | 'maybe'
  message?: string
}

const themeStyles = {
  "Rose Garden": {
    primary: "bg-gradient-to-br from-rose-100 to-pink-100",
    accent: "text-rose-600",
    button: "bg-rose-600 hover:bg-rose-700",
    border: "border-rose-200",
    card: "bg-white/80 backdrop-blur-sm",
  },
  "Ocean Breeze": {
    primary: "bg-gradient-to-br from-blue-100 to-cyan-100",
    accent: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    border: "border-blue-200",
    card: "bg-white/80 backdrop-blur-sm",
  },
  "Golden Sunset": {
    primary: "bg-gradient-to-br from-amber-100 to-orange-100",
    accent: "text-amber-600",
    button: "bg-amber-600 hover:bg-amber-700",
    border: "border-amber-200",
    card: "bg-white/80 backdrop-blur-sm",
  },
  "Forest Green": {
    primary: "bg-gradient-to-br from-green-100 to-emerald-100",
    accent: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
    border: "border-green-200",
    card: "bg-white/80 backdrop-blur-sm",
  },
  "Classic Elegance": {
    primary: "bg-gradient-to-br from-gray-100 to-slate-100",
    accent: "text-gray-600",
    button: "bg-gray-600 hover:bg-gray-700",
    border: "border-gray-200",
    card: "bg-white/80 backdrop-blur-sm",
  },
} as const

export function WeddingInvitationTemplate({ 
  invitation, 
  onRSVP, 
  isPreview = false 
}: WeddingInvitationTemplateProps) {
  const [showRSVP, setShowRSVP] = useState(false)
  const [rsvpForm, setRSVPForm] = useState<RSVPFormData>({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    attendance: "yes",
    message: "",
  })
  const [rsvpSubmitted, setRSVPSubmitted] = useState(false)

  const theme = themeStyles[invitation.theme as keyof typeof themeStyles] || themeStyles["Rose Garden"]
  const weddingDate = new Date(invitation.wedding_date)
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = weddingDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (onRSVP && !isPreview) {
      try {
        await onRSVP(rsvpForm)
        setRSVPSubmitted(true)
        setShowRSVP(false)
      } catch (error) {
        console.error('RSVP submission failed:', error)
      }
    } else if (isPreview) {
      // For preview mode, just show success
      setRSVPSubmitted(true)
      setShowRSVP(false)
    }
  }

  return (
    <div className={`min-h-screen ${theme.primary} flex items-center justify-center p-4`}>
      <div className="max-w-2xl w-full space-y-8">
        {/* Preview Badge */}
        {isPreview && (
          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              Preview Mode
            </Badge>
          </div>
        )}

        {/* Main Invitation Card */}
        <Card className={`${theme.card} ${theme.border} border-2 shadow-2xl overflow-hidden`}>
          {/* Cover Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={invitation.cover_image || "/placeholder.svg?height=300&width=600&text=Wedding+Cover"}
              alt="Wedding Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm opacity-90">You're Invited</p>
            </div>
          </div>

          <CardContent className="p-8 text-center space-y-6">
            {/* Main Title */}
            <div className="space-y-2">
              <h1 className={`text-4xl font-bold ${theme.accent}`}>
                {invitation.main_title}
              </h1>
              <p className="text-xl text-gray-600">
                {invitation.subtitle}
              </p>
            </div>

            {/* Couple Names */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {invitation.bride_name}
                  </h2>
                  <p className="text-sm text-gray-500">Bride</p>
                </div>
                <Heart className={`h-8 w-8 ${theme.accent}`} />
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {invitation.groom_name}
                  </h2>
                  <p className="text-sm text-gray-500">Groom</p>
                </div>
              </div>
            </div>

            {/* Wedding Details */}
            <div className={`${theme.card} rounded-lg p-6 space-y-4 ${theme.border} border`}>
              <div className="flex items-center justify-center space-x-2">
                <Calendar className={`h-5 w-5 ${theme.accent}`} />
                <div className="text-center">
                  <p className="font-semibold text-gray-800">{formattedDate}</p>
                  <p className="text-sm text-gray-600">{formattedTime}</p>
                </div>
              </div>

              {invitation.venue && (
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className={`h-5 w-5 ${theme.accent}`} />
                  <p className="text-gray-700">{invitation.venue}</p>
                </div>
              )}
            </div>

            {/* Personal Message */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                {invitation.message}
              </p>
            </div>

            {/* RSVP Section */}
            {!isPreview && !rsvpSubmitted && (
              <div className="space-y-4">
                {!showRSVP ? (
                  <Button 
                    onClick={() => setShowRSVP(true)}
                    className={`${theme.button} text-white px-8 py-3 text-lg`}
                  >
                    <Users className="h-5 w-5 mr-2" />
                    RSVP Now
                  </Button>
                ) : (
                  <Card className="text-left">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Please Confirm Your Attendance</h3>
                      <form onSubmit={handleRSVPSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            value={rsvpForm.guest_name}
                            onChange={(e) => setRSVPForm({...rsvpForm, guest_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            value={rsvpForm.guest_email}
                            onChange={(e) => setRSVPForm({...rsvpForm, guest_email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Phone</label>
                          <input
                            type="tel"
                            value={rsvpForm.guest_phone}
                            onChange={(e) => setRSVPForm({...rsvpForm, guest_phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            placeholder="Your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Will you attend? *</label>
                          <div className="space-y-2">
                            {[
                              { value: 'yes', label: '✅ Yes, I will be there!', color: 'text-green-600' },
                              { value: 'maybe', label: '🤔 Maybe, not sure yet', color: 'text-yellow-600' },
                              { value: 'no', label: '❌ Sorry, I cannot attend', color: 'text-red-600' },
                            ].map((option) => (
                              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="attendance"
                                  value={option.value}
                                  checked={rsvpForm.attendance === option.value}
                                  onChange={(e) => setRSVPForm({...rsvpForm, attendance: e.target.value as 'yes' | 'no' | 'maybe'})}
                                  className="w-4 h-4 text-rose-600"
                                />
                                <span className={option.color}>{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Message for the couple</label>
                          <textarea
                            value={rsvpForm.message}
                            onChange={(e) => setRSVPForm({...rsvpForm, message: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            rows={3}
                            placeholder="Share your wishes for the happy couple..."
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button type="submit" className={`${theme.button} text-white flex-1`}>
                            Submit RSVP
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setShowRSVP(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* RSVP Success Message */}
            {rsvpSubmitted && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="text-green-600 mb-2">
                    <Heart className="h-8 w-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Thank You for Your RSVP!
                  </h3>
                  <p className="text-green-700">
                    We've received your response and are excited to celebrate with you!
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Theme & Stats (Preview Mode) */}
            {isPreview && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-center space-x-6 text-sm text-gray-500">
                  <span>Theme: {invitation.theme}</span>
                  <span>Views: {invitation.views}</span>
                  <span>RSVPs: {invitation.rsvps}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Created with ❤️ for {invitation.bride_name} & {invitation.groom_name}</p>
        </div>
      </div>
    </div>
  )
} 