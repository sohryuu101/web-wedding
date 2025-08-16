import { Badge } from "@/components/ui/badge"
import { ThankYouSection } from "../sections/thank-you-section"
import { CoupleProfilesSection } from "../sections/couple-profiles-section"
import { LoveStorySection } from "../sections/love-story-section"
import { EventDetailsSection } from "../sections/event-details-section"
import { PhotoGallerySection } from "../sections/photo-gallery-section"
import { VideoGallerySection } from "../sections/video-gallery-section"
import { LiveStreamingSection } from "../sections/live-streaming-section"
import { RSVPSection } from "../sections/rsvp-section"
import { WeddingGiftSection } from "../sections/wedding-gift-section"
import { WeddingWishSection } from "../sections/wedding-wish-section"
import { FinalSection } from "../sections/final-section"
import { ModernEleganceHeroSection } from "../sections/modern-elegance-hero-section"
import { ModernEleganceGroomProfileSection } from "../sections/modern-elegance-groom-profile-section"

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

  // Transform RSVP data to match the main interface
  const handleRSVPFromSection = async (data: { name: string; message: string; attendance: "hadir" | "tidak_hadir"; totalGuests: number }) => {
    const transformedData: RSVPFormData = {
      guest_name: data.name,
      guest_email: undefined,
      guest_phone: undefined,
      attendance: data.attendance === "hadir" ? "yes" : "no",
      guest_count: data.totalGuests,
      dietary_requirements: undefined,
      message: data.message
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
          {/* Couple Profiles Section */}
          <CoupleProfilesSection
            bride={{
              name: invitation.bride_name,
              photo: invitation.bride_photo,
              parents: invitation.bride_parents || { father: '', mother: '' },
              socialMedia: invitation.bride_social_media,
              description: invitation.bride_description,
              gender: 'female'
            }}
            groom={{
              name: invitation.groom_name,
              photo: invitation.groom_photo,
              parents: invitation.groom_parents || { father: '', mother: '' },
              socialMedia: invitation.groom_social_media,
              description: invitation.groom_description,
              gender: 'male'
            }}
          />

          {/* Photo Gallery Section */}
          {invitation.photo_gallery && invitation.photo_gallery.length > 0 && (
            <PhotoGallerySection
              photos={invitation.photo_gallery}
              title="Our Gallery"
              subtitle="Our Engagement"
            />
          )}

          {/* Video Gallery Section */}
          {invitation.video_gallery && invitation.video_gallery.length > 0 && (
            <VideoGallerySection
              videos={invitation.video_gallery}
              title="Our Footage"
              subtitle="The Pre-Wedding"
            />
          )}

          {/* Event Details Section */}
          {invitation.event_details && (
            <EventDetailsSection
              eventDetails={invitation.event_details}
            />
          )}

          {/* Live Streaming Section */}
          {invitation.live_streaming && (
            <LiveStreamingSection
              title="Live Streaming"
              subtitle="Our Story"
              storyText={invitation.live_streaming.storyText}
              streamUrl={invitation.live_streaming.streamUrl}
              previewImage={invitation.live_streaming.previewImage}
              photoGallery={invitation.live_streaming.photoGallery}
            />
          )}

          {/* Wedding Gift Section */}
          <WeddingGiftSection
            title="Wedding Gift"
            message="Your blessing and coming to our wedding are enough for us. However, if you want to give a gift we provide a Digital Envelope to make it easier for you. thank you"
            bankAccounts={invitation.bank_accounts || [
              {
                bank: "BANK BCA",
                name: "Muhammad Fanny Al farizzy",
                number: "8375180797"
              }
            ]}
          />

          {/* Wedding Wish Section */}
          <WeddingWishSection
            title="Wedding Wish"
            wishes={invitation.wedding_wishes}
          />

          {/* Love Story Section */}
          {invitation.love_story && invitation.love_story.length > 0 && (
            <LoveStorySection
              milestones={invitation.love_story}
            />
          )}

          {/* RSVP Section */}
          <RSVPSection
            onRSVP={handleRSVPFromSection}
            existingMessages={[]}
          />

          {/* Thank You Section */}
          <ThankYouSection
            bridePhoto={invitation.bride_photo}
            groomPhoto={invitation.groom_photo}
            thankYouMessage={invitation.thank_you_message}
            coupleNames={`${invitation.bride_name} & ${invitation.groom_name}`}
          />

          {/* Final Section */}
          <FinalSection
            brideName={invitation.bride_name}
            groomName={invitation.groom_name}
            weddingDate={invitation.wedding_date}
            hashtag={invitation.hashtag || "#PromDatetoLifeMate"}
            poweredBy={invitation.powered_by || {
              name: "KATSUDOTO",
              logo: "🤍"
            }}
            backgroundImage={invitation.cover_image}
          />
        </div>
      </div>
    </div>
  )
}