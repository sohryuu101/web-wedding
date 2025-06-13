import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, Link } from "lucide-react"

export function VideoGallerySection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Video Gallery</h2>
        <p className="text-gray-600 mt-2">Add videos to make your invitation more engaging</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="h-5 w-5 mr-2 text-purple-500" />
            Upload Videos
          </CardTitle>
          <CardDescription>Embed from YouTube/Vimeo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
      

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <Link className="h-4 w-4 mr-2" />
              Embed from URL
            </h4>
            <div className="space-y-3">
              <Input placeholder="Paste YouTube or Vimeo URL here..." />
              <Button variant="outline" className="w-full">
                Add Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      
    </div>
  )
}
