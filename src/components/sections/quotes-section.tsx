import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Quote, Plus, Trash2, Heart } from "lucide-react"

export function QuotesSection() {
  const inspirationalQuotes = [
    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    "A successful marriage requires falling in love many times, always with the same person.",
    "The best thing to hold onto in life is each other.",
    "Love is composed of a single soul inhabiting two bodies.",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Quotes</h2>
        <p className="text-gray-600 mt-2">Add meaningful quotes and messages to your invitation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Quote className="h-5 w-5 mr-2 text-rose-500" />
            Featured Quote
          </CardTitle>
          <CardDescription>Main quote that will appear prominently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="main-quote">Quote Text</Label>
            <Textarea id="main-quote" placeholder="Enter your main quote here..." className="min-h-[100px]" />
          </div>
          <div>
            <Label htmlFor="quote-author">Author (Optional)</Label>
            <Input id="quote-author" placeholder="Quote author" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-pink-500" />
              Additional Quotes
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Quote
            </Button>
          </CardTitle>
          <CardDescription>Add more quotes throughout your invitation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Quote {index}</h4>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea placeholder="Enter quote text..." />
              <Input placeholder="Author (optional)" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inspirational Quotes</CardTitle>
          <CardDescription>Choose from our collection of beautiful wedding quotes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inspirationalQuotes.map((quote, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-700 italic">"{quote}"</p>
                </div>
                <Button variant="outline" size="sm" className="ml-4">
                  Use This
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Messages</CardTitle>
          <CardDescription>Add personal messages from family and friends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="family-message">Message from Families</Label>
              <Textarea id="family-message" placeholder="Message from both families..." />
            </div>
            <div>
              <Label htmlFor="couple-message">Message from Couple</Label>
              <Textarea id="couple-message" placeholder="Your message to guests..." />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
