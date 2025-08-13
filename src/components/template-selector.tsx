import { WeddingInvitationTemplate } from './wedding-invitation-template'
import { ModernEleganceTemplate } from './templates/modern-elegance-template'
import { ScrapbookTemplate } from './templates/scrapbook-template'
import { PastelMinimalisTemplate } from './templates/pastel-minimalis-template'
import { FlowerGardenTemplate } from './templates/flower-garden-template'
import type { InvitationData } from './wedding-invitation-template'
import type { RSVPFormData } from './wedding-invitation-template'

interface TemplateSelectorProps {
  invitation: InvitationData
  onRSVP?: (rsvpData: RSVPFormData) => Promise<void>
  isPreview?: boolean
}

export function TemplateSelector({ 
  invitation, 
  onRSVP, 
  isPreview = false 
}: TemplateSelectorProps) {
  switch (invitation.theme) {
    case 'Modern Elegance':
      return (
        <ModernEleganceTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
    case 'Scrapbook':
      return (
        <ScrapbookTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
    case 'Pastel Minimalis':
      return (
        <PastelMinimalisTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
    case 'Flower Garden':
      return (
        <FlowerGardenTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
    // Handle legacy/DB default theme
    case 'Rose Garden':
      // For now, we'll use the default template for Rose Garden
      // In the future, we might want to create a specific template for this
      return (
        <WeddingInvitationTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
    default:
      return (
        <WeddingInvitationTemplate 
          invitation={invitation} 
          onRSVP={onRSVP} 
          isPreview={isPreview} 
        />
      )
  }
}