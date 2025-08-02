import { Hono } from "hono";
import { authMiddleware, type AuthContext } from '../../lib/middleware';

const uploadRoutes = new Hono<{ Bindings: Env } & AuthContext>();

// Test endpoint to check if upload routes are working
uploadRoutes.get('/test', (c) => {
  return c.json({ 
    message: 'Upload routes are working',
    timestamp: new Date().toISOString()
  });
});

// Upload image to R2
uploadRoutes.post('/image', authMiddleware, async (c) => {
  console.log('=== UPLOAD ROUTE CALLED ===');
  console.log('Request method:', c.req.method);
  console.log('Request URL:', c.req.url);
  try {
    const user = c.get('user');
    console.log('Upload request from user:', user.userId);
    
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.log('No file provided');
      return c.json({ error: 'No file provided' }, 400);
    }

    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return c.json({ error: 'File must be an image' }, 400);
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size);
      return c.json({ error: 'File size must be less than 2MB' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `uploads/${user.userId}/images/${timestamp}-${randomString}.${extension}`;

    console.log('Generated filename:', filename);

    // Upload to R2
    const r2Bucket = c.env.WEDDING_IMAGES;
    console.log('R2 bucket available:', !!r2Bucket);
    
    await r2Bucket.put(filename, file, {
      httpMetadata: {
        contentType: file.type,
      },
      customMetadata: {
        uploadedBy: user.userId.toString(),
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
        fileType: 'image',
      },
    });

    console.log('File uploaded to R2 successfully');

    // Generate public URL using our proxy route
    const publicUrl = `https://web-wedding.calvin-rahmat.workers.dev/api/images/${filename}`;

    console.log('Generated public URL:', publicUrl);

    return c.json({ 
      success: true,
      url: publicUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});



// Delete image from R2
uploadRoutes.delete('/image/:filename', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const filename = c.req.param('filename');
    
    // Ensure user can only delete their own files
    if (!filename.includes(`uploads/${user.userId}/`)) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const r2Bucket = c.env.WEDDING_IMAGES;
    await r2Bucket.delete(filename);

    return c.json({ success: true, message: 'File deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    return c.json({ error: 'Failed to delete file' }, 500);
  }
});

export { uploadRoutes }; 