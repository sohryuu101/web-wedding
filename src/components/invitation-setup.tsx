import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiClient, CreateInvitationData } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { Heart } from "lucide-react"

export function InvitationSetup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState<CreateInvitationData>({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
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
    onError: (error: Error) => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Clean up form data - only include essential fields
    const cleanData: CreateInvitationData = {
      bride_name: formData.bride_name.trim(),
      groom_name: formData.groom_name.trim(),
      wedding_date: new Date().toISOString().split('T')[0], // Set default date to today
      theme: "Modern Elegance", // Set default theme
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
            <CardTitle className="text-2xl">Buat Undangan Pernikahan Anda</CardTitle>
            <CardDescription>
              Selamat datang {user?.name}! Mari mulai dengan detail dasar.
              <br />
              Anda dapat menambahkan detail lainnya setelah membuat undangan.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {createMutation.error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {createMutation.error instanceof Error 
                    ? createMutation.error.message 
                    : "Gagal membuat undangan"}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bride_name">Nama Pengantin Wanita *</Label>
                  <Input
                    id="bride_name"
                    value={formData.bride_name}
                    onChange={(e) => handleInputChange("bride_name", e.target.value)}
                    placeholder="Masukkan nama pengantin wanita"
                    className={errors.bride_name ? "border-red-500" : ""}
                  />
                  {errors.bride_name && (
                    <p className="text-xs text-red-600">Nama pengantin wanita wajib diisi</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groom_name">Nama Pengantin Pria *</Label>
                  <Input
                    id="groom_name"
                    value={formData.groom_name}
                    onChange={(e) => handleInputChange("groom_name", e.target.value)}
                    placeholder="Masukkan nama pengantin pria"
                    className={errors.groom_name ? "border-red-500" : ""}
                  />
                  {errors.groom_name && (
                    <p className="text-xs text-red-600">Nama pengantin pria wajib diisi</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_slug">URL Kustom</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    /invitation/
                  </span>
                  <Input
                    id="custom_slug"
                    value={formData.custom_slug}
                    onChange={(e) => handleInputChange("custom_slug", e.target.value)}
                    placeholder="url-undangan-anda"
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Ini akan menjadi URL undangan pernikahan Anda. Biarkan kosong untuk membuat otomatis dari nama.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="flex-1"
                >
                  {createMutation.isPending ? "Membuat..." : "Buat Undangan Pernikahan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 