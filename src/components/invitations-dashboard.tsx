
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  Heart,
  Calendar,
  Settings,
  Bell,
  Download,
  Share2,
  LogOut,
  Plus,
} from "lucide-react"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { InvitationPreview } from "./invitation-preview"

export function InvitationsDashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, logout } = useAuth()
  const [showPreview, setShowPreview] = useState(false)


  // Fetch user's invitation
  const { data: invitationData, isLoading, error } = useQuery({
    queryKey: ['invitation'],
    queryFn: () => apiClient.getInvitation(),
  })

  const invitation = invitationData?.invitation
  const hasInvitation = invitationData?.hasInvitation || false

  // Delete invitation mutation
  const deleteMutation = useMutation({
    mutationFn: () => apiClient.deleteInvitation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation'] })
    },
  })

  // Toggle publish mutation
  const publishMutation = useMutation({
    mutationFn: () => apiClient.togglePublishInvitation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation'] })
    },
  })

  const getStatusColor = (published: boolean) => {
    return published 
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800"
  }

  const getStatusIcon = (published: boolean) => {
    return published ? "🟢" : "🟡"
  }

  const getStatusText = (published: boolean) => {
    return published ? "dipublikasikan" : "draf"
  }

  const handleEdit = () => {
    navigate({ to: "/dashboard/edit" })
  }

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus undangan ini?")) {
      deleteMutation.mutate()
    }
  }

  const handleTogglePublish = () => {
    publishMutation.mutate()
  }

  const handleLogout = async () => {
    await logout()
    navigate({ to: "/login" })
  }

  const handleCreateInvitation = () => {
    navigate({ to: "/setup" })
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const copyInvitationLink = () => {
    if (invitation) {
      const url = `${window.location.origin}/invitation/${invitation.slug}`
      navigator.clipboard.writeText(url)
      // You could add a toast notification here
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat undangan</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-4 sm:py-0 w-full gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-rose-500" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Undangan Pernikahan Saya</h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Selamat datang kembali, {user?.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Bell className="h-4 w-4 mr-2" />
                Notifikasi
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Settings className="h-4 w-4 mr-2" />
                Pengaturan
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex-1 sm:flex-none"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Keluar
              </Button>
              {!hasInvitation && (
                <Button onClick={handleCreateInvitation} className="flex-1 sm:flex-none">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Undangan
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {hasInvitation && invitation && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Heart className="h-4 w-4 text-rose-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {invitation.is_published ? 'Aktif' : 'Draf'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {invitation.is_published ? 'Dipublikasikan dan dapat dilihat' : 'Belum dipublikasikan'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dilihat</CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invitation.views}</div>
                <p className="text-xs text-muted-foreground">Total dilihat</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RSVP</CardTitle>
                <Heart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invitation.rsvps}</div>
                <p className="text-xs text-muted-foreground">Konfirmasi kehadiran</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tingkat Respons</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {invitation.views > 0 ? `${((invitation.rsvps / invitation.views) * 100).toFixed(1)}%` : '0%'}
                </div>
                <p className="text-xs text-muted-foreground">Tingkat konversi RSVP</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invitation Card or Empty State */}
        {hasInvitation && invitation ? (
          <div className="max-w-md mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={invitation.cover_image || "/placeholder.svg?height=200&width=300&text=Wedding+Invitation"}
                  alt={`${invitation.bride_name} & ${invitation.groom_name}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getStatusColor(invitation.is_published)}>
                    {getStatusIcon(invitation.is_published)} {getStatusText(invitation.is_published)}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handlePreview}>
                        <Eye className="h-4 w-4 mr-2" />
                        Pratinjau
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/invitation/${invitation.slug}`, '_blank')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat Langsung
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Ubah
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleTogglePublish}>
                        <Share2 className="h-4 w-4 mr-2" />
                        {invitation.is_published ? 'Batalkan Publikasi' : 'Publikasikan'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={copyInvitationLink}>
                        <Copy className="h-4 w-4 mr-2" />
                        Salin Tautan
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Ekspor
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={handleDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {invitation.bride_name} & {invitation.groom_name}
                </CardTitle>
                <CardDescription>{invitation.main_title}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(invitation.wedding_date).toLocaleDateString()}
                  </div>
                  <Badge variant="outline">{invitation.theme}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{invitation.views}</p>
                    <p className="text-xs text-gray-500">Dilihat</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{invitation.rsvps}</p>
                    <p className="text-xs text-gray-500">RSVP</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500">
                    Diubah {new Date(invitation.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePreview}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {invitation.is_published && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800 font-medium">
                      🎉 Undangan Anda sudah aktif!
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Bagikan tautan ini: <code className="bg-green-100 px-1 rounded">
                        {window.location.origin}/invitation/{invitation.slug}
                      </code>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Buat Undangan Pernikahan Anda</h3>
            <p className="text-gray-500 mb-4">
              Mulai dengan membuat undangan pernikahan yang indah.
              <br />
              Anda dapat membuat satu undangan per akun.
            </p>
            <Button onClick={handleCreateInvitation}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Undangan Pernikahan Saya
            </Button>
          </div>
        )}

        {/* Preview Modal */}
        <InvitationPreview
          invitation={invitation || null}
          open={showPreview}
          onOpenChange={setShowPreview}
        />
      </div>
    </div>
  )
}
