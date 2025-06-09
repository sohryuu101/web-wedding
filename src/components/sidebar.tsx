import { cn } from "@/lib/utils"
import {
  ImageIcon,
  Palette,
  Users,
  Calendar,
  Quote,
  Bell,
  Heart,
  Camera,
  Video,
  Radio,
  Gift,
  Music,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import {
  IconDashboard
} from "@tabler/icons-react"
import { useState } from "react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  {id: "dashboard", label: "Dashboard", icon: IconDashboard },
  { id: "cover", label: "Cover Design", icon: ImageIcon },
  { id: "themes", label: "Themes", icon: Palette },
  { id: "bride-groom", label: "Bride & Groom", icon: Users },
  { id: "event-details", label: "Event Details", icon: Calendar },
  { id: "quotes", label: "Quotes", icon: Quote },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "love-story", label: "Love Story", icon: Heart },
  { id: "photo-gallery", label: "Photo Gallery", icon: Camera },
  { id: "video-gallery", label: "Video Gallery", icon: Video },
  { id: "live-streaming", label: "Live Streaming", icon: Radio },
  { id: "digital-gifts", label: "Digital Gifts", icon: Gift },
  { id: "music", label: "Music", icon: Music },
]

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-18" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-semibold text-gray-900">Editor</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeSection === item.id
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
