"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Calendar, MapPin, ArrowDown } from "lucide-react"

export function WeddingCover() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 text-rose-300">
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 text-pink-300">
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 text-rose-200">
          <Heart className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 right-10 w-12 h-12 text-pink-200">
          <Heart className="w-full h-full" />
        </div>
      </div>

      <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border-rose-200 shadow-2xl">
        <div className="p-12 text-center space-y-8">
          {/* Save the Date */}
          <div className="space-y-2">
            <p className="text-rose-600 font-medium tracking-widest uppercase text-sm">Save The Date</p>
            <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          </div>

          {/* Names */}
          <div className="space-y-4">
            <h1 className="text-6xl font-serif text-gray-800 leading-tight">
              Sarah
              <span className="block text-4xl text-rose-500 font-light my-2">&</span>
              John
            </h1>
          </div>

          {/* Quote */}
          <div className="space-y-4">
            <p className="text-lg text-gray-600 italic font-light leading-relaxed">
              "Two souls with but a single thought, two hearts that beat as one"
            </p>
          </div>

          {/* Date & Location */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <Calendar className="h-5 w-5 text-rose-500" />
              <span className="text-lg font-medium">June 15th, 2024</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <MapPin className="h-5 w-5 text-rose-500" />
              <span className="text-lg">Rosewood Manor, Napa Valley</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <Button
              size="lg"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-medium tracking-wide"
            >
              View Our Invitation
            </Button>
          </div>
        </div>
      </Card>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-rose-400" />
      </div>
    </div>
  )
}
