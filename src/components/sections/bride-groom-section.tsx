import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { useState } from "react"

export function BrideGroomSection() {
  const [bridePhoto, setBridePhoto] = useState<File | null>(null)
  const [bridePhotoPreview, setBridePhotoPreview] = useState<string>("")
  const [groomPhoto, setGroomPhoto] = useState<File | null>(null)
  const [groomPhotoPreview, setGroomPhotoPreview] = useState<string>("")

  const handleBridePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBridePhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setBridePhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGroomPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setGroomPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setGroomPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mempelai Wanita</h2>
        <p className="text-gray-600 mt-2">Atur detail mempelai wanita</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Photo Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Foto</Label>
            <div className="flex items-center space-x-4">
              {bridePhotoPreview ? (
                <div className="relative">
                  <img 
                    src={bridePhotoPreview} 
                    alt="Bride preview" 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setBridePhoto(null)
                      setBridePhotoPreview("")
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="bride-photo"
                  accept="image/*"
                  onChange={handleBridePhotoUpload}
                  className="hidden"
                />
                <label htmlFor="bride-photo">
                  <Button variant="outline" className="cursor-pointer">
                    Browse...
                  </Button>
                </label>
                {bridePhoto && (
                  <p className="text-sm text-gray-500 mt-1">{bridePhoto.name}</p>
                )}
                <p className="text-sm text-gray-500">Maximum file size: 1 MB</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="bride-full-name" className="text-base font-medium">
              Nama Lengkap
            </Label>
            <Input 
              id="bride-full-name" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Siska Khansa</p>
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <Label htmlFor="bride-nickname" className="text-base font-medium">
              Nama Panggilan
            </Label>
            <Input 
              id="bride-nickname" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Siska</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="bride-description" className="text-base font-medium">
              Deskripsi
            </Label>
            <Textarea 
              id="bride-description" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Putri dari Bapak Agus & Ibu Sri</p>
          </div>

          {/* Instagram Profile */}
          <div className="space-y-2">
            <Label htmlFor="bride-instagram" className="text-base font-medium">
              Profile Instagram
            </Label>
            <Input 
              id="bride-instagram" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: https://www.instagram.com/siska1234</p>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base">
            Simpan
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-3xl font-bold text-gray-900">Mempelai Pria</h2>
        <p className="text-gray-600 mt-2">Atur detail mempelai pria</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          {/* Photo Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Foto</Label>
            <div className="flex items-center space-x-4">
              {groomPhotoPreview ? (
                <div className="relative">
                  <img 
                    src={groomPhotoPreview} 
                    alt="Groom preview" 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setGroomPhoto(null)
                      setGroomPhotoPreview("")
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="groom-photo"
                  accept="image/*"
                  onChange={handleGroomPhotoUpload}
                  className="hidden"
                />
                <label htmlFor="groom-photo">
                  <Button variant="outline" className="cursor-pointer">
                    Browse...
                  </Button>
                </label>
                {groomPhoto && (
                  <p className="text-sm text-gray-500 mt-1">{groomPhoto.name}</p>
                )}
                <p className="text-sm text-gray-500">Maximum file size: 1 MB</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="groom-full-name" className="text-base font-medium">
              Nama Lengkap
            </Label>
            <Input 
              id="groom-full-name" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Reza Pratama</p>
          </div>

          {/* Nickname */}
          <div className="space-y-2">
            <Label htmlFor="groom-nickname" className="text-base font-medium">
              Nama Panggilan
            </Label>
            <Input 
              id="groom-nickname" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Reza</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="groom-description" className="text-base font-medium">
              Deskripsi
            </Label>
            <Textarea 
              id="groom-description" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: Putra dari Bapak Budi & Ibu Sari</p>
          </div>

          {/* Instagram Profile */}
          <div className="space-y-2">
            <Label htmlFor="groom-instagram" className="text-base font-medium">
              Profile Instagram
            </Label>
            <Input 
              id="groom-instagram" 
              className="text-base"
              
            />
            <p className="text-sm text-gray-500">Contoh: https://www.instagram.com/reza1234</p>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base">
            Simpan
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
