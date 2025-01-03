import React from 'react';
import { Shield, Brain } from 'lucide-react';

interface ImageResultsProps {
  results: {
    isAI: boolean;
    confidence: number;
    signature?: {
      detected: boolean;
      type?: string;
    };
    metadata: {
      dimensions: string;
      format: string;
      size: string;
    };
  };
}

const ImageResults = ({ results }: ImageResultsProps) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Résultats de l'Analyse</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-indigo-500" />
            <h3 className="text-lg font-medium">Détection IA</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Statut: <span className={`font-semibold ${results.isAI ? 'text-red-500' : 'text-green-500'}`}>
                {results.isAI ? 'Image générée par IA' : 'Image authentique'}
              </span>
            </p>
            <p className="text-gray-600">
              Confiance: <span className="font-semibold">{results.confidence}%</span>
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-6 h-6 text-indigo-500" />
            <h3 className="text-lg font-medium">Signature Numérique</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Statut: <span className={`font-semibold ${results.signature?.detected ? 'text-green-500' : 'text-gray-500'}`}>
                {results.signature?.detected ? 'Signature détectée' : 'Aucune signature'}
              </span>
            </p>
            {results.signature?.type && (
              <p className="text-gray-600">
                Type: <span className="font-semibold">{results.signature.type}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Métadonnées</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">Dimensions</p>
            <p className="font-medium">{results.metadata.dimensions}</p>
          </div>
          <div>
            <p className="text-gray-500">Format</p>
            <p className="font-medium">{results.metadata.format}</p>
          </div>
          <div>
            <p className="text-gray-500">Taille</p>
            <p className="font-medium">{results.metadata.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResults;