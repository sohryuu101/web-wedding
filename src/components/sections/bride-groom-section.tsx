import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, User } from "lucide-react"

export function BrideGroomSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Bride & Groom</h2>
        <p className="text-gray-600 mt-2">Add details about the happy couple</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-rose-500" />
              Bride Details
            </CardTitle>
            <CardDescription>Information about the bride</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-rose-300">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="bride-name">Full Name</Label>
              <Input id="bride-name" placeholder="Enter bride's full name" />
            </div>
            <div>
              <Label htmlFor="bride-parents">Parents</Label>
              <Input id="bride-parents" placeholder="Mr. & Mrs. Parent Names" />
            </div>
            <div>
              <Label htmlFor="bride-bio">Bio</Label>
              <Textarea id="bride-bio" placeholder="A short bio about the bride..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Groom Details
            </CardTitle>
            <CardDescription>Information about the groom</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-300">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="groom-name">Full Name</Label>
              <Input id="groom-name" placeholder="Enter groom's full name" />
            </div>
            <div>
              <Label htmlFor="groom-parents">Parents</Label>
              <Input id="groom-parents" placeholder="Mr. & Mrs. Parent Names" />
            </div>
            <div>
              <Label htmlFor="groom-bio">Bio</Label>
              <Textarea id="groom-bio" placeholder="A short bio about the groom..." />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Couple Information</CardTitle>
          <CardDescription>Additional details about the couple</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="relationship-start">Relationship Started</Label>
              <Input id="relationship-start" type="date" />
            </div>
            <div>
              <Label htmlFor="engagement-date">Engagement Date</Label>
              <Input id="engagement-date" type="date" />
            </div>
          </div>
          <div>
            <Label htmlFor="couple-story">How We Met</Label>
            <Textarea id="couple-story" placeholder="Tell the story of how you met..." />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
