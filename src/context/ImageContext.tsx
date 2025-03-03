import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  analysisResults: any | null;
  setAnalysisResults: (results: any) => void;
  uploadImage: (file: File) => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      // Transform the response to match the expected structure in ImageResults
      const transformedResults = {
        isAI: data.ai_detection.is_ai_generated,
        confidence: data.ai_detection.confidence || 0, // Add confidence if available
        signature: {
          detected: data.steganography.signature_detected || false,
          type: data.steganography.signature_type || undefined,
        },
        metadata: {
          dimensions: data.metadata.dimensions || 'N/A',
          format: data.metadata.format || 'N/A',
          size: data.metadata.size || 'N/A',
        },
      };

      setAnalysisResults(transformedResults);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
      <ImageContext.Provider value={{ analysisResults, setAnalysisResults, uploadImage }}>
        {children}
      </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

export default ImageContext;