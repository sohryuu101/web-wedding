import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Header } from "@/components/header"
import { apiClient, type UpdateInvitationData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"
import { VideoUpload } from "@/components/ui/video-upload"
import { toast } from "sonner"
import { 
  Calendar, 
  Quote, 
  Bell, 
  Heart, 
  Image as ImageIcon, 
  Video, 
  Wifi, 
  Gift, 
  Music,
  Palette,
  FileText,
  Eye
} from "lucide-react"
import { InvitationPreview } from "@/components/invitation-preview"

export const Route = createFileRoute("/dashboard/edit")({
  component: RouteComponent,
});

// Section definitions
const WEDDING_SECTIONS = [
  {
    id: 'cover',
    title: 'Cover Depan',
    description: 'Sampul undangan',
    icon: FileText,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'cover-video',
    title: 'Video Latar Sampul',
    description: 'Video latar belakang',
    icon: Video,
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'theme',
    title: 'Ubah Tema',
    description: 'Pilih tema undangan',
    icon: Palette,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'bride',
    title: 'Mempelai Wanita',
    description: 'Data pengantin wanita',
    icon: 'bride.png',
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
    isImage: true
  },
  {
    id: 'groom',
    title: 'Mempelai Pria',
    description: 'Data pengantin pria',
    icon: 'groom.png',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    isImage: true
  },
  {
    id: 'event',
    title: 'Detail Acara',
    description: 'Waktu dan tempat',
    icon: Calendar,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'quotes',
    title: 'Quotes',
    description: 'Kutipan romantis',
    icon: Quote,
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200'
  },
  {
    id: 'notification',
    title: 'Notifikasi',
    description: 'Pengaturan pemberitahuan',
    icon: Bell,
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  },
  {
    id: 'love-story',
    title: 'Love Story',
    description: 'Cerita cinta',
    icon: Heart,
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
  },
  {
    id: 'photo-gallery',
    title: 'Galleri Foto',
    description: 'Koleksi foto',
    icon: ImageIcon,
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'video-gallery',
    title: 'Gallery Video',
    description: 'Koleksi video',
    icon: Video,
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200'
  },
  {
    id: 'live-streaming',
    title: 'Live Streaming',
    description: 'Siaran langsung',
    icon: Wifi,
    color: 'bg-teal-50 hover:bg-teal-100 border-teal-200'
  },
  {
    id: 'digital-gift',
    title: 'Kado Digital',
    description: 'Hadiah digital',
    icon: Gift,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  },
  {
    id: 'music',
    title: 'Musik',
    description: 'Lagu latar',
    icon: Music,
    color: 'bg-violet-50 hover:bg-violet-100 border-violet-200'
  }
]

function RouteComponent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<UpdateInvitationData & { event_start_time?: string }>({
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    venue: "",
    main_title: "Simpan Tanggal",
    subtitle: "Kami Akan Menikah!",
    message: "Bergabunglah bersama kami di hari spesial kami...",
    theme: "Modern Elegance",
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
    cover_video: "",
    event_start_time: ""
  })
  const [showPreview, setShowPreview] = useState(false)

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
        main_title: invitation.main_title || "Simpan Tanggal",
        subtitle: invitation.subtitle || "Kami Akan Menikah!",
        message: invitation.message || "Bergabunglah bersama kami di hari spesial kami...",
        theme: invitation.theme || "Modern Elegance",
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
      toast.success("Undangan berhasil diperbarui!")
    },
    onError: (error: any) => {
      console.error('Update invitation error:', error)
      toast.error("Gagal memperbarui undangan")
    },
  })

  const handleInputChange = (field: keyof (UpdateInvitationData & { event_start_time?: string }), value: string) => {
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

  const handleSave = () => {
    updateMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Undangan berhasil diperbarui!")
      }
    })
  }

  // Create a preview data object that combines the invitation data with the current form data
  const getPreviewData = () => {
    if (!invitation) return null;
    
    return {
      ...invitation,
      ...formData,
      // Handle nested objects properly
      bride_parents: {
        ...invitation.bride_parents,
        ...formData.bride_parents
      },
      groom_parents: {
        ...invitation.groom_parents,
        ...formData.groom_parents
      },
      bride_social_media: {
        ...invitation.bride_social_media,
        ...formData.bride_social_media
      },
      groom_social_media: {
        ...invitation.groom_social_media,
        ...formData.groom_social_media
      }
    };
  }

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'cover':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="main_title">Judul Undangan *</Label>
              <Input
                id="main_title"
                value={formData.main_title}
                onChange={(e) => handleInputChange("main_title", e.target.value)}
                placeholder="Contoh: Simpan Tanggal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Link Undangan</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="Contoh: Kami Akan Menikah!"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wedding_date">Tanggal Acara</Label>
              <Input
                id="wedding_date"
                type="date"
                value={formData.wedding_date}
                onChange={(e) => handleInputChange("wedding_date", e.target.value)}
                placeholder="Pilih Tanggal Acara"
              />
              <p className="text-sm text-gray-500">
                Pilih Tanggal Acara (misal: 31 Desember 2024)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_start_time">Jam Acara Countdown</Label>
              <Input
                id="event_start_time"
                type="time"
                value={formData.event_start_time || ""}
                onChange={(e) => handleInputChange("event_start_time", e.target.value)}
                placeholder="Masukan Jam Acara Countdown"
              />
              <p className="text-sm text-gray-500">
                Masukan Jam Acara Countdown (misal: 18:30)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Pesan pernikahan Anda"
                rows={4}
              />
            </div>
          </div>
        )

      case 'cover-video':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cover_video">Video Latar Sampul</Label>
              <VideoUpload
                value={formData.cover_video}
                onChange={(url) => handleInputChange("cover_video", url)}
              />
              <p className="text-sm text-gray-500">
                Masukkan URL YouTube untuk digunakan sebagai latar belakang sampul undangan Anda
              </p>
            </div>
          </div>
        )

      case 'theme':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Modern Elegance">Modern Elegance</SelectItem>
                  <SelectItem value="Scrapbook">Scrapbook</SelectItem>
                  <SelectItem value="Pastel Minimalis">Pastel Minimalis</SelectItem>
                  <SelectItem value="Flower Garden">Flower Garden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={() => {
                updateMutation.mutate(formData, {
                  onSuccess: () => {
                    toast.success("Tema undangan berhasil diubah!")
                  }
                })
              }}
              disabled={updateMutation.isPending}
              className="w-full"
            >
              {updateMutation.isPending ? "Menyimpan..." : "Simpan Tema"}
            </Button>
          </div>
        )

      case 'bride':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bride_name">Nama Pengantin Wanita</Label>
              <Input
                id="bride_name"
                value={formData.bride_name}
                onChange={(e) => handleInputChange("bride_name", e.target.value)}
                placeholder="Nama lengkap pengantin wanita"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_photo">Foto Pengantin Wanita</Label>
              <ImageUpload
                value={formData.bride_photo}
                onChange={(url) => handleInputChange("bride_photo", url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bride_father">Nama Ayah</Label>
                <Input
                  id="bride_father"
                  value={formData.bride_parents?.father || ""}
                  onChange={(e) => handleNestedInputChange("bride_parents", "father", e.target.value)}
                  placeholder="Nama ayah"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bride_mother">Nama Ibu</Label>
                <Input
                  id="bride_mother"
                  value={formData.bride_parents?.mother || ""}
                  onChange={(e) => handleNestedInputChange("bride_parents", "mother", e.target.value)}
                  placeholder="Nama ibu"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_birth_order">Urutan Kelahiran</Label>
              <Select 
                value={formData.bride_birth_order} 
                onValueChange={(value) => handleInputChange("bride_birth_order", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih urutan kelahiran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Pertama</SelectItem>
                  <SelectItem value="second">Kedua</SelectItem>
                  <SelectItem value="third">Ketiga</SelectItem>
                  <SelectItem value="fourth">Keempat</SelectItem>
                  <SelectItem value="fifth">Kelima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_instagram">Akun Instagram</Label>
              <Input
                id="bride_instagram"
                value={formData.bride_social_media?.instagram || ""}
                onChange={(e) => handleNestedInputChange("bride_social_media", "instagram", e.target.value)}
                placeholder="@username"
              />
            </div>
            
          </div>
        )

      case 'groom':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groom_name">Nama Pengantin Pria</Label>
              <Input
                id="groom_name"
                value={formData.groom_name}
                onChange={(e) => handleInputChange("groom_name", e.target.value)}
                placeholder="Nama lengkap pengantin pria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groom_photo">Foto Pengantin Pria</Label>
              <ImageUpload
                value={formData.groom_photo}
                onChange={(url) => handleInputChange("groom_photo", url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groom_father">Nama Ayah</Label>
                <Input
                  id="groom_father"
                  value={formData.groom_parents?.father || ""}
                  onChange={(e) => handleNestedInputChange("groom_parents", "father", e.target.value)}
                  placeholder="Nama ayah"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groom_mother">Nama Ibu</Label>
                <Input
                  id="groom_mother"
                  value={formData.groom_parents?.mother || ""}
                  onChange={(e) => handleNestedInputChange("groom_parents", "mother", e.target.value)}
                  placeholder="Nama ibu"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="groom_birth_order">Urutan Kelahiran</Label>
              <Select 
                value={formData.groom_birth_order} 
                onValueChange={(value) => handleInputChange("groom_birth_order", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih urutan kelahiran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Pertama</SelectItem>
                  <SelectItem value="second">Kedua</SelectItem>
                  <SelectItem value="third">Ketiga</SelectItem>
                  <SelectItem value="fourth">Keempat</SelectItem>
                  <SelectItem value="fifth">Kelima</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="groom_instagram">Akun Instagram</Label>
              <Input
                id="groom_instagram"
                value={formData.groom_social_media?.instagram || ""}
                onChange={(e) => handleNestedInputChange("groom_social_media", "instagram", e.target.value)}
                placeholder="@username"
              />
            </div>
            
          </div>
        )

      case 'event':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wedding_date">Tanggal Pernikahan</Label>
                <Input
                  id="wedding_date"
                  type="date"
                  value={formData.wedding_date}
                  onChange={(e) => handleInputChange("wedding_date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Tempat</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => handleInputChange("venue", e.target.value)}
                  placeholder="Lokasi pernikahan"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Detail acara seperti akad nikah dan resepsi akan ditambahkan dalam pembaruan mendatang.
            </p>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Fitur untuk bagian "{WEDDING_SECTIONS.find(s => s.id === sectionId)?.title}" akan segera hadir.
            </p>
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data undangan...</p>
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
            <p className="text-red-600">Gagal memuat data undangan</p>
            <Button onClick={() => navigate({ to: "/dashboard" })} className="mt-4">
              Kembali ke Dashboard
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
            <p className="text-gray-600">Undangan tidak ditemukan</p>
            <Button onClick={() => navigate({ to: "/setup" })} className="mt-4">
              Buat Undangan
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ubah Undangan</h1>
                <p className="text-gray-600">Pilih bagian yang ingin Anda ubah</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
                  Kembali
                </Button>
                <Button onClick={() => setShowPreview(true)} variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Pratinjau
                </Button>
                <Button onClick={() => navigate({ to: `/invitation/${invitation.slug}` })} variant="outline">
                  Lihat Undangan
                </Button>
              </div>
            </div>

            {/* Section Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {WEDDING_SECTIONS.map((section) => {
                return (
                  <Dialog key={section.id}>
                    <DialogTrigger asChild>
                      <Card className={`cursor-pointer transition-all duration-200 ${section.color} hover:shadow-md`}>
                        <CardContent className="p-6 text-center">
                          <div className="mx-auto w-12 h-12 mb-4 flex items-center justify-center">
                            {section.isImage ? (
                              <img 
                                src={`/src/assets/${section.icon}`} 
                                alt={section.title}
                                className="h-8 w-8 object-contain"
                              />
                            ) : (
                              <section.icon className="h-8 w-8 text-gray-600" />
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.description}</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {section.isImage ? (
                            <img 
                              src={`/src/assets/${section.icon}`} 
                              alt={section.title}
                              className="h-5 w-5 object-contain"
                            />
                          ) : (
                            <section.icon className="h-5 w-5" />
                          )}
                          {section.title}
                        </DialogTitle>
                        <DialogDescription>
                          {section.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        {renderSectionContent(section.id)}
                      </div>
                      <DialogFooter>
                        {section.id !== 'theme' && (
                          <Button 
                            onClick={handleSave} 
                            disabled={updateMutation.isPending}
                            className="w-full"
                          >
                            {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          </div>
        </main>
      </div>
      
      {/* Preview Modal */}
      <InvitationPreview
        invitation={getPreviewData()}
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  )
}
