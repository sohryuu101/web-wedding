import { createFileRoute } from '@tanstack/react-router'
import { WeddingInvitationTemplate } from '@/components/wedding-invitation-template'
import type { InvitationData } from '@/components/wedding-invitation-template'

const sampleInvitation: InvitationData = {
  id: 1,
  slug: "sample-wedding",
  bride_name: "Sarah Johnson",
  groom_name: "John Smith",
  wedding_date: "2024-06-15",
  venue: "Grand Oak Gardens",
  main_title: "Save The Date",
  subtitle: "We're Getting Married!",
  message: "Join us for our special day...",
  theme: "Modern Elegance",
  cover_image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  is_published: true,
  views: 100,
  rsvps: 25,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  bride_photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  bride_parents: {
    father: "Robert Johnson",
    mother: "Jennifer Johnson"
  },
  groom_parents: {
    father: "Michael Smith",
    mother: "Patricia Smith"
  },
  bride_social_media: {
    instagram: "@sarahj"
  },
  groom_social_media: {
    instagram: "@johns"
  },
  bride_birth_order: "first",
  groom_birth_order: "first",
  bride_description: "A kind-hearted person who loves to travel and explore new cultures.",
  groom_description: "An adventurous soul with a passion for photography and outdoor activities.",
  love_story: [
    {
      id: "1",
      date: "2018-05-20",
      title: "First Meeting",
      description: "We met at a coffee shop downtown and instantly connected over our shared love for travel.",
      location: "Downtown Coffee Shop",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2",
      date: "2020-09-15",
      title: "First Date",
      description: "Our first official date was a picnic in the park, and it was perfect.",
      location: "Central Park",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      date: "2023-12-25",
      title: "Engagement",
      description: "John proposed to Sarah during a romantic getaway to the mountains.",
      location: "Mountain Resort",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  event_details: {
    akadNikah: {
      date: "2024-06-15",
      time: "10:00",
      venue: "Grand Oak Gardens",
      address: "123 Wedding Lane, Bridgetown",
      googleMapsUrl: "https://maps.google.com"
    },
    resepsi: {
      date: "2024-06-15",
      time: "14:00",
      venue: "Grand Oak Gardens",
      address: "123 Wedding Lane, Bridgetown",
      googleMapsUrl: "https://maps.google.com"
    }
  },
  photo_gallery: [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Engagement Photo 1",
      caption: "Our engagement day"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Engagement Photo 2",
      caption: "Adventure together"
    }
  ],
  video_gallery: [
    {
      id: "1",
      title: "Our Proposal Story",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      videoUrl: "#",
      description: "The special moment when John proposed to Sarah"
    }
  ],
  live_streaming: {
    streamUrl: "#",
    previewImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    storyText: "We're excited to share our special day with you through live streaming for those who can't be with us in person.",
    photoGallery: [
      {
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Preview"
      }
    ]
  },
  thank_you_message: "Thank you for being part of our special day!",
  digital_wallets: [
    {
      name: "OVO",
      number: "08123456789"
    }
  ],
  bank_accounts: [
    {
      bank: "BANK BCA",
      name: "Sarah Johnson",
      number: "1234567890"
    }
  ],
  contact_info: {
    name: "Sarah Johnson",
    phone: "+1234567890",
    email: "sarah@example.com"
  },
  wedding_wishes: [
    {
      id: "1",
      name: "Alice Brown",
      message: "Wishing you both a lifetime of love and happiness!",
      date: "2024-05-01"
    }
  ],
  hashtag: "#SarahAndJohn2024",
  powered_by: {
    name: "WeddingPlanner",
    logo: "🤍"
  }
}

export const Route = createFileRoute('/invitation/template')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background">
      <WeddingInvitationTemplate 
        invitation={sampleInvitation} 
        isPreview={true}
      />
    </div>
  )
}
