import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Youtube, Facebook, Instagram } from "lucide-react"

export function LiveStreamingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Live Streaming</h2>
        <p className="text-gray-600 mt-2">Set up live streaming for guests who can't attend in person</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Streaming Platforms</CardTitle>
          <CardDescription>Choose where to broadcast your wedding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Youtube className="h-6 w-6 text-red-600" />
                  <span className="font-medium">YouTube Live</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="YouTube Link" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">Facebook Live</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="Facebook Link" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <span className="font-medium">Instagram Live</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="Instagram Link" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
