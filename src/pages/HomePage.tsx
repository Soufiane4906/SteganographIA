import React from 'react';
import { ImagePlus, Shield, Brain } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">SteganographIA</span>
          <span className="block text-indigo-600">Analyse et Protection d'Images</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Détectez les signatures numériques et les images générées par IA grâce à notre plateforme d'analyse avancée.
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <ImagePlus className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Upload Simple</h3>
                <p className="mt-5 text-base text-gray-500">
                  Téléversez vos images en quelques clics pour une analyse instantanée.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Protection Avancée</h3>
                <p className="mt-5 text-base text-gray-500">
                  Détectez les signatures numériques cachées dans vos images.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Détection IA</h3>
                <p className="mt-5 text-base text-gray-500">
                  Identifiez les images générées par intelligence artificielle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;