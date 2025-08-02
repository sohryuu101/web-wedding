import { Hono } from 'hono'

export const imageRoutes = new Hono<{ Bindings: Env }>()

// Proxy route to serve R2 images with proper CORS headers
imageRoutes.get('/:path{.*}', async (c) => {
  try {
    const path = c.req.param('path')
    console.log('Image proxy request for path:', path)
    
    const r2Bucket = c.env.WEDDING_IMAGES
    console.log('R2 bucket available:', !!r2Bucket)
    
    // Get the object from R2
    const object = await r2Bucket.get(path)
    console.log('R2 get result:', object ? 'Object found' : 'Object not found')
    
    if (!object) {
      console.log('Image not found in R2 for path:', path)
      return c.json({ error: 'Image not found', path: path }, 404)
    }

    console.log('Image found, size:', object.size, 'type:', object.httpMetadata?.contentType)

    // Get the object's metadata
    const headers = new Headers()
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg')
    headers.set('Content-Length', object.size.toString())
    headers.set('Cache-Control', 'public, max-age=31536000') // Cache for 1 year
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD')
    headers.set('Access-Control-Allow-Headers', '*')

    return new Response(object.body, {
      headers,
      status: 200
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return c.json({ error: 'Failed to serve image', details: error instanceof Error ? error.message : 'Unknown error' }, 500)
  }
}) 