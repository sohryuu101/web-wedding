import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

export function MusicSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Musik Pernikahan</h2>
        <p className="text-gray-600 mt-2">Atur musik untuk pernikahan Anda</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Musik</CardTitle>
          <CardDescription>Konfigurasi musik untuk undangan pernikahan Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-music">Aktifkan Musik</Label>
              <p className="text-sm text-gray-500">Putar musik otomatis saat undangan dibuka</p>
            </div>
            <Switch id="enable-music" />
          </div>

          <div>
            <Label htmlFor="background-music">Musik Latar</Label>
            <div className="flex gap-4">
              <Input
                id="background-music"
                placeholder="URL musik atau ID YouTube"
                className="flex-1"
              />
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Unggah
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Mendukung file MP3 atau link YouTube
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lagu Spesial</CardTitle>
          <CardDescription>Pilih lagu-lagu yang bermakna dalam hubungan Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="our-song">Lagu Kami</Label>
            <Input id="our-song" placeholder="Lagu yang mewakili hubungan Anda" />
          </div>
          <div>
            <Label htmlFor="first-dance">Lagu Dansa Pertama</Label>
            <Input id="first-dance" placeholder="Lagu untuk dansa pertama Anda" />
          </div>
          <div>
            <Label htmlFor="ceremony-music">Musik Upacara</Label>
            <Input id="ceremony-music" placeholder="Musik untuk prosesi pernikahan" />
          </div>
          <div>
            <Label htmlFor="song-story">Cerita di Balik Lagu</Label>
            <Textarea id="song-story" placeholder="Ceritakan kisah di balik lagu spesial Anda..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rekomendasi Lagu</CardTitle>
          <CardDescription>Lagu pernikahan populer yang bisa Anda pilih</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Pernikahan Impian - Rossa",
              "Menikahimu - Kahitna",
              "Aku Cinta Kau dan Dia - T.R.I.A.D",
              "Sampai Menutup Mata - Acha Septriasa",
              "Tulus - Teman Hidup",
              "Raisa - Kali Kedua",
            ].map((song, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">{song}</span>
                <Button variant="outline" size="sm">
                  Tambah
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
