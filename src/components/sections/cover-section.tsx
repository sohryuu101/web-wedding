import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function CoverSection() {
  const [countdownDateTime, setCountdownDateTime] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const formattedDate = formatDate(date)
    setCountdownDateTime(formattedDate)
    setShowCalendar(false)
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Cover Depan</h2>
        <p className="text-gray-600 mt-2">Atur detail undangan pernikahan Anda</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="invitation-title" className="text-base font-medium">
              Judul Undangan <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="invitation-title" 
              className="text-base"
            />
            <p className="text-sm text-gray-500">Contoh :Siska & Reza</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invitation-link" className="text-base font-medium">
              Link Undangan
            </Label>
            <Input 
              id="invitation-link" 
              className="text-base"
            />
            <p className="text-sm text-gray-500">Contoh : siska-dan-reza</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date" className="text-base font-medium">
              Tanggal Acara
            </Label>
            <Input 
              id="event-date" 
              className="text-base"
            />
            <p className="text-sm text-gray-500">Contoh : Minggu, 31 Desember 2024</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="countdown-datetime" className="text-base font-medium">
              Tanggal Acara Countdown
            </Label>
            <div className="relative">
              <Input 
                id="countdown-datetime" 
                value={countdownDateTime}
                onChange={(e) => setCountdownDateTime(e.target.value)}
                className="text-base pr-10 cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
              />
              <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPreviousMonth}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="font-semibold text-gray-900">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextMonth}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => (
                      <div key={index} className="text-center">
                        {day ? (
                          <button
                            onClick={() => handleDateSelect(day)}
                            className={`w-8 h-8 text-sm rounded-full hover:bg-gray-100 transition-colors ${
                              selectedDate && day.toDateString() === selectedDate.toDateString()
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'text-gray-900'
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        ) : (
                          <div className="w-8 h-8"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">Masukan Tanggal & Jam Acara Dimulai</p>
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 text-base">
            Simpan
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
