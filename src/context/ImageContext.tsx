import React, { createContext, useContext, useState } from 'react';

interface ImageContextType {
  analysisResults: any | null;
  setAnalysisResults: (results: any) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);

  return (
    <ImageContext.Provider value={{ analysisResults, setAnalysisResults }}>
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