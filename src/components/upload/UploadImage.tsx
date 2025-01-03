import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadImage } from '../../services/api';
import ImagePreview from './ImagePreview';
import UploadProgress from './UploadProgress';

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadImage(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(progress);
      });

      // Handle response
      console.log(response);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload une image</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG jusqu'à 10MB</p>
        </div>
      </div>

      {preview && <ImagePreview src={preview} />}
      {uploading && <UploadProgress progress={progress} />}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {uploading ? 'Upload en cours...' : 'Analyser l\'image'}
      </button>
    </div>
  );
};

export default UploadImage;