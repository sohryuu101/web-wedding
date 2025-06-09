import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, Calendar, Plus } from "lucide-react"

export function NotificationSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Notifications</h2>
        <p className="text-gray-600 mt-2">Set up automated notifications and reminders for your guests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-500" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure how and when to notify your guests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">Send email reminders to guests</p>
            </div>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-gray-500">Send text message reminders</p>
            </div>
            <Switch id="sms-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-gray-500">Send app notifications</p>
            </div>
            <Switch id="push-notifications" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              Scheduled Reminders
            </span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </CardTitle>
          <CardDescription>Set up automatic reminders for your wedding events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Save the Date", "RSVP Reminder", "Wedding Day Reminder"].map((reminder, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{reminder}</h4>
                <Switch />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Send Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Send Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="Customize the reminder message..." />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-purple-500" />
            Email Templates
          </CardTitle>
          <CardDescription>Customize email templates for different notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email-subject">Email Subject</Label>
            <Input id="email-subject" placeholder="You're Invited to Our Wedding!" />
          </div>
          <div>
            <Label htmlFor="email-greeting">Email Greeting</Label>
            <Input id="email-greeting" placeholder="Dear [Guest Name]," />
          </div>
          <div>
            <Label htmlFor="email-body">Email Body</Label>
            <Textarea id="email-body" placeholder="Write your email message here..." className="min-h-[150px]" />
          </div>
          <div>
            <Label htmlFor="email-signature">Email Signature</Label>
            <Textarea id="email-signature" placeholder="With love,\n[Bride & Groom Names]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-orange-500" />
            RSVP Management
          </CardTitle>
          <CardDescription>Manage guest responses and follow-ups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-rsvp-reminder">Automatic RSVP Reminders</Label>
              <p className="text-sm text-gray-500">Send reminders to guests who haven't responded</p>
            </div>
            <Switch id="auto-rsvp-reminder" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rsvp-deadline">RSVP Deadline</Label>
              <Input id="rsvp-deadline" type="date" />
            </div>
            <div>
              <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="rsvp-message">RSVP Reminder Message</Label>
            <Textarea id="rsvp-message" placeholder="Please don't forget to RSVP..." />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
