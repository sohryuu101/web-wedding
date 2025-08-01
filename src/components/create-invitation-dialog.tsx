"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient, CreateInvitationData } from "@/lib/api"

interface CreateInvitationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const themes = [
  "Rose Garden",
  "Ocean Breeze", 
  "Golden Sunset",
  "Winter Wonderland",
  "Forest Green",
  "Lavender Dreams",
  "Classic Elegance",
  "Modern Minimalist"
]

export function CreateInvitationDialog({ open, onOpenChange }: CreateInvitationDialogProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CreateInvitationData>({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    venue: "",
    main_title: "Save The Date",
    subtitle: "We're Getting Married!",
    message: "Join us for our special day...",
    theme: "Rose Garden",
    custom_slug: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const createMutation = useMutation({
    mutationFn: (data: CreateInvitationData) => apiClient.createInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
      resetForm()
      onOpenChange(false)
    },
    onError: (error: any) => {
      console.error('Create invitation error:', error)
    },
  })

  const resetForm = () => {
    setFormData({
      bride_name: "",
      groom_name: "",
      wedding_date: "",
      venue: "",
      main_title: "Save The Date",
      subtitle: "We're Getting Married!",
      message: "Join us for our special day...",
      theme: "Rose Garden",
      custom_slug: "",
    })
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.bride_name.trim()) {
      newErrors.bride_name = "Bride's name is required"
    }
    if (!formData.groom_name.trim()) {
      newErrors.groom_name = "Groom's name is required"
    }
    if (!formData.wedding_date) {
      newErrors.wedding_date = "Wedding date is required"
    } else {
      const selectedDate = new Date(formData.wedding_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.wedding_date = "Wedding date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Clean up form data - remove empty optional fields
    const cleanData: CreateInvitationData = {
      bride_name: formData.bride_name.trim(),
      groom_name: formData.groom_name.trim(),
      wedding_date: formData.wedding_date,
      ...(formData.venue?.trim() && { venue: formData.venue.trim() }),
      ...(formData.main_title?.trim() && { main_title: formData.main_title.trim() }),
      ...(formData.subtitle?.trim() && { subtitle: formData.subtitle.trim() }),
      ...(formData.message?.trim() && { message: formData.message.trim() }),
      ...(formData.theme && { theme: formData.theme }),
      ...(formData.custom_slug?.trim() && { custom_slug: formData.custom_slug.trim() }),
    }

    createMutation.mutate(cleanData)
  }

  const handleInputChange = (field: keyof CreateInvitationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invitation</DialogTitle>
          <DialogDescription>
            Create a beautiful wedding invitation to share with your guests.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {createMutation.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {(createMutation.error as any)?.message || "Failed to create invitation"}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bride_name">Bride's Name *</Label>
              <Input
                id="bride_name"
                value={formData.bride_name}
                onChange={(e) => handleInputChange("bride_name", e.target.value)}
                placeholder="Enter bride's name"
                className={errors.bride_name ? "border-red-500" : ""}
              />
              {errors.bride_name && (
                <p className="text-xs text-red-600">{errors.bride_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="groom_name">Groom's Name *</Label>
              <Input
                id="groom_name"
                value={formData.groom_name}
                onChange={(e) => handleInputChange("groom_name", e.target.value)}
                placeholder="Enter groom's name"
                className={errors.groom_name ? "border-red-500" : ""}
              />
              {errors.groom_name && (
                <p className="text-xs text-red-600">{errors.groom_name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wedding_date">Wedding Date *</Label>
              <Input
                id="wedding_date"
                type="date"
                value={formData.wedding_date}
                onChange={(e) => handleInputChange("wedding_date", e.target.value)}
                className={errors.wedding_date ? "border-red-500" : ""}
              />
              {errors.wedding_date && (
                <p className="text-xs text-red-600">{errors.wedding_date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => handleInputChange("venue", e.target.value)}
              placeholder="Enter venue name (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="main_title">Main Title</Label>
            <Input
              id="main_title"
              value={formData.main_title}
              onChange={(e) => handleInputChange("main_title", e.target.value)}
              placeholder="Save The Date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="We're Getting Married!"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Join us for our special day..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom_slug">Custom URL (Optional)</Label>
            <Input
              id="custom_slug"
              value={formData.custom_slug}
              onChange={(e) => handleInputChange("custom_slug", e.target.value)}
              placeholder="custom-url-name (leave empty for auto-generation)"
            />
            <p className="text-xs text-gray-500">
              This will create a URL like: /invitation/your-custom-url
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create Invitation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
