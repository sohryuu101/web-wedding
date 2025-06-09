import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";

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


export const Route = createFileRoute("/dashboard2")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeSection, setActiveSection] = useState("cover")

  const renderSection = () => {
    switch (activeSection) {
      case "cover":
        return <CoverSection />
      case "themes":
        return <ThemesSection />
      case "bride-groom":
        return <BrideGroomSection />
      case "event-details":
        return <EventDetailsSection />
      case "quotes":
        return <QuotesSection />
      case "notifications":
        return <NotificationSection />
      case "love-story":
        return <LoveStorySection />
      case "photo-gallery":
        return <PhotoGallerySection />
      case "video-gallery":
        return <VideoGallerySection />
      case "live-streaming":
        return <LiveStreamingSection />
      case "digital-gifts":
        return <DigitalGiftSection />
      case "music":
        return <MusicSection />
      default:
        return <CoverSection />
    }
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{renderSection()}</main>
      </div>
    </div>
  )
}
