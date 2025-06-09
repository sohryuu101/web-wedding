import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Music, Upload, Play, Volume2, Plus, Trash2, Heart } from "lucide-react"

export function MusicSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Music</h2>
        <p className="text-gray-600 mt-2">Add beautiful music to enhance your wedding invitation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Music className="h-5 w-5 mr-2 text-purple-500" />
            Background Music
          </CardTitle>
          <CardDescription>Set background music for your invitation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-music">Enable Background Music</Label>
              <p className="text-sm text-gray-500">Play music when guests view your invitation</p>
            </div>
            <Switch id="enable-music" />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Music className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">Upload Your Music</p>
            <p className="text-sm text-gray-500 mb-4">Supported formats: MP3, WAV (Max 10MB)</p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Music File
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Music Playlist</span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Song
            </Button>
          </CardTitle>
          <CardDescription>Create a playlist for your invitation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Perfect - Ed Sheeran", "All of Me - John Legend", "Thinking Out Loud - Ed Sheeran"].map((song, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <h4 className="font-medium">{song}</h4>
                  <p className="text-sm text-gray-500">3:42</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                <div className="bg-purple-500 h-1 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Music Settings</CardTitle>
          <CardDescription>Configure how music plays in your invitation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="music-volume">Default Volume</Label>
              <div className="flex items-center space-x-3 mt-2">
                <Volume2 className="h-4 w-4" />
                <input type="range" className="flex-1" min="0" max="100" defaultValue="50" />
                <span className="text-sm text-gray-500">50%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="fade-duration">Fade Duration (seconds)</Label>
              <Input id="fade-duration" type="number" placeholder="3" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoplay">Autoplay Music</Label>
                <p className="text-sm text-gray-500">Start playing music automatically</p>
              </div>
              <Switch id="autoplay" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loop-music">Loop Playlist</Label>
                <p className="text-sm text-gray-500">Repeat playlist when it ends</p>
              </div>
              <Switch id="loop-music" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-controls">Show Music Controls</Label>
                <p className="text-sm text-gray-500">Allow guests to control music playback</p>
              </div>
              <Switch id="show-controls" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mute-option">Allow Mute</Label>
                <p className="text-sm text-gray-500">Let guests mute the music</p>
              </div>
              <Switch id="mute-option" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Songs</CardTitle>
          <CardDescription>Highlight meaningful songs in your relationship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="our-song">Our Song</Label>
            <Input id="our-song" placeholder="The song that represents your relationship" />
          </div>
          <div>
            <Label htmlFor="first-dance">First Dance Song</Label>
            <Input id="first-dance" placeholder="Your first dance song" />
          </div>
          <div>
            <Label htmlFor="ceremony-music">Ceremony Music</Label>
            <Input id="ceremony-music" placeholder="Music for walking down the aisle" />
          </div>
          <div>
            <Label htmlFor="song-story">Song Story</Label>
            <Textarea id="song-story" placeholder="Tell the story behind your special song..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Music Recommendations</CardTitle>
          <CardDescription>Popular wedding songs to consider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Perfect - Ed Sheeran",
              "All of Me - John Legend",
              "Marry Me - Train",
              "A Thousand Years - Christina Perri",
              "Thinking Out Loud - Ed Sheeran",
              "Make You Feel My Love - Adele",
            ].map((song, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{song}</span>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
