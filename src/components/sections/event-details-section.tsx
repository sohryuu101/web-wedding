import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Plus, Trash2 } from "lucide-react"

export function EventDetailsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Event Details</h2>
        <p className="text-gray-600 mt-2">Add all the important details about your wedding events</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-rose-500" />
            Main Wedding Ceremony
          </CardTitle>
          <CardDescription>Primary wedding ceremony details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wedding-date">Wedding Date</Label>
              <Input id="wedding-date" type="date" />
            </div>
            <div>
              <Label htmlFor="wedding-time">Time</Label>
              <Input id="wedding-time" type="time" />
            </div>
          </div>
          <div>
            <Label htmlFor="wedding-venue">Venue Name</Label>
            <Input id="wedding-venue" placeholder="Enter venue name" />
          </div>
          <div>
            <Label htmlFor="wedding-address">Address</Label>
            <Textarea id="wedding-address" placeholder="Full venue address" />
          </div>
          <div>
            <Label htmlFor="wedding-description">Event Description</Label>
            <Textarea id="wedding-description" placeholder="Describe the ceremony..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Additional Events
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardTitle>
          <CardDescription>Add pre-wedding events, reception, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {["Engagement"].map((event, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{event}</h4>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label>Venue</Label>
                <Input placeholder="Venue name" />
              </div>
              <div>
                <Label>Address</Label>
                <Input placeholder="Venue address" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      
    </div>
  )
}
