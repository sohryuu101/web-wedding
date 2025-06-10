import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Car } from "lucide-react"

export function EventDetails() {
  const events = [
    {
      title: "Wedding Ceremony",
      date: "June 15th, 2024",
      time: "4:00 PM",
      venue: "Rosewood Manor Gardens",
      address: "123 Vineyard Lane, Napa Valley, CA 94558",
      description: "Join us for our outdoor ceremony in the beautiful rose gardens.",
      dresscode: "Garden Party Attire",
    },
    {
      title: "Cocktail Hour",
      date: "June 15th, 2024",
      time: "5:00 PM",
      venue: "Rosewood Manor Terrace",
      address: "123 Vineyard Lane, Napa Valley, CA 94558",
      description: "Enjoy cocktails and hors d'oeuvres on the terrace overlooking the valley.",
      dresscode: "Same as ceremony",
    },
    {
      title: "Reception & Dinner",
      date: "June 15th, 2024",
      time: "6:30 PM",
      venue: "Rosewood Manor Ballroom",
      address: "123 Vineyard Lane, Napa Valley, CA 94558",
      description: "Dinner, dancing, and celebration under the stars.",
      dresscode: "Same as ceremony",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-gray-800">Event Details</h2>
          <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          <p className="text-gray-600 text-lg">Join us for a day of love and celebration</p>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-rose-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-gray-800 flex items-center">
                  <Calendar className="h-6 w-6 text-rose-500 mr-3" />
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-rose-500" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-rose-500" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-rose-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{event.venue}</p>
                        <p className="text-sm text-gray-600">{event.address}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600">{event.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Dress Code:</strong> {event.dresscode}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" size="sm" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" size="sm" className="border-rose-300 text-rose-600 hover:bg-rose-50">
                    <Car className="h-4 w-4 mr-2" />
                    Parking Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-serif">RSVP Required</h3>
            <p className="text-rose-100">Please respond by May 1st, 2024</p>
            <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50">
              RSVP Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
