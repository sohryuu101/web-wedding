import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Gift, CreditCard, DollarSign, Heart, Plus, Trash2 } from "lucide-react"

export function DigitalGiftSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Hadiah Digital</h2>
        <p className="text-gray-600 mt-2">Atur opsi hadiah digital untuk tamu Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-green-500" />
            Pengaturan Hadiah Digital
          </CardTitle>
          <CardDescription>Konfigurasi opsi hadiah digital Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-gifts">Aktifkan Hadiah Digital</Label>
              <p className="text-sm text-gray-500">Izinkan tamu untuk mengirim hadiah digital</p>
            </div>
            <Switch id="enable-gifts" />
          </div>

          <div>
            <Label htmlFor="gift-message">Pesan Bagian Hadiah</Label>
            <Textarea
              id="gift-message"
              placeholder="Kehadiran Anda adalah hadiah terbaik bagi kami, namun jika Anda ingin memberikan hadiah..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
            Rekening Bank
          </CardTitle>
          <CardDescription>Tambahkan rekening bank untuk menerima hadiah</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Nama Bank</Label>
              <Input id="bank-name" placeholder="Contoh: Bank BCA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
              <Input id="account-name" placeholder="Masukkan nama pemilik rekening" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Nomor Rekening</Label>
              <Input id="account-number" placeholder="Masukkan nomor rekening" />
            </div>
          </div>

          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Rekening Bank
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
            Dompet Digital
          </CardTitle>
          <CardDescription>Tambahkan opsi dompet digital</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet-type">Jenis Dompet Digital</Label>
              <Input id="wallet-type" placeholder="Contoh: GoPay, OVO, DANA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-name">Nama Pemilik</Label>
              <Input id="wallet-name" placeholder="Masukkan nama pemilik" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet-number">Nomor Dompet Digital</Label>
              <Input id="wallet-number" placeholder="Masukkan nomor dompet digital" />
            </div>
          </div>

          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Dompet Digital
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Gift Registry Items</span>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
          <CardDescription>Create a list of specific items guests can contribute towards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Honeymoon Fund", "Home Down Payment", "Kitchen Appliances"].map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{item}</h4>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Item name" defaultValue={item} />
                <Input placeholder="Target amount" type="number" />
                <Input placeholder="Current amount" type="number" />
              </div>
              <Textarea placeholder="Item description..." />
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gift Suggestions</CardTitle>
          <CardDescription>Provide suggested gift amounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["$25", "$50", "$100", "$200"].map((amount) => (
              <div key={amount} className="border rounded-lg p-4 text-center">
                <p className="text-lg font-semibold">{amount}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Select
                </Button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input placeholder="Custom amount" type="number" />
            <Button variant="outline">Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Thank You Messages
          </CardTitle>
          <CardDescription>Customize thank you messages for gift givers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="thank-you-title">Thank You Title</Label>
            <Input id="thank-you-title" placeholder="Thank You!" />
          </div>
          <div>
            <Label htmlFor="thank-you-message">Thank You Message</Label>
            <Textarea id="thank-you-message" placeholder="Thank you so much for your generous gift..." />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-thank-you">Send Automatic Thank You</Label>
              <p className="text-sm text-gray-500">Automatically send thank you messages</p>
            </div>
            <Switch id="auto-thank-you" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gift Display Settings</CardTitle>
          <CardDescription>Configure how gifts are displayed to guests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-gift-amounts">Show Gift Amounts</Label>
              <p className="text-sm text-gray-500">Display how much has been contributed</p>
            </div>
            <Switch id="show-gift-amounts" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-giver-names">Show Giver Names</Label>
              <p className="text-sm text-gray-500">Display names of people who gave gifts</p>
            </div>
            <Switch id="show-giver-names" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-progress">Show Progress Bars</Label>
              <p className="text-sm text-gray-500">Display progress towards gift goals</p>
            </div>
            <Switch id="show-progress" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
