import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Video, ExternalLink } from 'lucide-react'
import { getYouTubeThumbnail } from '@/lib/youtube'

interface VideoUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
}

export function VideoUpload({ 
  value, 
  onChange, 
  onRemove, 
  className = ""
}: VideoUploadProps) {
  const [youtubeUrl, setYoutubeUrl] = useState(value || '')



  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url)
    onChange(url)
  }

  const handleRemove = () => {
    setYoutubeUrl('')
    onChange('')
    onRemove?.()
  }



  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        {youtubeUrl ? (
          <div className="relative">
            <img
              src={getYouTubeThumbnail(youtubeUrl)}
              alt="YouTube thumbnail"
              className="w-32 h-24 object-cover rounded-lg border"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Video className="h-4 w-4 text-white" />
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <Video className="h-6 w-6 text-gray-400" />
          </div>
        )}
        
        <div className="flex-1 space-y-2">
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (youtubeUrl) {
                  window.open(youtubeUrl, '_blank')
                }
              }}
              disabled={!youtubeUrl}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Enter a YouTube video URL (e.g., https://www.youtube.com/watch?v=...)
          </p>
        </div>
      </div>
    </div>
  )
} 