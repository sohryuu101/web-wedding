import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Video, Upload, Plus, Trash2, Play, Link } from "lucide-react"

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
          <CardDescription>Add video files or embed from YouTube/Vimeo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">Upload Video Files</p>
            <p className="text-sm text-gray-500 mb-4">Supported formats: MP4, MOV, AVI (Max 100MB)</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Videos
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">OR</p>
          </div>

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Video Collection</span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Video
            </Button>
          </CardTitle>
          <CardDescription>Manage your video collection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Engagement Video", "Pre-Wedding Shoot", "Save the Date Video"].map((video, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-medium">{video}</h4>
                    <p className="text-sm text-gray-500">Duration: 2:30</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Video title" defaultValue={video} />
                    <Input placeholder="Video description" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Featured Video</CardTitle>
          <CardDescription>Select a main video to feature prominently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="featured-video">Choose Featured Video</Label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Engagement Video</option>
              <option>Pre-Wedding Shoot</option>
              <option>Save the Date Video</option>
            </select>
          </div>
          <div>
            <Label htmlFor="featured-title">Featured Video Title</Label>
            <Input id="featured-title" placeholder="Our Love Story" />
          </div>
          <div>
            <Label htmlFor="featured-description">Description</Label>
            <Textarea id="featured-description" placeholder="Describe your featured video..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Video Gallery Settings</CardTitle>
          <CardDescription>Configure video playback and display options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="video-layout">Gallery Layout</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Grid View</option>
                <option>List View</option>
                <option>Carousel</option>
              </select>
            </div>
            <div>
              <Label htmlFor="videos-per-row">Videos per Row</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoplay">Autoplay Videos</Label>
                <p className="text-sm text-gray-500">Automatically play videos when visible</p>
              </div>
              <input type="checkbox" id="autoplay" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mute-default">Mute by Default</Label>
                <p className="text-sm text-gray-500">Start videos muted</p>
              </div>
              <input type="checkbox" id="mute-default" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-controls">Show Video Controls</Label>
                <p className="text-sm text-gray-500">Display play/pause controls</p>
              </div>
              <input type="checkbox" id="show-controls" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allow-fullscreen">Allow Fullscreen</Label>
                <p className="text-sm text-gray-500">Enable fullscreen viewing</p>
              </div>
              <input type="checkbox" id="allow-fullscreen" className="rounded" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
