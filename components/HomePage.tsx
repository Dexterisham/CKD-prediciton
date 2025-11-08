import React from 'react';

interface HomePageProps {
  onNavigate: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <section 
        className="py-20 md:py-32 px-4 rounded-lg bg-gradient-to-r from-primary-purple to-secondary-purple text-white"
      >
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Chronic Kidney Disease Prediction System</h1>
          <p className="text-lg md:text-xl mb-6 text-indigo-100">AI-Powered Early Detection Using Machine Learning</p>
          <p className="text-xl md:text-2xl font-semibold mb-8 bg-white bg-opacity-20 inline-block px-4 py-2 rounded-full">99.25% Accuracy with Random Forest Algorithm</p>
          <div>
            <button 
              onClick={onNavigate}
              className="bg-white text-primary-purple font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Predicting Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
