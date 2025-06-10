import { Card, CardContent } from "@/components/ui/card"
import { Heart, Coffee, BellRingIcon as Ring } from "lucide-react"

export function LoveStory() {
  const timeline = [
    {
      date: "March 2019",
      title: "First Met",
      icon: Coffee,
      description:
        "We met at Blue Bottle Coffee when John accidentally spilled his latte on Sarah's laptop. What started as an apology turned into a 3-hour conversation about photography, travel, and dreams.",
      image: "☕",
    },
    {
      date: "June 2019",
      title: "First Date",
      icon: Heart,
      description:
        "Our first official date was a picnic in Golden Gate Park. John brought homemade sandwiches and Sarah brought her camera. We spent the day laughing, talking, and taking silly photos.",
      image: "🌸",
    },
    {
      date: "December 2020",
      title: "Moved In Together",
      icon: Heart,
      description:
        "After almost two years of dating, we decided to take the next step and move in together. Our first apartment was tiny but filled with love, laughter, and way too many plants.",
      image: "🏠",
    },
    {
      date: "October 2023",
      title: "The Proposal",
      icon: Ring,
      description:
        "John proposed at our favorite hiking spot overlooking the valley where we had our first adventure together. Sarah said yes before he could even finish asking the question!",
      image: "💍",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Our Love Story</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          <p className="text-gray-600 text-lg italic">"Every love story is beautiful, but ours is our favorite"</p>
        </div>

        <div className="space-y-8">
          {timeline.map((milestone, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center text-3xl">
                      {milestone.image}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-2xl font-serif text-gray-800">{milestone.title}</h3>
                      <span className="text-rose-600 font-medium">{milestone.date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-rose-100 to-pink-100 border-rose-200">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="h-12 w-12 text-rose-500 mx-auto" />
            <h3 className="text-2xl font-serif text-gray-800">Fun Facts About Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-gray-700">
                  <strong>Our Song:</strong> "Perfect" by Ed Sheeran
                </p>
                <p className="text-gray-700">
                  <strong>First Words:</strong> "I'm so sorry about your laptop!"
                </p>
                <p className="text-gray-700">
                  <strong>Favorite Date:</strong> Hiking and picnics
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Shared Hobby:</strong> Photography and cooking
                </p>
                <p className="text-gray-700">
                  <strong>Dream Destination:</strong> Japan
                </p>
                <p className="text-gray-700">
                  <strong>Pet Names:</strong> "Sunshine" and "Coffee Bean"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
