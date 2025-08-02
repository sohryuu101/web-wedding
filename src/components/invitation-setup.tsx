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
import { ImageUpload } from "@/components/ui/image-upload"
import { VideoUpload } from "@/components/ui/video-upload"

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
    // Couple profile fields
    bride_photo: "",
    groom_photo: "",
    bride_parents: {
      father: "",
      mother: ""
    },
    groom_parents: {
      father: "",
      mother: ""
    },
    bride_social_media: {
      instagram: ""
    },
    groom_social_media: {
      instagram: ""
    },
    bride_birth_order: "first",
    groom_birth_order: "first",
    bride_description: "",
    groom_description: "",
    cover_video: ""
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

  const handleInputChange = (field: keyof CreateInvitationData, value: string | object) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleNestedInputChange = (parentField: keyof CreateInvitationData, nestedField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [nestedField]: value
      }
    }))
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

              <div className="space-y-2">
                <Label htmlFor="cover_video">Cover Background Video (Optional)</Label>
                <VideoUpload
                  value={formData.cover_video}
                  onChange={(url) => handleInputChange("cover_video", url)}
                />
                <p className="text-xs text-gray-500">
                  Enter a YouTube URL to use as the background for your invitation cover
                </p>
              </div>

              {/* Couple Profile Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Couple Profiles (Optional)</h3>
                
                {/* Bride Profile */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-md font-medium text-pink-600">Bride's Information</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bride_photo">Bride's Photo</Label>
                    <ImageUpload
                      value={formData.bride_photo}
                      onChange={(url) => handleInputChange("bride_photo", url)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bride_father">Bride's Father Name</Label>
                      <Input
                        id="bride_father"
                        value={formData.bride_parents?.father || ""}
                        onChange={(e) => handleNestedInputChange("bride_parents", "father", e.target.value)}
                        placeholder="Father's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bride_mother">Bride's Mother Name</Label>
                      <Input
                        id="bride_mother"
                        value={formData.bride_parents?.mother || ""}
                        onChange={(e) => handleNestedInputChange("bride_parents", "mother", e.target.value)}
                        placeholder="Mother's name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bride_birth_order">Bride's Birth Order</Label>
                    <Select 
                      value={formData.bride_birth_order} 
                      onValueChange={(value) => handleInputChange("bride_birth_order", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select birth order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Child</SelectItem>
                        <SelectItem value="second">Second Child</SelectItem>
                        <SelectItem value="third">Third Child</SelectItem>
                        <SelectItem value="fourth">Fourth Child</SelectItem>
                        <SelectItem value="fifth">Fifth Child</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bride_instagram">Bride's Instagram</Label>
                    <Input
                      id="bride_instagram"
                      value={formData.bride_social_media?.instagram || ""}
                      onChange={(e) => handleNestedInputChange("bride_social_media", "instagram", e.target.value)}
                      placeholder="instagram_username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bride_description">Bride's Description</Label>
                    <Textarea
                      id="bride_description"
                      value={formData.bride_description}
                      onChange={(e) => handleInputChange("bride_description", e.target.value)}
                      placeholder="Tell us about the bride..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Groom Profile */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-blue-600">Groom's Information</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="groom_photo">Groom's Photo</Label>
                    <ImageUpload
                      value={formData.groom_photo}
                      onChange={(url) => handleInputChange("groom_photo", url)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groom_father">Groom's Father Name</Label>
                      <Input
                        id="groom_father"
                        value={formData.groom_parents?.father || ""}
                        onChange={(e) => handleNestedInputChange("groom_parents", "father", e.target.value)}
                        placeholder="Father's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groom_mother">Groom's Mother Name</Label>
                      <Input
                        id="groom_mother"
                        value={formData.groom_parents?.mother || ""}
                        onChange={(e) => handleNestedInputChange("groom_parents", "mother", e.target.value)}
                        placeholder="Mother's name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groom_birth_order">Groom's Birth Order</Label>
                    <Select 
                      value={formData.groom_birth_order} 
                      onValueChange={(value) => handleInputChange("groom_birth_order", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select birth order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Child</SelectItem>
                        <SelectItem value="second">Second Child</SelectItem>
                        <SelectItem value="third">Third Child</SelectItem>
                        <SelectItem value="fourth">Fourth Child</SelectItem>
                        <SelectItem value="fifth">Fifth Child</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groom_instagram">Groom's Instagram</Label>
                    <Input
                      id="groom_instagram"
                      value={formData.groom_social_media?.instagram || ""}
                      onChange={(e) => handleNestedInputChange("groom_social_media", "instagram", e.target.value)}
                      placeholder="instagram_username"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groom_description">Groom's Description</Label>
                    <Textarea
                      id="groom_description"
                      value={formData.groom_description}
                      onChange={(e) => handleInputChange("groom_description", e.target.value)}
                      placeholder="Tell us about the groom..."
                      rows={3}
                    />
                  </div>
                </div>
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