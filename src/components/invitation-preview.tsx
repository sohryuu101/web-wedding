import { WeddingInvitationTemplate, type InvitationData } from './wedding-invitation-template'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface InvitationPreviewProps {
  invitation: InvitationData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvitationPreview({ invitation, open, onOpenChange }: InvitationPreviewProps) {
  if (!invitation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-full p-0 overflow-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Invitation Preview</DialogTitle>
        </DialogHeader>
        <WeddingInvitationTemplate
          invitation={invitation}
          isPreview={true}
        />
      </DialogContent>
    </Dialog>
  )
} 