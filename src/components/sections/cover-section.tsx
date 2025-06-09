import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ImageIcon } from "lucide-react"

export function CoverSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Cover Design</h2>
        <p className="text-gray-600 mt-2">Design the perfect cover for your wedding invitation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cover Image</CardTitle>
            <CardDescription>Upload your main cover image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">Drag and drop your image here, or click to browse</p>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cover Text</CardTitle>
            <CardDescription>Add text overlay to your cover</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cover-title">Main Title</Label>
              <Input id="cover-title" placeholder="Save The Date" />
            </div>
            <div>
              <Label htmlFor="cover-subtitle">Subtitle</Label>
              <Input id="cover-subtitle" placeholder="We're Getting Married!" />
            </div>
            <div>
              <Label htmlFor="cover-message">Message</Label>
              <Textarea id="cover-message" placeholder="Join us for our special day..." />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Layout Options</CardTitle>
          <CardDescription>Choose your cover layout style</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Classic", "Modern", "Elegant", "Rustic"].map((style) => (
              <div key={style} className="border rounded-lg p-4 cursor-pointer hover:border-rose-300 transition-colors">
                <div className="aspect-[3/4] bg-gray-100 rounded mb-2"></div>
                <p className="text-sm font-medium text-center">{style}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
