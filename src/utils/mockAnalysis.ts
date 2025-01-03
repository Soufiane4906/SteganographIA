export const generateMockAnalysis = () => {
  const isAI = Math.random() > 0.5;
  const hasSignature = Math.random() > 0.7;
  const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%

  return {
    isAI,
    confidence,
    signature: {
      detected: hasSignature,
      type: hasSignature ? 'Watermark' : undefined,
    },
    metadata: {
      dimensions: '1920x1080',
      format: 'JPEG',
      size: '2.4 MB',
    },
  };
};