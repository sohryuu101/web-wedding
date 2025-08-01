import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { apiClient, CreateInvitationData } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Heart } from "lucide-react"

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

export function InvitationSetup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  
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
      navigate({ to: "/dashboard" })
    },
    onError: (error: any) => {
      console.error('Create invitation error:', error)
    },
  })

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-rose-500" />
            </div>
            <CardTitle className="text-2xl">Create Your Wedding Invitation</CardTitle>
            <CardDescription>
              Welcome {user?.name}! Let's create your beautiful wedding invitation.
              <br />
              You can create one invitation per account.
            </CardDescription>
          </CardHeader>

          <CardContent>
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
                <Label htmlFor="custom_slug">Custom URL *</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /invitation/
                  </span>
                  <Input
                    id="custom_slug"
                    value={formData.custom_slug}
                    onChange={(e) => handleInputChange("custom_slug", e.target.value)}
                    placeholder="your-wedding-url"
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  This will be your unique wedding invitation URL. Leave empty to auto-generate from names.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Welcome Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Join us for our special day..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="flex-1"
                >
                  {createMutation.isPending ? "Creating..." : "Create My Wedding Invitation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 