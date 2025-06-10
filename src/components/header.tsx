import { Button } from "@/components/ui/button"
import { Heart, Save, Eye, Share2 } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Wedding Invitation</h1>
            <p className="text-xs sm:text-sm text-gray-500">Create your perfect invitation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:space-x-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none text-xs sm:text-sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}
