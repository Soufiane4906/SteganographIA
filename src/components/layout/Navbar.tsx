import React from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus, Home, BarChart2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <ImagePlus className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-semibold">SteganographIA</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
              <Link to="/upload" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1">
                <ImagePlus className="h-4 w-4" />
                <span>Upload</span>
              </Link>
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1">
                <BarChart2 className="h-4 w-4" />
                <span>Tableau de bord</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;