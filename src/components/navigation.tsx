import { Button } from "@/components/ui/button"
import { Heart, Users, Calendar, BookOpen, Camera, Video, Gift } from "lucide-react"

interface NavigationProps {
  currentSection: string
  setCurrentSection: (section: string) => void
}

export function Navigation({ currentSection, setCurrentSection }: NavigationProps) {
  const navItems = [
    { id: "cover", label: "Cover", icon: Heart },
    { id: "couple", label: "Couple", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "story", label: "Our Story", icon: BookOpen },
    { id: "gallery", label: "Gallery", icon: Camera },
    { id: "videos", label: "Videos", icon: Video },
    { id: "gifts", label: "Gifts", icon: Gift },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-rose-200">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentSection(item.id)}
                className={`rounded-full ${
                  currentSection === item.id
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
