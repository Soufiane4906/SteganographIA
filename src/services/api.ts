import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const uploadImage = async (formData: FormData, onProgress: (progressEvent: any) => void) => {
  return new Promise((resolve) => {
    const total = 100;
    let loaded = 0;

    const interval = setInterval(() => {
      loaded += 10;
      onProgress({ loaded, total });

      if (loaded >= total) {
        clearInterval(interval);
        resolve({
          isAI: Math.random() > 0.5,
          confidence: Math.floor(Math.random() * 100),
          signature: {
            detected: Math.random() > 0.5,
            type: 'SHA-256',
          },
          metadata: {
            dimensions: '1024x768',
            format: 'JPEG',
            size: '2MB',
          },
        });
      }
    }, 100);
  });
};

export const getStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalImages: 100,
        aiGenerated: 50,
        authentic: 50,
      });
    }, 500);
  });
};
export default api;