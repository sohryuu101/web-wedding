import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

export function CoupleDetails() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Meet the Couple</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bride */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center">
                <span className="text-6xl">👰</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif text-gray-800">Sarah Elizabeth</h3>
                <p className="text-rose-600 font-medium">The Bride</p>
                <p className="text-gray-600 leading-relaxed">
                  Daughter of Mr. & Mrs. Robert Johnson. Sarah is a passionate photographer who loves capturing life's
                  beautiful moments. She enjoys hiking, reading, and spending time with her rescue dog, Luna.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Groom */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center">
                <span className="text-6xl">🤵</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif text-gray-800">John Michael</h3>
                <p className="text-blue-600 font-medium">The Groom</p>
                <p className="text-gray-600 leading-relaxed">
                  Son of Mr. & Mrs. David Smith. John is a software engineer who loves building things and solving
                  problems. He enjoys cooking, playing guitar, and exploring new coffee shops around the city.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Together */}
        <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <Heart className="h-12 w-12 text-rose-500 mx-auto" />
            <h3 className="text-2xl font-serif text-gray-800">Together Since 2019</h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Sarah and John met at a local coffee shop where John was working on his laptop and Sarah was editing
              photos. A spilled latte led to their first conversation, and they've been inseparable ever since. They got
              engaged on a hiking trip to their favorite mountain overlook in October 2023.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
