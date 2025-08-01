import { createFileRoute } from '@tanstack/react-router'
import { WeddingInvitationTemplate, type InvitationData } from '@/components/wedding-invitation-template'

// Sample invitation data
const sampleInvitation: InvitationData = {
  id: 1,
  slug: "sophia-james-wedding",
  bride_name: "Sophia",
  groom_name: "James",
  wedding_date: "2025-09-15T18:00:00Z",
  venue: "The Grand Ballroom, Four Seasons Hotel",
  main_title: "Save The Date",
  subtitle: "We are getting married!",
  message: "We are thrilled to share this special moment with you. Join us as we begin our journey together as husband and wife. Your presence would make our day even more perfect!",
  theme: "Rose Garden",
  cover_image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=300&fit=crop",
  is_published: true,
  views: 42,
  rsvps: 8,
  created_at: "2025-07-24T16:48:53Z",
  updated_at: "2025-07-24T16:48:53Z"
}

export const Route = createFileRoute('/demo')({
  component: DemoPage,
})

function DemoPage() {
  const handleRSVP = async (rsvpData: any) => {
    console.log('Demo RSVP submitted:', rsvpData)
    // In demo mode, we just log the data
  }

  return (
    <WeddingInvitationTemplate
      invitation={sampleInvitation}
      onRSVP={handleRSVP}
      isPreview={true}
    />
  )
} 