import { Button } from "@/components/ui/button"
import { Heart, Save, Eye, Share2 } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-rose-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Wedding Invitation</h1>
            <p className="text-sm text-gray-500">Create your perfect invitation</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </header>
  )
}
