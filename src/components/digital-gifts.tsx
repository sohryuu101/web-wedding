import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Heart, Home, Plane, Coffee } from "lucide-react"

export function DigitalGifts() {
  const giftItems = [
    {
      title: "Honeymoon Fund",
      description: "Help us create magical memories in Japan",
      target: 5000,
      current: 3200,
      icon: Plane,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Home Down Payment",
      description: "Contributing to our first home together",
      target: 10000,
      current: 6800,
      icon: Home,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Coffee & Kitchen Fund",
      description: "For our love of cooking and coffee",
      target: 1500,
      current: 1200,
      icon: Coffee,
      color: "from-amber-400 to-amber-600",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Wedding Gifts</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          <p className="text-gray-600 text-lg">
            Your presence is the only present we need, but if you'd like to give a gift...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {giftItems.map((item, index) => {
            const Icon = item.icon
            const percentage = (item.current / item.target) * 100

            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-serif text-gray-800 flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mr-3`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{item.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">${item.current.toLocaleString()}</span>
                      <span className="text-gray-600">${item.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600">{Math.round(percentage)}% funded</p>
                  </div>

                  <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                    <Gift className="h-4 w-4 mr-2" />
                    Contribute
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-gray-800 text-center">Other Ways to Give</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <span className="text-2xl mb-1">💳</span>
                <span className="text-xs">PayPal</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <span className="text-2xl mb-1">💰</span>
                <span className="text-xs">Venmo</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <span className="text-2xl mb-1">🏦</span>
                <span className="text-xs">Zelle</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <span className="text-2xl mb-1">📱</span>
                <span className="text-xs">Cash App</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="h-12 w-12 mx-auto" />
            <h3 className="text-2xl font-serif">Thank You!</h3>
            <p className="text-rose-100">
              Your love and support mean the world to us. We can't wait to celebrate with you!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
