import { cn } from "@/lib/utils"
import {
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
]

export function SidebarDashboard({ activeSection, setActiveSection }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed
        ? "w-18 md:w-18 sm:w-14"
        : "w-64 md:w-64 sm:w-20"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && <h2 className="text-lg font-semibold text-gray-900">Wedding Invitation.</h2>}
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
        <ul className="space-y-1">
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
                  <Icon className="h-6 w-6" />
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
