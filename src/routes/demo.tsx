import { createFileRoute } from '@tanstack/react-router'
import { WeddingInvitationTemplate, type RSVPFormData } from '@/components/wedding-invitation-template'
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

  return (
    <WeddingInvitationTemplate
      invitation={sampleWeddingData}
      onRSVP={handleRSVP}
      isPreview={true}
    />
  )
} 