import React from 'react';

interface ImagePreviewProps {
  src: string;
}

const ImagePreview = ({ src }: ImagePreviewProps) => {
  return (
    <div className="mt-4">
      <img
        src={src}
        alt="Preview"
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  );
};

export default ImagePreview;