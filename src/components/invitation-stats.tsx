import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Eye, Users, TrendingUp } from "lucide-react"

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

interface InvitationStatsProps {
  invitations: Invitation[]
}

export function InvitationStats({ invitations }: InvitationStatsProps) {
  const totalInvitations = invitations.length
  const publishedInvitations = invitations.filter((inv) => inv.status === "published").length
  const draftInvitations = invitations.filter((inv) => inv.status === "draft").length
  const totalViews = invitations.reduce((sum, inv) => sum + inv.views, 0)
  const totalRSVPs = invitations.reduce((sum, inv) => sum + inv.rsvps, 0)
  const totalGuests = invitations.reduce((sum, inv) => sum + inv.totalGuests, 0)

  const stats = [
    {
      title: "Total Invitations",
      value: totalInvitations,
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-100",
      description: `${publishedInvitations} published, ${draftInvitations} drafts`,
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Across all invitations",
    },
    {
      title: "Total RSVPs",
      value: totalRSVPs,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: `${totalGuests} total guests invited`,
    },
    {
      title: "Response Rate",
      value: totalGuests > 0 ? `${Math.round((totalRSVPs / totalGuests) * 100)}%` : "0%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      description: "Average across all invitations",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
