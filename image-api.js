(function() {
  'use strict';

  // Detectar si estamos en desarrollo local o producción
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.startsWith('192.168.');
  
  // Usar servidor local si estamos en localhost, sino usar producción
  const baseURL = isLocalhost 
    ? `http://localhost:${window.location.port || 3000}`
    : 'https://chabi.fly.dev';

  class ImageAPIClient {
    constructor() {
      this.baseURL = baseURL;
      console.log('API Client initialized with base URL:', this.baseURL);
      this.checkCORS();
    }

    async checkCORS() {
      try {
        const response = await fetch(`${this.baseURL}/`, {
          method: 'HEAD',
          mode: 'cors'
        });
        console.log('CORS check passed for', this.baseURL);
      } catch (error) {
        console.warn('CORS might not be properly configured:', error.message);
        console.warn('Some features may not work from this origin:', window.location.origin);
      }
    }

    async getGallery() {
      try {
        const response = await fetch(`${this.baseURL}/api/gallery`, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching gallery:', error);
        return null;
      }
    }

    async uploadImage(file, onProgress) {
      try {
        // Get presigned URL first
        const presignedResponse = await fetch(`${this.baseURL}/api/uploads/presigned-url`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type
          })
        });

        if (!presignedResponse.ok) {
          throw new Error(`Failed to get upload URL: ${presignedResponse.status}`);
        }

        const { uploadUrl, downloadUrl } = await presignedResponse.json();

        // Upload file to presigned URL
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        });

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.status}`);
        }

        return { success: true, url: downloadUrl };
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }

    async getDownloadUrl(key, expiresIn = 3600) {
      try {
        const response = await fetch(`${this.baseURL}/api/uploads/download-url`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key, expiresIn })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
      }
    }

    async deleteImage(key) {
      try {
        // Note: Delete endpoint not listed in API, this may need adjustment
        const response = await fetch(`${this.baseURL}/api/images/${key}`, {
          method: 'DELETE',
          mode: 'cors',
          credentials: 'omit'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error deleting image:', error);
        return null;
      }
    }
  }

  window.ImageAPI = new ImageAPIClient();
})();