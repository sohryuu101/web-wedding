import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage, validateImageFile } from '@/lib/upload'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string>(value || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid file')
      return
    }

    // Check authentication
    const token = localStorage.getItem('auth_token')
    if (!token) {
      toast.error('Please log in to upload images')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setIsUploading(true)
    try {
      const result = await uploadImage(file)
      onChange(result.url)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      toast.error(errorMessage)
      // Remove preview on error
      setPreview('')
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onChange('')
    onRemove?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-24 h-24 object-cover rounded-lg border"
            />
            <button
              onClick={handleRemove}
              disabled={isUploading}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
            ) : (
              <Upload className="h-6 w-6 text-gray-400" />
            )}
          </div>
        )}
        
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <Button 
            variant="outline" 
            onClick={handleClick}
            disabled={isUploading}
            className="cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Choose Image'
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={async () => {
              const token = localStorage.getItem('auth_token');
              console.log('Current token:', token ? token.substring(0, 20) + '...' : 'No token');
              if (token) {
                try {
                  const payload = JSON.parse(atob(token.split('.')[1]));
                  console.log('User ID from token:', payload.userId);
                  console.log('Token expires:', new Date(payload.exp * 1000));
                  
                  // Test authentication with the server
                  const response = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                  });
                  console.log('Auth test response:', response.status, response.ok ? 'OK' : 'FAILED');
                  
                  // Test upload endpoint accessibility
                  const uploadTest = await fetch('/api/upload/test', {
                    headers: { 'Authorization': `Bearer ${token}` }
                  });
                  console.log('Upload endpoint test:', uploadTest.status, uploadTest.ok ? 'OK' : 'FAILED');
                } catch (error) {
                  console.error('Token decode error:', error);
                }
              } else {
                console.log('No token found');
              }
            }}
            className="ml-2"
          >
            Debug Auth
          </Button>
          <p className="text-sm text-gray-500 mt-1">
            {isUploading ? 'Uploading image...' : 'Maximum file size: 5MB'}
          </p>
        </div>
      </div>
    </div>
  )
} 