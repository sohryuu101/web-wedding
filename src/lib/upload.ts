

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  size: number;
  type: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('Authentication required');
  }

  console.log('Starting upload for file:', file.name, 'Size:', file.size);
  console.log('Using token:', token.substring(0, 20) + '...');
  console.log('FormData entries:', Array.from(formData.entries()));

  try {
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('Upload response status:', response.status);
    console.log('Upload response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorMessage = 'Upload failed';
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
        console.error('Upload error response:', error);
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
        console.error('Upload failed with status:', response.status, response.statusText);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Upload request failed:', error);
    throw error;
  }
}

export async function deleteImage(filename: string): Promise<void> {
  const response = await fetch(`/api/upload/image/${encodeURIComponent(filename)}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Delete failed');
  }
}

// Utility function to validate image files
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  // Check file size (2MB max)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 2MB' };
  }

  return { valid: true };
} 