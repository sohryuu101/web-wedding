import { Badge } from "@/components/ui/badge"
import { EventDetailsSection } from "../sections/event-details-section"
import { ModernEleganceRSVP } from "../sections/modern-elegance-rsvp"
import { ModernEleganceHeroSection } from "../sections/modern-elegance-hero-section"
import { ModernEleganceGroomProfileSection } from "../sections/modern-elegance-groom-profile-section"
import { ModernEleganceBrideProfileSection } from "../sections/modern-elegance-bride-profile-section"
import { ModernEleganceOurJourneySection } from "../sections/modern-elegance-our-journey"
import { DateCountdown } from "../sections/modern-elegance-date-countdown"
import { ReceptionSection } from "../sections/modern-elegance-reception"

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
  // Extended fields for new sections
  bride_photo?: string
  groom_photo?: string
  bride_parents?: {
    father: string
    mother: string
  }
  groom_parents?: {
    father: string
    mother: string
  }
  bride_social_media?: {
    instagram?: string
  }
  groom_social_media?: {
    instagram?: string
  }
  bride_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth'
  groom_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth'
  bride_description?: string
  groom_description?: string
  islamic_verse?: string
  love_story?: Array<{
    id: string
    date: string
    title: string
    description: string
    location?: string
    image?: string
  }>
  event_details?: {
    akadNikah: {
      date: string
      time: string
      venue: string
      address: string
      googleMapsUrl?: string
    }
    resepsi: {
      date: string
      time: string
      venue: string
      address: string
      googleMapsUrl?: string
    }
  }
  photo_gallery?: Array<{
    id: string
    src: string
    alt: string
    caption?: string
  }>
  video_gallery?: Array<{
    id: string
    title: string
    thumbnail: string
    videoUrl: string
    description?: string
  }>
  live_streaming?: {
    streamUrl?: string
    previewImage?: string
    storyText?: string
    photoGallery?: Array<{
      src: string
      alt: string
    }>
  }
  thank_you_message?: string
  digital_wallets?: Array<{
    name: string
    number: string
  }>
  bank_accounts?: Array<{
    bank: string
    name: string
    number: string
  }>
  contact_info?: {
    name: string
    phone?: string
    email?: string
  }
  wedding_wishes?: Array<{
    id: string
    name: string
    message: string
    date: string
  }>
  hashtag?: string
  powered_by?: {
    name: string
    logo?: string
  }
}

interface WeddingInvitationTemplateProps {
  invitation: InvitationData
  onRSVP?: (rsvpData: RSVPFormData) => Promise<void>
  isPreview?: boolean
}

export interface RSVPFormData {
  guest_name: string
  guest_email?: string
  guest_phone?: string
  attendance: 'yes' | 'no' | 'maybe'
  guest_count?: number
  dietary_requirements?: string
  message?: string
}

export function ModernEleganceTemplate({ 
  invitation, 
  onRSVP, 
  isPreview = false
}: WeddingInvitationTemplateProps) {
  
  const handleRSVP = async (rsvpData: RSVPFormData) => {
    if (onRSVP && !isPreview) {
      try {
        await onRSVP(rsvpData)
      } catch (error) {
        console.error('RSVP submission failed:', error)
      }
    }
  }

  // Transform RSVP data from modern elegance component
  const handleModernEleganceRSVP = async (data: { name: string; attendance: "yes" | "no"; guestCount: number }) => {
    const transformedData: RSVPFormData = {
      guest_name: data.name,
      guest_email: undefined,
      guest_phone: undefined,
      attendance: data.attendance === "yes" ? "yes" : "no",
      guest_count: data.guestCount,
      dietary_requirements: undefined,
      message: undefined
    }
    await handleRSVP(transformedData)
  }

  return (
    <div className="relative min-h-screen">
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Luxurious+Script:wght@400&display=swap');
      `}</style>

      {/* Preview Badge */}
      {isPreview && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Badge variant="outline" className="text-sm bg-white/90 backdrop-blur-sm">
            Modern Elegance - Preview Mode
          </Badge>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Fixed Background Hero Section - 2/3 width */}
        <div className="fixed inset-0 w-2/3 h-full">
          <ModernEleganceHeroSection
            brideName={invitation.bride_name}
            groomName={invitation.groom_name}
            weddingDate={invitation.wedding_date}
            venue={invitation.venue}
          />
        </div>

        {/* Scrollable Content Container - 1/3 width on the right */}
        <div className="ml-auto w-1/3 relative z-10 min-h-screen overflow-y-auto">
          {/* Groom Profile Section - First section */}
          <div className="relative bg-white">
            <ModernEleganceGroomProfileSection
              name={invitation.groom_name}
              photo={invitation.groom_photo}
              parents={invitation.groom_parents || { father: '', mother: '' }}
              socialMedia={invitation.groom_social_media}
              birthOrder={invitation.groom_birth_order}
            />
          </div>

          {/* All other sections in scrollable container */}
          <div className="relative bg-white">
            {/* Bride Profile Section */}
            <ModernEleganceBrideProfileSection
              name={invitation.bride_name}
              photo={invitation.bride_photo}
              parents={invitation.bride_parents || { father: '', mother: '' }}
              socialMedia={invitation.bride_social_media}
              birthOrder={invitation.bride_birth_order}
            />

            {/* Our Journey Section */}
            <ModernEleganceOurJourneySection />

            {/* Reception Section */}
            <ReceptionSection />

            {/* Date Countdown Section */}
            <div className="relative bg-white">
              <DateCountdown weddingDate={invitation.wedding_date} />
            </div>

            {/* Event Details Section */}
            {invitation.event_details && (
              <EventDetailsSection
                eventDetails={invitation.event_details}
              />
            )}

            {/* Modern Elegance RSVP Section */}
            <ModernEleganceRSVP
              onRSVP={handleModernEleganceRSVP}
              weddingDate={invitation.wedding_date}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Hero Section at the top on mobile */}
        <div className="relative">
          <ModernEleganceHeroSection
            brideName={invitation.bride_name}
            groomName={invitation.groom_name}
            weddingDate={invitation.wedding_date}
            venue={invitation.venue}
          />
        </div>

        {/* All other sections stacked vertically */}
        <div className="relative bg-white">
          {/* Groom Profile Section */}
          <ModernEleganceGroomProfileSection
            name={invitation.groom_name}
            photo={invitation.groom_photo}
            parents={invitation.groom_parents || { father: '', mother: '' }}
            socialMedia={invitation.groom_social_media}
            birthOrder={invitation.groom_birth_order}
          />

          {/* Bride Profile Section */}
          <ModernEleganceBrideProfileSection
            name={invitation.bride_name}
            photo={invitation.bride_photo}
            parents={invitation.bride_parents || { father: '', mother: '' }}
            socialMedia={invitation.bride_social_media}
            birthOrder={invitation.bride_birth_order}
          />

          {/* Our Journey Section */}
          <ModernEleganceOurJourneySection />

          {/* Reception Section */}
          <ReceptionSection />

          {/* Date Countdown Section */}
          <div className="relative bg-white">
            <DateCountdown weddingDate={invitation.wedding_date} />
          </div>

          {/* Event Details Section */}
          {invitation.event_details && (
            <EventDetailsSection
              eventDetails={invitation.event_details}
            />
          )}

          {/* Modern Elegance RSVP Section */}
          <ModernEleganceRSVP
            onRSVP={handleModernEleganceRSVP}
            weddingDate={invitation.wedding_date}
          />
        </div>
      </div>
    </div>
  )
}
