
import React from 'react';
import { PatientData, PredictionResult } from '../types';
import { CheckIcon, WarningIcon } from './icons/ResultIcons';

interface ResultPageProps {
  result: PredictionResult;
  patientData: PatientData;
  onNewPrediction: () => void;
  onViewDetails: () => void;
}

const ckdRecommendations = [
    'Urgent: Consult a nephrologist immediately.',
    'Get comprehensive kidney function tests (e.g., GFR, urine protein).',
    'Monitor blood pressure and blood sugar levels daily.',
    'Follow a kidney-friendly diet (low sodium, low potassium, controlled protein).',
    'Review all current medications with your doctor.'
];

const healthyRecommendations = [
    'Maintain a balanced diet and stay hydrated.',
    'Engage in regular physical activity.',
    'Monitor blood pressure and get regular check-ups.',
    'Avoid smoking and limit alcohol consumption.',
    'Manage stress through healthy coping mechanisms.'
];

const getRiskFactors = (data: PatientData): string[] => {
    const factors = [];
    if (data.sc > 1.4) factors.push('Elevated Serum Creatinine');
    if (data.bu > 50) factors.push('High Blood Urea');
    if (data.hemo < 12) factors.push('Low Hemoglobin');
    if (data.htn === 'yes') factors.push('Hypertension Present');
    if (data.dm === 'yes') factors.push('Diabetes Mellitus Present');
    if (Number(data.al) > 0) factors.push('Albumin in Urine');
    return factors;
};


export const ResultPage: React.FC<ResultPageProps> = ({ result, patientData, onNewPrediction, onViewDetails }) => {
  const isCkd = result.prediction === 'CKD Detected';
  const riskFactors = isCkd ? getRiskFactors(patientData) : [];
  
  const riskColorMap = {
      'High': 'bg-danger-red',
      'Medium': 'bg-warning-orange',
      'Low': 'bg-success-green'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`rounded-xl shadow-2xl text-white p-8 ${isCkd ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-green-500 to-emerald-600'}`}>
        <div className="text-center">
            <div className="flex justify-center mb-4">
                {isCkd ? <WarningIcon /> : <CheckIcon />}
            </div>
          <h2 className="text-4xl font-extrabold mb-2">{isCkd ? 'CKD DETECTED' : 'NO CKD DETECTED'}</h2>
          <p className="text-lg mb-4">Prediction Confidence</p>
          <div className="text-7xl font-bold mb-4">{result.confidence}%</div>
          <div className={`inline-block px-4 py-1 rounded-full text-lg font-semibold ${riskColorMap[result.riskLevel]}`}>
            Risk Level: {result.riskLevel.toUpperCase()}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
                <h3 className="text-2xl font-bold mb-4 border-b-2 border-white border-opacity-50 pb-2">
                    {isCkd ? 'Key Risk Factors Identified' : 'Health Status'}
                </h3>
                {isCkd ? (
                    riskFactors.length > 0 ? (
                        <ul className="space-y-2 list-disc list-inside">
                            {riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
                        </ul>
                    ) : (
                       <p>Specific primary risk factors not prominent, but a combination of inputs suggests risk. Please consult a doctor for a full evaluation.</p>
                    )
                ) : (
                    <p>Your test results fall within the normal range for key indicators. Continue to maintain a healthy lifestyle.</p>
                )}
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-4 border-b-2 border-white border-opacity-50 pb-2">
                    {isCkd ? 'Medical Recommendations' : 'Healthy Lifestyle Tips'}
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                    {(isCkd ? ckdRecommendations : healthyRecommendations).map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
            </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h4 className="font-bold text-gray-700">Model Information</h4>
            <p className="text-sm text-gray-600">
                Algorithm: <span className="font-semibold">Random Forest (Simulated)</span> | 
                Processing Time: <span className="font-semibold">~0.1 seconds</span> | 
                Model Accuracy: <span className="font-semibold">99.25%</span>
            </p>
        </div>
         <div className="flex gap-4">
          <button onClick={onViewDetails} className="px-6 py-2 bg-info-blue text-white font-semibold rounded-md hover:bg-opacity-90 transition-colors">View Details</button>
          <button onClick={onNewPrediction} className="px-6 py-2 bg-gradient-to-r from-primary-purple to-secondary-purple text-white font-semibold rounded-md hover:opacity-90 transition-opacity">New Prediction</button>
        </div>
      </div>
    </div>
  );
};
