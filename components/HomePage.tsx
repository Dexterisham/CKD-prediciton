import React from 'react';
import { AccuracyIcon, AlgorithmIcon, EasyUseIcon, FastIcon } from './icons/FeatureIcons';

interface HomePageProps {
  onNavigate: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex justify-center items-center h-16 w-16 bg-fuchsia-100 rounded-full mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-dark-gray">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

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
              Get Started - Predict Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-dark-gray">Why Choose Our System?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             <FeatureCard 
                icon={<AccuracyIcon />}
                title="Accurate Prediction"
                description="Leverages a highly trained model with 99.25% accuracy for reliable results."
            />
            <FeatureCard 
                icon={<FastIcon />}
                title="Fast Results"
                description="Get your CKD risk assessment in less than a second after providing your data."
            />
            <FeatureCard 
                icon={<AlgorithmIcon />}
                title="Proven Algorithms"
                description="Based on established machine learning models like Random Forest for robust analysis."
            />
            <FeatureCard 
                icon={<EasyUseIcon />}
                title="Easy to Use"
                description="A simple, intuitive interface makes it easy for anyone to enter data and get results."
            />
          </div>
        </div>
      </section>
    </div>
  );
};
