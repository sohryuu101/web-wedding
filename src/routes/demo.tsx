import { createFileRoute } from '@tanstack/react-router'
import { WeddingInvitationTemplate, type RSVPFormData } from '@/components/wedding-invitation-template'
import { ModernEleganceTemplate } from '@/components/modern-elegance-template'
import { sampleWeddingData } from '@/components/sample-wedding-data'

export const Route = createFileRoute('/demo')({
  component: DemoPage,
})

function DemoPage() {
  const handleRSVP = async (rsvpData: RSVPFormData): Promise<void> => {
    // Simulate API call
    console.log('RSVP Data:', rsvpData)
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000)
    })
  }

  // If using the Modern Elegance theme, render split layout on desktop
  if (sampleWeddingData.theme?.toLowerCase().includes('modern elegance')) {
    return (
      <div className="min-h-screen">
        {/* Mobile: stack normally (<= md) */}
        <div className="md:hidden">
          <ModernEleganceTemplate
            invitation={sampleWeddingData}
            onRSVP={handleRSVP}
            isPreview={true}
          />
        </div>

        {/* Desktop: fixed left cover and scrolling right content */}
        <div className="hidden md:block">
          {/* Fixed left half with cover */}
          <div className="fixed inset-y-0 left-0 w-1/2">
            <ModernEleganceTemplate
              invitation={sampleWeddingData}
              onRSVP={handleRSVP}
              isPreview={true}
              onlyCover
            />
          </div>

          {/* Right half content with left margin to avoid overlap */}
          <div className="ml-[50vw]">
            <ModernEleganceTemplate
              invitation={sampleWeddingData}
              onRSVP={handleRSVP}
              isPreview={true}
              excludeCover
            />
          </div>
        </div>
      </div>
    )
  }

  // Fallback template retains original behavior
  return (
    <WeddingInvitationTemplate
      invitation={sampleWeddingData}
      onRSVP={handleRSVP}
      isPreview={true}
    />
  )
} 