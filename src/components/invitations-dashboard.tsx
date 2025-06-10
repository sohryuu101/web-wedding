import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
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
} from "lucide-react"
import { CreateInvitationDialog } from "./create-invitation-dialog"
import { InvitationStats } from "./invitation-stats"

interface Invitation {
  id: string
  title: string
  coupleNames: string
  weddingDate: string
  status: "draft" | "published" | "archived"
  theme: string
  views: number
  rsvps: number
  totalGuests: number
  lastModified: string
  thumbnail: string
  template: string
}

export function InvitationsDashboard() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Mock data for invitations
  const invitations: Invitation[] = [
    {
      id: "1",
      title: "Sarah & John's Wedding",
      coupleNames: "Sarah Johnson & John Smith",
      weddingDate: "2024-06-15",
      status: "published",
      theme: "Rose Garden",
      views: 1247,
      rsvps: 89,
      totalGuests: 120,
      lastModified: "2024-01-15",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Rose+Garden",
      template: "Classic Romance",
    },
    {
      id: "2",
      title: "Emma & Michael's Big Day",
      coupleNames: "Emma Davis & Michael Wilson",
      weddingDate: "2024-08-22",
      status: "draft",
      theme: "Ocean Breeze",
      views: 234,
      rsvps: 12,
      totalGuests: 80,
      lastModified: "2024-01-10",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Ocean+Breeze",
      template: "Beach Vibes",
    },
    {
      id: "3",
      title: "Alex & Jamie's Celebration",
      coupleNames: "Alex Thompson & Jamie Lee",
      weddingDate: "2024-09-14",
      status: "published",
      theme: "Golden Sunset",
      views: 892,
      rsvps: 67,
      totalGuests: 95,
      lastModified: "2024-01-12",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Golden+Sunset",
      template: "Rustic Charm",
    },
    {
      id: "4",
      title: "Lisa & David's Wedding",
      coupleNames: "Lisa Brown & David Garcia",
      weddingDate: "2023-12-10",
      status: "archived",
      theme: "Winter Wonderland",
      views: 2156,
      rsvps: 142,
      totalGuests: 150,
      lastModified: "2023-12-15",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Winter+Wonderland",
      template: "Elegant Classic",
    },
    {
      id: "5",
      title: "Ryan & Sophie's Adventure",
      coupleNames: "Ryan Miller & Sophie Anderson",
      weddingDate: "2024-07-08",
      status: "draft",
      theme: "Forest Green",
      views: 45,
      rsvps: 3,
      totalGuests: 60,
      lastModified: "2024-01-08",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Forest+Green",
      template: "Nature's Beauty",
    },
    {
      id: "6",
      title: "Mia & Chris's Celebration",
      coupleNames: "Mia Taylor & Chris Johnson",
      weddingDate: "2024-10-05",
      status: "published",
      theme: "Lavender Dreams",
      views: 567,
      rsvps: 34,
      totalGuests: 75,
      lastModified: "2024-01-14",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Lavender+Dreams",
      template: "Modern Minimalist",
    },
  ]

  const filteredInvitations = invitations.filter((invitation) => {
    const matchesSearch =
      invitation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.coupleNames.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || invitation.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return "🟢"
      case "draft":
        return "🟡"
      case "archived":
        return "⚪"
      default:
        return "⚪"
    }
  }

  const handleEdit = (id: string) => {
    navigate({ to: "/dashboard/edit/$id", params: { id } })
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Wedding Invitations</h1>
                <p className="text-xs sm:text-sm text-gray-500">Manage all your wedding invitations</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => setShowCreateDialog(true)} className="flex-1 sm:flex-none">
                <Plus className="h-4 w-4 mr-2" />
                New Invitation
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <InvitationStats invitations={invitations} />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search invitations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter: {filterStatus === "all" ? "All" : filterStatus}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Invitations</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("published")}>Published</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("archived")}>Archived</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Invitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvitations.map((invitation) => (
            <Card key={invitation.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={invitation.thumbnail || "/placeholder.svg"}
                  alt={invitation.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getStatusColor(invitation.status)}>
                    {getStatusIcon(invitation.status)} {invitation.status}
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
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(invitation.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{invitation.title}</CardTitle>
                <CardDescription>{invitation.coupleNames}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(invitation.weddingDate).toLocaleDateString()}
                  </div>
                  <Badge variant="outline">{invitation.theme}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{invitation.views}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{invitation.rsvps}</p>
                    <p className="text-xs text-gray-500">RSVPs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{invitation.totalGuests}</p>
                    <p className="text-xs text-gray-500">Guests</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-gray-500">
                    Modified {new Date(invitation.lastModified).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleEdit(invitation.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredInvitations.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invitations found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first wedding invitation"}
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Invitation
            </Button>
          </div>
        )}
      </div>

      {/* Create Invitation Dialog */}
      <CreateInvitationDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
