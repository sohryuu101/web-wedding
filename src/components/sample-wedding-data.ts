import { InvitationData } from './wedding-invitation-template'

export const sampleWeddingData: InvitationData = {
  id: 1,
  slug: "calvin-nabila-wedding",
  bride_name: "Nabila Khansa Pranajaya",
  groom_name: "Calvin Rahmat Prabowo Nugroho",
  wedding_date: "2025-07-05T16:00:00",
  venue: "New Batavia Cafe, Kota Tua",
  main_title: "THE WEDDING OF",
  subtitle: "Calvin & Nabila",
  message: "We are delighted to invite you to celebrate our special day with us. Your presence would mean the world to us as we begin this beautiful journey together.",
  theme: "Rose Garden",
  cover_image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  is_published: true,
  views: 1250,
  rsvps: 89,
  created_at: "2024-01-15T10:00:00",
  updated_at: "2024-11-01T15:30:00",
  
  // Bride and Groom Photos
  bride_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  groom_photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  
  // Parents Information
  bride_parents: {
    father: "Bapak Denie Fajar Pranajaya",
    mother: "Ibu IYos Mina Farlina"
  },
  groom_parents: {
    father: "Bapak Hartono",
    mother: "Ibu Daryani Tri Ratna Ningtyas"
  },
  
  // Social Media
  bride_social_media: {
    instagram: "Nabila"
  },
  groom_social_media: {
    instagram: "Calvin"
  },
  
  // Birth Order
  bride_birth_order: "first",
  groom_birth_order: "first",
  
  // Descriptions
  bride_description: "A compassionate soul who loves to help others. She graduated from Universitas Indonesia with a degree in Psychology and works as a counselor.",
  groom_description: "A dedicated professional with a heart of gold. He completed his MBA from Institut Teknologi Bandung and works in sustainable development.",
  
  // Islamic Verse
  islamic_verse: "Hai manusia, bertakwalah kepada Tuhan-mu Yang menciptakan kamu dari satu jiwa dan darinya Dia menciptakan jodohnya, dan mengembang-biakan dari keduanya banyak laki-laki dan perempuan; dan bertakwalah kepada Allah SWT yang dengan nama-Nya kamu saling bertanya, terutama mengenai hubungan tali kekerabatan. Sesungguhnya Allah SWT adalah pengawas atas kamu. (QS An-Nisa: 1)",
  
  // Love Story
  love_story: [
    {
      id: "1",
      date: "2019-10-13",
      title: "First Meeting",
      description: "The beginning of our story with a random Tinder match. Calvin messaged first with a flower emoji, leading to a flowing conversation where they felt like they had known each other forever.",
      location: "Jakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2",
      date: "2019-11-16",
      title: "First Movie Date",
      description: "Our first movie date, highlighting the quiet magic of being together as more significant than the movie itself.",
      location: "Jakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      date: "2019-12-30",
      title: "Concert Date",
      description: "A concert date where we found our rhythm, danced, laughed, and sang, marking it as the start of something special.",
      location: "Jakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "4",
      date: "2025-06-21",
      title: "Forever",
      description: "We will begin a new chapter as husband and wife. We acknowledge the challenges ahead (uphill climbs and valleys) but emphasize that no journey will ever be too difficult to take as long as we hold each other's hand. This is our story - A love that will last forever.",
      location: "Jakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],
  
  // Event Details
  event_details: {
    date: "2025-07-05",
    time: "16:00",
    venue: "New Batavia Cafe",
    address: "Taman Fatahillah No.3, RW.7, Pinangsia, Kec. Taman Sari, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11110",
    google_maps_url: "https://maps.google.com/?q=New+Batavia+Cafe+Kota+Tua",
    dress_code: "Formal / Semi-Formal",
    additional_info: "Please arrive 30 minutes before the ceremony. Parking is available at the venue."
  },
  
  // Photo Gallery
  photo_gallery: [
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
  ],
  
  // Thank You Message
  thank_you_message: "Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kami.",
  
  // Digital Wallets
  digital_wallets: [
    {
      name: "GoPay",
      account_number: "081234567890",
      account_name: "Nabila Khansa Pranajaya"
    },
    {
      name: "OVO",
      account_number: "081234567890",
      account_name: "Calvin Rahmat Prabowo Nugroho"
    },
    {
      name: "DANA",
      account_number: "081234567890",
      account_name: "Nabila Khansa Pranajaya"
    }
  ],
  
  // Bank Accounts
  bank_accounts: [
    {
      name: "BCA",
      account_number: "1234567890",
      account_name: "Nabila Khansa Pranajaya"
    },
    {
      name: "Mandiri",
      account_number: "0987654321",
      account_name: "Calvin Rahmat Prabowo Nugroho"
    }
  ],
  
  // Contact Information
  contact_info: {
    name: "Wedding Organizer",
    phone: "+62 812-3456-7890",
    email: "wedding@calvin-nabila.com"
  }
} 