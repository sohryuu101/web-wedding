import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { TemplateSelector } from '@/components/template-selector'
import { apiClient } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import type { RSVPFormData } from '@/components/wedding-invitation-template'

export const Route = createFileRoute('/invitation/$slug')({
  component: InvitationPage,
})

function InvitationPage() {
  const params = Route.useParams()
  const slug = params.slug

  // Fetch public invitation data
  const { data: invitationData, isLoading, error } = useQuery({
    queryKey: ['publicInvitation', slug],
    queryFn: () => apiClient.getPublicInvitation(slug),
  })

  // Track view when invitation is successfully loaded
  const { mutate: trackView } = useMutation({
    mutationFn: () => apiClient.trackView(slug),
  })

  // Track view when invitation data is loaded
  React.useEffect(() => {
    if (invitationData?.invitation) {
      trackView()
    }
  }, [invitationData?.invitation, trackView])

  // RSVP submission mutation  
  const rsvpMutation = useMutation({
    mutationFn: (rsvpData: RSVPFormData) => apiClient.submitRSVP(slug, rsvpData),
  })

  const handleRSVP = async (rsvpData: RSVPFormData) => {
    await rsvpMutation.mutateAsync(rsvpData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-12 w-12 text-rose-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading your invitation...</p>
        </div>
      </div>
    )
  }

  if (error || !invitationData?.invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">💔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Invitation Not Found</h1>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't find this wedding invitation. It may have been removed or the link might be incorrect.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <TemplateSelector
      invitation={invitationData.invitation}
      onRSVP={handleRSVP}
      isPreview={false}
    />
  )
} 