"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react"

interface MusicPlayerProps {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

export function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)

  const playlist = [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { title: "All of Me", artist: "John Legend", duration: "4:29" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", duration: "4:41" },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-lg p-4 w-80">
        <div className="space-y-3">
          <div className="text-center">
            <h4 className="font-medium text-gray-800">{playlist[currentSong].title}</h4>
            <p className="text-sm text-gray-600">{playlist[currentSong].artist}</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-rose-500 h-1 rounded-full w-1/3"></div>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full w-10 h-10"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setCurrentSong((prev) => (prev + 1) % playlist.length)}>
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>1:23</span>
            <span>{playlist[currentSong].duration}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
