import React from 'react';
import UploadImage from '../components/upload/UploadImage';
import { useImage } from '../context/ImageContext';
import ImageResults from '../components/upload/ImageResults';

const UploadPage = () => {
  const { analysisResults } = useImage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Analyser une Image</h1>
      <UploadImage />
      {analysisResults && <ImageResults results={analysisResults} />}
    </div>
  );
};

export default UploadPage;