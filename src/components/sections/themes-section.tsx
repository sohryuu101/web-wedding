import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ThemesSection() {
  const themes = [
    { name: "Rose Garden", color: "bg-rose-500", description: "Romantic pink and rose theme" },
    { name: "Ocean Breeze", color: "bg-blue-500", description: "Calm blue and white theme" },
    { name: "Golden Sunset", color: "bg-amber-500", description: "Warm gold and orange theme" },
    { name: "Forest Green", color: "bg-green-500", description: "Natural green and earth tones" },
    { name: "Lavender Dreams", color: "bg-purple-500", description: "Soft purple and lilac theme" },
    { name: "Midnight Elegance", color: "bg-gray-800", description: "Sophisticated black and gold" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Themes</h2>
        <p className="text-gray-600 mt-2">Choose a beautiful theme for your wedding invitation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.name} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{theme.name}</CardTitle>
                <div className={`w-6 h-6 rounded-full ${theme.color}`}></div>
              </div>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Theme Preview</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Popular</Badge>
                  <Button size="sm">Apply Theme</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Theme</CardTitle>
          <CardDescription>Create your own custom color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input type="color" className="w-full h-10 rounded border" defaultValue="#f43f5e" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input type="color" className="w-full h-10 rounded border" defaultValue="#ec4899" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <input type="color" className="w-full h-10 rounded border" defaultValue="#fbbf24" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Background</label>
              <input type="color" className="w-full h-10 rounded border" defaultValue="#ffffff" />
            </div>
          </div>
          <Button className="mt-4">Save Custom Theme</Button>
        </CardContent>
      </Card>
    </div>
  )
}
