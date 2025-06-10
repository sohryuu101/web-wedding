"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface CreateInvitationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateInvitationDialog({ open, onOpenChange }: CreateInvitationDialogProps) {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const templates = [
    {
      id: "classic-romance",
      name: "Classic Romance",
      description: "Elegant and timeless design with floral elements",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Classic+Romance",
      theme: "Rose Garden",
    },
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      description: "Clean lines and contemporary typography",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Modern+Minimalist",
      theme: "Midnight Elegance",
    },
    {
      id: "beach-vibes",
      name: "Beach Vibes",
      description: "Coastal-inspired design with ocean colors",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Beach+Vibes",
      theme: "Ocean Breeze",
    },
    {
      id: "rustic-charm",
      name: "Rustic Charm",
      description: "Warm and cozy with natural elements",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Rustic+Charm",
      theme: "Forest Green",
    },
    {
      id: "elegant-classic",
      name: "Elegant Classic",
      description: "Sophisticated design with gold accents",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Elegant+Classic",
      theme: "Golden Sunset",
    },
    {
      id: "whimsical-garden",
      name: "Whimsical Garden",
      description: "Playful design with botanical illustrations",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Whimsical+Garden",
      theme: "Lavender Dreams",
    },
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCreate = () => {
    // Handle invitation creation
    onOpenChange(false)
    setStep(1)
    setSelectedTemplate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Wedding Invitation</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? "Choose Template" : step === 2 ? "Basic Information" : "Final Details"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all ${
                      selectedTemplate === template.id ? "ring-2 ring-rose-500 bg-rose-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{template.theme}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bride-name">Bride's Name</Label>
                  <Input id="bride-name" placeholder="Enter bride's full name" />
                </div>
                <div>
                  <Label htmlFor="groom-name">Groom's Name</Label>
                  <Input id="groom-name" placeholder="Enter groom's full name" />
                </div>
                <div>
                  <Label htmlFor="wedding-date">Wedding Date</Label>
                  <Input id="wedding-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="wedding-time">Wedding Time</Label>
                  <Input id="wedding-time" type="time" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="Wedding venue name" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Full venue address" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Final Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="invitation-title">Invitation Title</Label>
                  <Input id="invitation-title" placeholder="e.g., Sarah & John's Wedding" />
                </div>
                <div>
                  <Label htmlFor="guest-count">Expected Guest Count</Label>
                  <Input id="guest-count" type="number" placeholder="Number of guests" />
                </div>
                <div>
                  <Label htmlFor="rsvp-deadline">RSVP Deadline</Label>
                  <Input id="rsvp-deadline" type="date" />
                </div>
                <div>
                  <Label htmlFor="special-message">Special Message</Label>
                  <Textarea id="special-message" placeholder="A special message for your guests..." />
                </div>
                <div>
                  <Label htmlFor="privacy">Privacy Setting</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose privacy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone with link can view</SelectItem>
                      <SelectItem value="private">Private - Password protected</SelectItem>
                      <SelectItem value="invite-only">Invite Only - Specific guest list</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} disabled={step === 1 && !selectedTemplate}>
                Next
              </Button>
            ) : (
              <Button onClick={handleCreate}>Create Invitation</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
