"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient, CreateInvitationData } from "@/lib/api"
import { ImageUpload } from "@/components/ui/image-upload"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CreateInvitationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateInvitationDialog({ open, onOpenChange }: CreateInvitationDialogProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CreateInvitationData>({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    venue: "",
    main_title: "Simpan Tanggal",
    subtitle: "Kami Akan Menikah!",
    message: "Bergabunglah bersama kami di hari spesial kami...",
    theme: "Taman Mawar",
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
    groom_description: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const createMutation = useMutation({
    mutationFn: (data: CreateInvitationData) => apiClient.createInvitation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] })
      resetForm()
      onOpenChange(false)
    },
    onError: (error: Error) => {
      console.error('Create invitation error:', error)
    },
  })

  const resetForm = () => {
    setFormData({
      bride_name: "",
      groom_name: "",
      wedding_date: "",
      venue: "",
      main_title: "Simpan Tanggal",
      subtitle: "Kami Akan Menikah!",
      message: "Bergabunglah bersama kami di hari spesial kami...",
      theme: "Taman Mawar",
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
      groom_description: ""
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
        ...(prev[parentField] as Record<string, string>),
        [nestedField]: value
      }
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buat Undangan Baru</DialogTitle>
          <DialogDescription>
            Buat undangan pernikahan yang indah untuk dibagikan kepada tamu Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {createMutation.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {(createMutation.error as Error)?.message || "Gagal membuat undangan"}
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
                <p className="text-xs text-red-600">{errors.bride_name}</p>
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
                <p className="text-xs text-red-600">{errors.groom_name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wedding_date">Tanggal Pernikahan *</Label>
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
              <Label htmlFor="venue">Tempat *</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="Masukkan lokasi pernikahan"
                className={errors.venue ? "border-red-500" : ""}
              />
              {errors.venue && (
                <p className="text-xs text-red-600">{errors.venue}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="main_title">Judul Utama</Label>
            <Input
              id="main_title"
              value={formData.main_title}
              onChange={(e) => handleInputChange("main_title", e.target.value)}
              placeholder="Simpan Tanggal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Sub Judul</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
              placeholder="Kami Akan Menikah!"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Bergabunglah bersama kami di hari spesial kami..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom_slug">URL Kustom (Opsional)</Label>
            <Input
              id="custom_slug"
              value={formData.custom_slug}
              onChange={(e) => handleInputChange("custom_slug", e.target.value)}
              placeholder="nama-url-kustom (kosongkan untuk pembuatan otomatis)"
            />
            <p className="text-xs text-gray-500">
              Ini akan membuat URL seperti: /invitation/url-kustom-anda
            </p>
          </div>

          {/* Profil Pasangan */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Profil Pasangan</h3>
            
            {/* Foto Pasangan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="bride_photo">Foto Pengantin Wanita</Label>
                <ImageUpload
                  value={formData.bride_photo}
                  onChange={(url) => handleInputChange("bride_photo", url)}
                  className="w-full aspect-square"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="groom_photo">Foto Pengantin Pria</Label>
                <ImageUpload
                  value={formData.groom_photo}
                  onChange={(url) => handleInputChange("groom_photo", url)}
                  className="w-full aspect-square"
                />
              </div>
            </div>

            {/* Orang Tua Pengantin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <h4 className="font-medium">Orang Tua Pengantin Wanita</h4>
                <div className="space-y-2">
                  <Label htmlFor="bride_father">Nama Ayah</Label>
                  <Input
                    id="bride_father"
                    value={formData.bride_parents?.father || ""}
                    onChange={(e) => handleNestedInputChange("bride_parents", "father", e.target.value)}
                    placeholder="Nama ayah pengantin wanita"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bride_mother">Nama Ibu</Label>
                  <Input
                    id="bride_mother"
                    value={formData.bride_parents?.mother || ""}
                    onChange={(e) => handleNestedInputChange("bride_parents", "mother", e.target.value)}
                    placeholder="Nama ibu pengantin wanita"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Orang Tua Pengantin Pria</h4>
                <div className="space-y-2">
                  <Label htmlFor="groom_father">Nama Ayah</Label>
                  <Input
                    id="groom_father"
                    value={formData.groom_parents?.father || ""}
                    onChange={(e) => handleNestedInputChange("groom_parents", "father", e.target.value)}
                    placeholder="Nama ayah pengantin pria"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groom_mother">Nama Ibu</Label>
                  <Input
                    id="groom_mother"
                    value={formData.groom_parents?.mother || ""}
                    onChange={(e) => handleNestedInputChange("groom_parents", "mother", e.target.value)}
                    placeholder="Nama ibu pengantin pria"
                  />
                </div>
              </div>
            </div>

            {/* Media Sosial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="bride_instagram">Instagram Pengantin Wanita</Label>
                <Input
                  id="bride_instagram"
                  value={formData.bride_social_media?.instagram || ""}
                  onChange={(e) => handleNestedInputChange("bride_social_media", "instagram", e.target.value)}
                  placeholder="@username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groom_instagram">Instagram Pengantin Pria</Label>
                <Input
                  id="groom_instagram"
                  value={formData.groom_social_media?.instagram || ""}
                  onChange={(e) => handleNestedInputChange("groom_social_media", "instagram", e.target.value)}
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Deskripsi Pasangan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bride_description">Deskripsi Pengantin Wanita</Label>
                <Textarea
                  id="bride_description"
                  value={formData.bride_description}
                  onChange={(e) => handleInputChange("bride_description", e.target.value)}
                  placeholder="Ceritakan tentang pengantin wanita..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groom_description">Deskripsi Pengantin Pria</Label>
                <Textarea
                  id="groom_description"
                  value={formData.groom_description}
                  onChange={(e) => handleInputChange("groom_description", e.target.value)}
                  placeholder="Ceritakan tentang pengantin pria..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Buat Undangan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
