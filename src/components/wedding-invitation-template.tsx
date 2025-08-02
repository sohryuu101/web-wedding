import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { HeroSection } from "./sections/hero-section"
import { ThankYouSection } from "./sections/thank-you-section"
import { CoupleProfilesSection } from "./sections/couple-profiles-section"
import { LoveStorySection } from "./sections/love-story-section"
import { EventDetailsSection } from "./sections/event-details-section"
import { PhotoGallerySection } from "./sections/photo-gallery-section"
import { RSVPSection } from "./sections/rsvp-section"
import { WeddingGiftSection } from "./sections/wedding-gift-section"

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
    date: string
    time: string
    venue: string
    address: string
    google_maps_url?: string
    dress_code?: string
    additional_info?: string
  }
  photo_gallery?: Array<{
    id: string
    src: string
    alt: string
    caption?: string
  }>
  thank_you_message?: string
  digital_wallets?: Array<{
    name: string
    account_number: string
    account_name: string
    qr_code?: string
  }>
  bank_accounts?: Array<{
    name: string
    account_number: string
    account_name: string
    qr_code?: string
  }>
  contact_info?: {
    name: string
    phone?: string
    email?: string
  }
}

interface WeddingInvitationTemplateProps {
  invitation: InvitationData
  onRSVP?: (rsvpData: RSVPFormData) => void
  isPreview?: boolean
  guestName?: string
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

export function WeddingInvitationTemplate({ 
  invitation, 
  onRSVP, 
  isPreview = false,
  guestName = "Nama Tamu"
}: WeddingInvitationTemplateProps) {
  const [showRSVP, setShowRSVP] = useState(false)
  const [rsvpSubmitted, setRSVPSubmitted] = useState(false)

  const handleRSVP = async (rsvpData: RSVPFormData) => {
    if (onRSVP && !isPreview) {
      try {
        await onRSVP(rsvpData)
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

  const handleRSVPSection = async (rsvpData: { guestName: string; guestEmail?: string; guestPhone?: string; attendance: 'yes' | 'no' | 'maybe'; guestCount: number; dietaryRequirements?: string; message?: string }) => {
    // Transform the RSVP data to match the expected format
    const transformedData: RSVPFormData = {
      guest_name: rsvpData.guestName,
      guest_email: rsvpData.guestEmail,
      guest_phone: rsvpData.guestPhone,
      attendance: rsvpData.attendance,
      guest_count: rsvpData.guestCount,
      dietary_requirements: rsvpData.dietaryRequirements,
      message: rsvpData.message
    }
    await handleRSVP(transformedData)
  }

  const handleOpenInvitation = () => {
    // Scroll to the couple profiles section
    const coupleSection = document.querySelector('section:nth-of-type(2)')
    if (coupleSection) {
      coupleSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Preview Badge */}
      {isPreview && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Badge variant="outline" className="text-sm bg-white/90 backdrop-blur-sm">
            Preview Mode
          </Badge>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection
        brideName={invitation.bride_name}
        groomName={invitation.groom_name}
        weddingDate={invitation.wedding_date}
        venue={invitation.venue}
        coverImage={invitation.cover_image}
        islamicVerse={invitation.islamic_verse}
        mainTitle={invitation.main_title}
        subtitle={invitation.subtitle}
        guestName={guestName}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Couple Profiles Section */}
      <CoupleProfilesSection
        bride={{
          name: invitation.bride_name,
          photo: invitation.bride_photo,
          parents: invitation.bride_parents || { father: '', mother: '' },
          socialMedia: invitation.bride_social_media,
          description: invitation.bride_description,
          birthOrder: invitation.bride_birth_order || 'first',
          gender: 'female'
        }}
        groom={{
          name: invitation.groom_name,
          photo: invitation.groom_photo,
          parents: invitation.groom_parents || { father: '', mother: '' },
          socialMedia: invitation.groom_social_media,
          description: invitation.groom_description,
          birthOrder: invitation.groom_birth_order || 'first',
          gender: 'male'
        }}
      />

      {/* Love Story Section */}
      <LoveStorySection
        milestones={invitation.love_story || [
          {
            id: "1",
            date: "2019-10-13",
            title: "First Meeting",
            description: "The beginning of our story with a random Tinder match. Calvin messaged first with a flower emoji, leading to a flowing conversation where they felt like they had known each other forever.",
            location: "Jakarta, Indonesia"
          },
          {
            id: "2",
            date: "2019-11-16",
            title: "First Movie Date",
            description: "Our first movie date, highlighting the quiet magic of being together as more significant than the movie itself.",
            location: "Jakarta, Indonesia"
          },
          {
            id: "3",
            date: "2019-12-30",
            title: "Concert Date",
            description: "A concert date where we found our rhythm, danced, laughed, and sang, marking it as the start of something special.",
            location: "Jakarta, Indonesia"
          },
          {
            id: "4",
            date: "2025-06-21",
            title: "Forever",
            description: "We will begin a new chapter as husband and wife. We acknowledge the challenges ahead (uphill climbs and valleys) but emphasize that no journey will ever be too difficult to take as long as we hold each other's hand. This is our story - A love that will last forever.",
            location: "Jakarta, Indonesia"
          }
        ]}
      />

      {/* Event Details Section */}
      <EventDetailsSection
        eventDetails={invitation.event_details || {
          date: "2025-07-05",
          time: "16:00",
          venue: "New Batavia Cafe",
          address: "Taman Fatahillah No.3, RW.7, Pinangsia, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11110",
          google_maps_url: "https://maps.google.com/?q=New+Batavia+Cafe+Kota+Tua",
          dress_code: "Formal / Semi-Formal",
          additional_info: "Please arrive 30 minutes before the ceremony. Parking is available at the venue."
        }}
        onRSVP={() => setShowRSVP(true)}
        rsvpButtonText="RSVP Now"
      />

      {/* Photo Gallery Section */}
      <PhotoGallerySection
        photos={invitation.photo_gallery || [
          {
            id: "1",
            src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Engagement Photo 1",
            caption: "Our engagement shoot at Taman Suropati"
          },
          {
            id: "2",
            src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Engagement Photo 2",
            caption: "Sunset at Ancol Beach"
          },
          {
            id: "3",
            src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Engagement Photo 3",
            caption: "Romantic dinner at Skye Bar"
          },
          {
            id: "4",
            src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Bride Portrait",
            caption: "Nabila's bridal portrait"
          },
          {
            id: "5",
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Groom Portrait",
            caption: "Calvin's groom portrait"
          },
          {
            id: "6",
            src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            alt: "Couple Photo",
            caption: "Together forever"
          }
        ]}
      />

      {/* RSVP Section */}
      {!isPreview && !rsvpSubmitted && showRSVP && (
        <RSVPSection
          onRSVP={handleRSVPSection}
        />
      )}

      {/* Wedding Gift Section */}
      <WeddingGiftSection
        digitalWallets={invitation.digital_wallets?.map(wallet => ({
          name: wallet.name,
          accountNumber: wallet.account_number,
          accountName: wallet.account_name,
          qrCode: wallet.qr_code
        })) || [
          {
            name: "GoPay",
            accountNumber: "081234567890",
            accountName: "Nabila Khansa Pranajaya"
          },
          {
            name: "OVO",
            accountNumber: "081234567890",
            accountName: "Calvin Rahmat Prabowo Nugroho"
          },
          {
            name: "DANA",
            accountNumber: "081234567890",
            accountName: "Nabila Khansa Pranajaya"
          }
        ]}
        bankAccounts={invitation.bank_accounts?.map(account => ({
          name: account.name,
          accountNumber: account.account_number,
          accountName: account.account_name,
          qrCode: account.qr_code
        })) || [
          {
            name: "BCA",
            accountNumber: "1234567890",
            accountName: "Nabila Khansa Pranajaya"
          },
          {
            name: "Mandiri",
            accountNumber: "0987654321",
            accountName: "Calvin Rahmat Prabowo Nugroho"
          }
        ]}
        contactInfo={invitation.contact_info || {
          name: "Wedding Organizer",
          phone: "+62 812-3456-7890",
          email: "wedding@calvin-nabila.com"
        }}
      />

      {/* Thank You Section */}
      <ThankYouSection
        bridePhoto={invitation.bride_photo}
        groomPhoto={invitation.groom_photo}
        thankYouMessage={invitation.thank_you_message}
        coupleNames={`${invitation.bride_name} & ${invitation.groom_name}`}
      />

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-gray-400">
            Created with ❤️ for {invitation.bride_name} & {invitation.groom_name}
          </p>
          {isPreview && (
            <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-500">
              <span>Theme: {invitation.theme}</span>
              <span>Views: {invitation.views}</span>
              <span>RSVPs: {invitation.rsvps}</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
} 