import { createFileRoute } from "@tanstack/react-router";
import { InvitationsDashboard } from "@/components/invitations-dashboard";


export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {

  
  return (
    <div className="min-h-screen bg-gray-50">
      
      <InvitationsDashboard />
    </div>
  )
}
