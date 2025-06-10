import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CoverSection } from "@/components/sections/cover-section"
import { ThemesSection } from "@/components/sections/themes-section"
import { BrideGroomSection } from "@/components/sections/bride-groom-section"
import { EventDetailsSection } from "@/components/sections/event-details-section"
import { QuotesSection } from "@/components/sections/quotes-section"
import { NotificationSection } from "@/components/sections/notification-section"
import { LoveStorySection } from "@/components/sections/love-story-section"
import { PhotoGallerySection } from "@/components/sections/photo-gallery-section"
import { VideoGallerySection } from "@/components/sections/video-gallery-section"
import { LiveStreamingSection } from "@/components/sections/live-streaming-section"
import { DigitalGiftSection } from "@/components/sections/digital-gift-section"
import { MusicSection } from "@/components/sections/music-section"
import { SidebarDashboard } from "@/components/sidebar-dashboard";
import { InvitationsDashboard } from "@/components/invitations-dashboard";


export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeSection, setActiveSection] = useState("cover")

  const renderSection = () => {
    switch (activeSection) {
      case "cover":
        return <CoverSection />
      default:
        return <CoverSection />
    }
  }

  
  return (
    <div className="min-h-screen bg-gray-50">
      
      <InvitationsDashboard />
    </div>
  )
}
