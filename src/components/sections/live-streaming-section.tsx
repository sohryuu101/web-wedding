import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Radio, Youtube, Facebook, Instagram, Link, Settings } from "lucide-react"

export function LiveStreamingSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Live Streaming</h2>
        <p className="text-gray-600 mt-2">Set up live streaming for guests who can't attend in person</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Radio className="h-5 w-5 mr-2 text-red-500" />
            Live Stream Settings
          </CardTitle>
          <CardDescription>Configure your wedding live stream</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-streaming">Enable Live Streaming</Label>
              <p className="text-sm text-gray-500">Allow guests to watch your ceremony online</p>
            </div>
            <Switch id="enable-streaming" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stream-title">Stream Title</Label>
              <Input id="stream-title" placeholder="Sarah & John's Wedding Ceremony" />
            </div>
            <div>
              <Label htmlFor="stream-password">Stream Password (Optional)</Label>
              <Input id="stream-password" type="password" placeholder="Private stream password" />
            </div>
          </div>

          <div>
            <Label htmlFor="stream-description">Stream Description</Label>
            <Textarea id="stream-description" placeholder="Join us virtually for our special day..." />
          </div>
        </CardContent>
      </Card>

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
              <Input placeholder="YouTube Stream Key" />
              <Input placeholder="YouTube Channel URL" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  <span className="font-medium">Facebook Live</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="Facebook Stream Key" />
              <Input placeholder="Facebook Page URL" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <span className="font-medium">Instagram Live</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="Instagram Stream Key" />
              <Input placeholder="Instagram Account" />
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link className="h-6 w-6 text-gray-600" />
                  <span className="font-medium">Custom RTMP</span>
                </div>
                <Switch />
              </div>
              <Input placeholder="RTMP Server URL" />
              <Input placeholder="Stream Key" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stream Schedule</CardTitle>
          <CardDescription>Set when your live stream will be active</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stream-date">Stream Date</Label>
              <Input id="stream-date" type="date" />
            </div>
            <div>
              <Label htmlFor="stream-time">Start Time</Label>
              <Input id="stream-time" type="time" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stream-duration">Expected Duration (hours)</Label>
              <Input id="stream-duration" type="number" placeholder="3" />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>UTC-8 (PST)</option>
                <option>UTC-5 (EST)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (CET)</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="pre-stream-message">Pre-Stream Message</Label>
            <Textarea
              id="pre-stream-message"
              placeholder="The ceremony will begin shortly. Thank you for joining us virtually..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            Technical Settings
          </CardTitle>
          <CardDescription>Configure streaming quality and technical options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="video-quality">Video Quality</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>1080p (Full HD)</option>
                <option>720p (HD)</option>
                <option>480p (SD)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="audio-quality">Audio Quality</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>High (320 kbps)</option>
                <option>Medium (192 kbps)</option>
                <option>Low (128 kbps)</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-chat">Enable Live Chat</Label>
                <p className="text-sm text-gray-500">Allow viewers to send messages during the stream</p>
              </div>
              <Switch id="enable-chat" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="record-stream">Record Stream</Label>
                <p className="text-sm text-gray-500">Save the live stream for later viewing</p>
              </div>
              <Switch id="record-stream" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="backup-stream">Backup Stream</Label>
                <p className="text-sm text-gray-500">Enable redundant streaming for reliability</p>
              </div>
              <Switch id="backup-stream" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guest Access</CardTitle>
          <CardDescription>Manage who can access your live stream</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="access-type">Access Type</Label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>Public - Anyone with the link</option>
              <option>Private - Password protected</option>
              <option>Invite Only - Specific guest list</option>
            </select>
          </div>
          <div>
            <Label htmlFor="stream-link">Stream Link</Label>
            <div className="flex space-x-2">
              <Input id="stream-link" value="https://wedding-stream.com/sarah-john-2024" readOnly />
              <Button variant="outline">Copy</Button>
            </div>
          </div>
          <div>
            <Label htmlFor="guest-instructions">Instructions for Guests</Label>
            <Textarea id="guest-instructions" placeholder="How guests can access and view the stream..." />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
