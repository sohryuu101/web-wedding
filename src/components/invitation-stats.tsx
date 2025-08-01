import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Heart, Users, TrendingUp } from "lucide-react"
import { Invitation } from "@/lib/api"

interface InvitationStatsProps {
  invitations: Invitation[]
}

export function InvitationStats({ invitations }: InvitationStatsProps) {
  const totalInvitations = invitations.length
  const totalViews = invitations.reduce((sum, inv) => sum + inv.views, 0)
  const totalRsvps = invitations.reduce((sum, inv) => sum + inv.rsvps, 0)
  const publishedInvitations = invitations.filter(inv => inv.is_published).length
  
  // Calculate response rate (RSVPs per view)
  const responseRate = totalViews > 0 ? ((totalRsvps / totalViews) * 100) : 0

  const stats = [
    {
      title: "Total Invitations",
      value: totalInvitations,
      icon: Heart,
      description: `${publishedInvitations} published`,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: Eye,
      description: "Across all invitations",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total RSVPs",
      value: totalRsvps,
      icon: Users,
      description: "Confirmed responses",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Response Rate",
      value: `${responseRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: "RSVPs per view",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-md`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
