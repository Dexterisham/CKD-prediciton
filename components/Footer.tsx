
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-gray text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} CKD Prediction System. All Rights Reserved.</p>
        <p className="text-xs text-gray-400 mt-2">
          Disclaimer: This tool is for educational and screening purposes only and is not a substitute for professional medical advice.
        </p>
      </div>
    </footer>
  );
};
