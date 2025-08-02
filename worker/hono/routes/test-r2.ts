import { Hono } from 'hono'

export const testR2Routes = new Hono<{ Bindings: Env }>()

// Test R2 bucket access
testR2Routes.get('/test-r2', async (c) => {
  try {
    const r2Bucket = c.env.WEDDING_IMAGES
    console.log('R2 bucket available:', !!r2Bucket)
    
    if (!r2Bucket) {
      return c.json({ error: 'R2 bucket not available' }, 500)
    }

    // Try to list objects
    const objects = await r2Bucket.list({ limit: 10 })
    console.log('R2 list result:', objects.objects.length, 'objects')
    
    // Try to put a test object
    const testKey = 'test/hello.txt'
    const testContent = 'Hello from R2 test!'
    
    console.log('Attempting to put test object:', testKey)
    const putResult = await r2Bucket.put(testKey, testContent, {
      httpMetadata: {
        contentType: 'text/plain'
      }
    })
    console.log('Put result:', putResult ? 'Success' : 'Failed')
    
    // Try to get the test object
    console.log('Attempting to get test object:', testKey)
    const getResult = await r2Bucket.get(testKey)
    console.log('Get result:', getResult ? 'Success' : 'Failed')
    
    // Clean up - delete the test object
    console.log('Cleaning up test object:', testKey)
    await r2Bucket.delete(testKey)
    
    return c.json({ 
      success: true,
      message: 'R2 bucket is working',
      bucketAvailable: !!r2Bucket,
      objectsCount: objects.objects.length,
      testPutSuccess: !!putResult,
      testGetSuccess: !!getResult
    })
  } catch (error) {
    console.error('R2 test error:', error)
    return c.json({ 
      error: 'R2 test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
}) 