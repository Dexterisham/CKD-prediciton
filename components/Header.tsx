
import React from 'react';
import { KidneyIcon } from './icons/KidneyIcon';

interface HeaderProps {
  onNavigate: (page: 'home' | 'predict') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <KidneyIcon className="h-8 w-8 text-primary-purple" />
            <span className="text-xl font-bold text-dark-gray">CKD Prediction</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-primary-purple transition-colors">Home</button>
            <button onClick={() => onNavigate('predict')} className="text-gray-600 hover:text-primary-purple transition-colors">Predict</button>
            <button className="text-gray-600 hover:text-primary-purple transition-colors">About</button>
            <button className="text-gray-600 hover:text-primary-purple transition-colors">Contact</button>
          </nav>
        </div>
      </div>
    </header>
  );
};
