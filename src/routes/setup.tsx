import { createFileRoute } from '@tanstack/react-router'
import { InvitationSetup } from '@/components/invitation-setup'
import { ProtectedRoute } from '@/components/protected-route'

export const Route = createFileRoute('/setup')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <InvitationSetup />
    </ProtectedRoute>
  )
} 