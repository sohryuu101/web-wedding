import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Video, Heart } from "lucide-react"

export function VideoSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  const videos = [
    {
      id: "engagement",
      title: "Our Engagement Story",
      description: "Watch John tell the story of how he proposed",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Engagement+Video",
      duration: "2:30",
    },
    {
      id: "save-the-date",
      title: "Save the Date Video",
      description: "A fun video we made to announce our wedding date",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Save+the+Date",
      duration: "1:45",
    },
    {
      id: "love-story",
      title: "Our Love Story",
      description: "From coffee shop to forever - our journey together",
      thumbnail: "/placeholder.svg?height=200&width=300&text=Love+Story",
      duration: "3:15",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Our Videos</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          <p className="text-gray-600 text-lg">Watch our journey unfold</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-t-lg">
                    <Button
                      size="lg"
                      className="bg-white/90 hover:bg-white text-gray-800 rounded-full w-16 h-16"
                      onClick={() => setPlayingVideo(video.id)}
                    >
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-serif text-lg text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Video */}
        <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-gray-800 flex items-center">
              <Video className="h-6 w-6 text-rose-500 mr-3" />
              Featured: Our Engagement Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <Play className="h-16 w-16 text-gray-400 mx-auto" />
                <p className="text-gray-600">Click to watch our engagement story</p>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="h-12 w-12 text-rose-500 mx-auto" />
            <h3 className="text-2xl font-serif text-gray-800">Live Stream Our Wedding</h3>
            <p className="text-gray-600">Can't make it in person? Join us virtually for our ceremony</p>
            <Button variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
              Get Live Stream Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
