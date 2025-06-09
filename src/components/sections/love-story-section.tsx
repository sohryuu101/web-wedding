import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Plus, Trash2, Upload, Calendar } from "lucide-react"

export function LoveStorySection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Love Story</h2>
        <p className="text-gray-600 mt-2">Share your beautiful journey together</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-rose-500" />
            Our Story
          </CardTitle>
          <CardDescription>Tell the story of your relationship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="story-title">Story Title</Label>
            <Input id="story-title" placeholder="Our Love Story" />
          </div>
          <div>
            <Label htmlFor="story-content">Story Content</Label>
            <Textarea id="story-content" placeholder="Tell your love story here..." className="min-h-[200px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Timeline Milestones
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </CardTitle>
          <CardDescription>Add important dates and milestones in your relationship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {["First Met", "First Date", "Got Engaged"].map((milestone, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{milestone}</h4>
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
                  <Label>Location</Label>
                  <Input placeholder="Where did this happen?" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe this special moment..." />
              </div>
              <div>
                <Label>Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload a photo for this milestone</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fun Facts About Us</CardTitle>
          <CardDescription>Share interesting and fun facts about your relationship</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-words">First Words to Each Other</Label>
              <Input id="first-words" placeholder="What were your first words?" />
            </div>
            <div>
              <Label htmlFor="favorite-date">Favorite Date Activity</Label>
              <Input id="favorite-date" placeholder="Your favorite thing to do together" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shared-hobby">Shared Hobby</Label>
              <Input id="shared-hobby" placeholder="What do you both love doing?" />
            </div>
            <div>
              <Label htmlFor="favorite-song">Our Song</Label>
              <Input id="favorite-song" placeholder="Your special song" />
            </div>
          </div>
          <div>
            <Label htmlFor="fun-fact">Special Fun Fact</Label>
            <Textarea id="fun-fact" placeholder="Share a fun or unique fact about your relationship..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quotes from Friends & Family</CardTitle>
          <CardDescription>Add testimonials from people who know you best</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
          <div className="space-y-4">
            {[1, 2].map((index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Testimonial {index}</h4>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Person's name" />
                  <Input placeholder="Relationship to you" />
                </div>
                <Textarea placeholder="Their quote about you as a couple..." />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
