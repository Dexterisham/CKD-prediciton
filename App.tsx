
import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { PredictionPage } from './components/PredictionPage';
import { ResultPage } from './components/ResultPage';
import { AnalysisPage } from './components/AnalysisPage';
import { Header } from './components/Header';
import { PatientData, PredictionResult } from './types';
import { predictionService } from './services/predictionService';

type Page = 'home' | 'predict' | 'result' | 'analysis';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: PatientData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await predictionService.predictCkd(data);
      setPatientData(data);
      setPredictionResult(result);
      setCurrentPage('result');
    } catch (e) {
      setError('An error occurred while generating the prediction. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateTo = (page: Page) => {
    if (currentPage === 'predict' && page !== 'predict') {
        setError(null);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={() => navigateTo('predict')} />;
      case 'predict':
        return <PredictionPage onSubmit={handlePredict} isLoading={isLoading} error={error} />;
      case 'result':
        if (predictionResult && patientData) {
          return (
            <ResultPage
              result={predictionResult}
              patientData={patientData}
              onNewPrediction={() => navigateTo('predict')}
              onViewDetails={() => navigateTo('analysis')}
            />
          );
        }
        return <HomePage onNavigate={() => navigateTo('predict')} />; // Fallback
      case 'analysis':
         if (predictionResult && patientData) {
          return (
            <AnalysisPage
              patientData={patientData}
              result={predictionResult}
              onBack={() => navigateTo('result')}
            />
          );
        }
        return <HomePage onNavigate={() => navigateTo('predict')} />; // Fallback
      default:
        return <HomePage onNavigate={() => navigateTo('predict')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header onNavigate={navigateTo} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
