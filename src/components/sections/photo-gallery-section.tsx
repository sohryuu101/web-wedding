import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, Plus, Trash2, Grid, List } from "lucide-react"

export function PhotoGallerySection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Photo Gallery</h2>
        <p className="text-gray-600 mt-2">Create beautiful photo galleries for your invitation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-blue-500" />
              Upload Photos
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Add photos to your gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop your photos here</p>
            <p className="text-sm text-gray-500 mb-4">or click to browse and select multiple files</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Photos
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-white">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gallery Albums</span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Album
            </Button>
          </CardTitle>
          <CardDescription>Organize your photos into themed albums</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Engagement Photos", "Pre-Wedding Shoot", "Family Photos"].map((album, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">{album}</h4>
                  <p className="text-sm text-gray-500">12 photos</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 6 }).map((_, photoIndex) => (
                  <div key={photoIndex} className="aspect-square bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Settings</CardTitle>
          <CardDescription>Configure how your photo gallery appears</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gallery-title">Gallery Title</Label>
              <Input id="gallery-title" placeholder="Our Beautiful Moments" />
            </div>
            <div>
              <Label htmlFor="gallery-layout">Layout Style</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Grid Layout</option>
                <option>Masonry Layout</option>
                <option>Carousel</option>
                <option>Slideshow</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="photos-per-row">Photos per Row</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div>
              <Label htmlFor="photo-spacing">Photo Spacing</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-lightbox">Enable Lightbox</Label>
              <p className="text-sm text-gray-500">Allow guests to view full-size photos</p>
            </div>
            <input type="checkbox" id="enable-lightbox" className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allow-download">Allow Photo Downloads</Label>
              <p className="text-sm text-gray-500">Let guests download photos</p>
            </div>
            <input type="checkbox" id="allow-download" className="rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
