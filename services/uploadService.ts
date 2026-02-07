
import axios from 'axios';
import { ApiResponse } from '../types';

const API_ENDPOINT = 'https://cfig.ibytecdn.org/upload';

export const uploadImageFiles = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  
  // API requires 'images[]' field for files
  files.forEach(file => {
    formData.append('images[]', file);
  });
  
  // API requires 'server' field
  formData.append('server', 'server_1');

  try {
    const response = await axios.post<ApiResponse>(API_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Ensure we don't hit arbitrary limits in the browser
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    if (response.data && response.data.results) {
      return response.data.results.map(res => res.url);
    }
    
    throw new Error('Invalid response format from server');
  } catch (error: any) {
    console.error('Upload Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to upload images. Please try again.');
  }
};
