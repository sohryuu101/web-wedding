"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Heart, X } from "lucide-react"

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const albums = [
    {
      title: "Engagement Photos",
      photos: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        src: `/placeholder.svg?height=300&width=300&text=Engagement+${i + 1}`,
        alt: `Engagement photo ${i + 1}`,
      })),
    },
    {
      title: "Adventures Together",
      photos: Array.from({ length: 6 }, (_, i) => ({
        id: i + 8,
        src: `/placeholder.svg?height=300&width=300&text=Adventure+${i + 1}`,
        alt: `Adventure photo ${i + 1}`,
      })),
    },
    {
      title: "Family & Friends",
      photos: Array.from({ length: 4 }, (_, i) => ({
        id: i + 14,
        src: `/placeholder.svg?height=300&width=300&text=Family+${i + 1}`,
        alt: `Family photo ${i + 1}`,
      })),
    },
  ]

  const allPhotos = albums.flatMap((album) => album.photos)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Photo Gallery</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          <p className="text-gray-600 text-lg">Capturing our beautiful moments together</p>
        </div>

        {albums.map((album, albumIndex) => (
          <Card key={albumIndex} className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-800 flex items-center">
                <Camera className="h-6 w-6 text-rose-500 mr-3" />
                {album.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {album.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
                    onClick={() => setSelectedImage(photo.id)}
                  >
                    <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={allPhotos.find((p) => p.id === selectedImage)?.src || "/placeholder.svg"}
                alt={allPhotos.find((p) => p.id === selectedImage)?.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="h-12 w-12 text-rose-500 mx-auto" />
            <h3 className="text-2xl font-serif text-gray-800">Share Your Photos</h3>
            <p className="text-gray-600">
              We'd love to see your photos from our special day! Share them with us using the hashtag
            </p>
            <p className="text-2xl font-bold text-rose-600">#SarahAndJohn2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
