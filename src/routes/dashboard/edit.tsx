import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Header } from "@/components/header"
import { apiClient, type UpdateInvitationData } from "@/lib/api"
import { WeddingInvitationTemplate } from "@/components/wedding-invitation-template"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/ui/image-upload"
import { VideoUpload } from "@/components/ui/video-upload"
import { toast } from "sonner"

export const Route = createFileRoute("/dashboard/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState("form")
  const [formData, setFormData] = useState<UpdateInvitationData>({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    venue: "",
    main_title: "Save The Date",
    subtitle: "We're Getting Married!",
    message: "Join us for our special day...",
    theme: "Rose Garden",
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

  // Fetch current invitation data
  const { data: invitationData, isLoading, error } = useQuery({
    queryKey: ['invitation'],
    queryFn: () => apiClient.getInvitation(),
  })

  const invitation = invitationData?.invitation

  // Update form data when invitation data is loaded
  useEffect(() => {
    if (invitation) {
      setFormData({
        bride_name: invitation.bride_name || "",
        groom_name: invitation.groom_name || "",
        wedding_date: invitation.wedding_date || "",
        venue: invitation.venue || "",
        main_title: invitation.main_title || "Save The Date",
        subtitle: invitation.subtitle || "We're Getting Married!",
        message: invitation.message || "Join us for our special day...",
        theme: invitation.theme || "Rose Garden",
                 // Couple profile fields
         bride_photo: invitation.bride_photo || "",
         groom_photo: invitation.groom_photo || "",
         bride_parents: invitation.bride_parents || { father: "", mother: "" },
         groom_parents: invitation.groom_parents || { father: "", mother: "" },
         bride_social_media: invitation.bride_social_media || { instagram: "" },
         groom_social_media: invitation.groom_social_media || { instagram: "" },
         bride_birth_order: invitation.bride_birth_order || "first",
         groom_birth_order: invitation.groom_birth_order || "first",
         bride_description: invitation.bride_description || "",
         groom_description: invitation.groom_description || "",
         cover_video: invitation.cover_video || "",
      })
    }
  }, [invitation])

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateInvitationData) => apiClient.updateInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation'] })
      toast.success("Invitation updated successfully!")
    },
    onError: (error: any) => {
      console.error('Update invitation error:', error)
      toast.error("Failed to update invitation")
    },
  })

  const handleInputChange = (field: keyof UpdateInvitationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parentField: string, childField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev as any)[parentField],
        [childField]: value
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(formData)
  }

  const handleSave = () => {
    updateMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading invitation data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error loading invitation data</p>
            <Button onClick={() => navigate({ to: "/dashboard" })} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">No invitation found</p>
            <Button onClick={() => navigate({ to: "/setup" })} className="mt-4">
              Create Invitation
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Create a mock invitation object for preview
  const previewInvitation = {
    ...invitation,
    ...formData,
    // Ensure all required fields are present for the template
    bride_name: formData.bride_name || invitation.bride_name,
    groom_name: formData.groom_name || invitation.groom_name,
    wedding_date: formData.wedding_date || invitation.wedding_date,
    main_title: formData.main_title || invitation.main_title,
    subtitle: formData.subtitle || invitation.subtitle,
    message: formData.message || invitation.message,
    theme: formData.theme || invitation.theme,
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Invitation</h1>
                <p className="text-gray-600">Update your wedding invitation details</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Edit Form</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Update the main details of your invitation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bride_name">Bride's Name</Label>
                          <Input
                            id="bride_name"
                            value={formData.bride_name}
                            onChange={(e) => handleInputChange("bride_name", e.target.value)}
                            placeholder="Bride's full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groom_name">Groom's Name</Label>
                          <Input
                            id="groom_name"
                            value={formData.groom_name}
                            onChange={(e) => handleInputChange("groom_name", e.target.value)}
                            placeholder="Groom's full name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="wedding_date">Wedding Date</Label>
                          <Input
                            id="wedding_date"
                            type="date"
                            value={formData.wedding_date}
                            onChange={(e) => handleInputChange("wedding_date", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="venue">Venue</Label>
                          <Input
                            id="venue"
                            value={formData.venue}
                            onChange={(e) => handleInputChange("venue", e.target.value)}
                            placeholder="Wedding venue"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="main_title">Main Title</Label>
                        <Input
                          id="main_title"
                          value={formData.main_title}
                          onChange={(e) => handleInputChange("main_title", e.target.value)}
                          placeholder="e.g., Save The Date"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                          id="subtitle"
                          value={formData.subtitle}
                          onChange={(e) => handleInputChange("subtitle", e.target.value)}
                          placeholder="e.g., We're Getting Married!"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Your wedding message"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rose Garden">Rose Garden</SelectItem>
                            <SelectItem value="Ocean Breeze">Ocean Breeze</SelectItem>
                            <SelectItem value="Golden Sunset">Golden Sunset</SelectItem>
                            <SelectItem value="Winter Wonderland">Winter Wonderland</SelectItem>
                            <SelectItem value="Forest Green">Forest Green</SelectItem>
                            <SelectItem value="Lavender Dreams">Lavender Dreams</SelectItem>
                            <SelectItem value="Classic Elegance">Classic Elegance</SelectItem>
                            <SelectItem value="Modern Minimalist">Modern Minimalist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cover_video">Cover Background Video</Label>
                        <VideoUpload
                          value={formData.cover_video}
                          onChange={(url) => handleInputChange("cover_video", url)}
                        />
                        <p className="text-sm text-gray-500">
                          Enter a YouTube URL to use as the background for your invitation cover
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Couple Profile Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Couple Profiles</CardTitle>
                      <CardDescription>Add personal details about the couple</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Bride Profile */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-pink-600">Bride's Information</h4>
                        
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
                          <Label htmlFor="bride_birth_order">Birth Order</Label>
                          <Select 
                            value={formData.bride_birth_order} 
                            onValueChange={(value) => handleInputChange("bride_birth_order", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select birth order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="first">First</SelectItem>
                              <SelectItem value="second">Second</SelectItem>
                              <SelectItem value="third">Third</SelectItem>
                              <SelectItem value="fourth">Fourth</SelectItem>
                              <SelectItem value="fifth">Fifth</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bride_instagram">Instagram Handle</Label>
                          <Input
                            id="bride_instagram"
                            value={formData.bride_social_media?.instagram || ""}
                            onChange={(e) => handleNestedInputChange("bride_social_media", "instagram", e.target.value)}
                            placeholder="@username"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bride_description">Description</Label>
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
                        <h4 className="text-lg font-medium text-blue-600">Groom's Information</h4>
                        
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
                          <Label htmlFor="groom_birth_order">Birth Order</Label>
                          <Select 
                            value={formData.groom_birth_order} 
                            onValueChange={(value) => handleInputChange("groom_birth_order", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select birth order" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="first">First</SelectItem>
                              <SelectItem value="second">Second</SelectItem>
                              <SelectItem value="third">Third</SelectItem>
                              <SelectItem value="fourth">Fourth</SelectItem>
                              <SelectItem value="fifth">Fifth</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="groom_instagram">Instagram Handle</Label>
                          <Input
                            id="groom_instagram"
                            value={formData.groom_social_media?.instagram || ""}
                            onChange={(e) => handleNestedInputChange("groom_social_media", "instagram", e.target.value)}
                            placeholder="@username"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="groom_description">Description</Label>
                          <Textarea
                            id="groom_description"
                            value={formData.groom_description}
                            onChange={(e) => handleInputChange("groom_description", e.target.value)}
                            placeholder="Tell us about the groom..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>See how your invitation will look</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                      <WeddingInvitationTemplate 
                        invitation={previewInvitation as any}
                        isPreview={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
