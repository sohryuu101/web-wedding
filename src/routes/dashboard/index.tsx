import { createFileRoute } from "@tanstack/react-router";
import { InvitationsDashboard } from "@/components/invitations-dashboard";
import { ProtectedRoute } from "@/components/protected-route";

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <InvitationsDashboard />
    </ProtectedRoute>
  )
}
