/**
 * Converts various YouTube URL formats to embed URL
 */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return ''
  
  // Extract video ID from various YouTube URL formats
  let videoId = ''
  
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1]?.split('&')[0] || ''
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1]?.split('?')[0] || ''
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1` : ''
}

/**
 * Gets YouTube thumbnail URL
 */
export function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeEmbedUrl(url).split('embed/')[1]?.split('?')[0]
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
}

/**
 * Validates if a URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url.trim()) return false
  
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
  ]

  return patterns.some(pattern => pattern.test(url))
} 