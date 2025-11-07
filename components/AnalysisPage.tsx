import React from 'react';
import { PatientData, PredictionResult } from '../types';
import { FEATURE_NAMES, MOCK_FEATURE_IMPORTANCE, NORMAL_RANGES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalysisPageProps {
  patientData: PatientData;
  result: PredictionResult;
  onBack: () => void;
}

const ValueComparisonRow: React.FC<{ label: string; value: any; range: (string | number)[] | null }> = ({ label, value, range }) => {
    let status: 'normal' | 'abnormal' = 'normal';
    const displayValue = String(value);
    let displayRange = 'N/A';

    if (range) {
        displayRange = range.length > 1 ? `${range[0]} - ${range[1]}` : String(range[0]);
        if (typeof range[0] === 'number') {
            const numValue = parseFloat(value);
            if (numValue < range[0] || numValue > (range[1] ?? range[0])) {
                status = 'abnormal';
            }
        } else { // String comparison for categorical data
            if (String(value).toLowerCase() !== String(range[0]).toLowerCase()) {
                status = 'abnormal';
            }
        }
    }
    
    const statusClasses = {
        normal: 'bg-green-100 text-green-800',
        abnormal: 'bg-red-100 text-red-800',
    };

    return (
        <tr className={statusClasses[status]}>
            <td className="px-4 py-2 font-semibold">{label}</td>
            <td className="px-4 py-2">{displayValue}</td>
            <td className="px-4 py-2">{displayRange}</td>
            <td className="px-4 py-2 font-medium capitalize">{status}</td>
        </tr>
    );
};

export const AnalysisPage: React.FC<AnalysisPageProps> = ({ patientData, result, onBack }) => {
  const isCkd = result.prediction === 'CKD Detected';

  const riskFactors = MOCK_FEATURE_IMPORTANCE.map(f => {
      const key = Object.keys(FEATURE_NAMES).find(k => FEATURE_NAMES[k as keyof PatientData] === f.name) as keyof PatientData;
      if (!key) return null;
      const range = NORMAL_RANGES[key];
      const value = patientData[key];
      if (!range) return null;
      
      let isAbnormal = false;
      if (typeof range[0] === 'number') {
          // FIX: Operator '>' cannot be applied to types 'number' and 'string | number'.
          // Cast range to `[number, number]` to ensure TypeScript correctly infers the type for comparison.
          const numericRange = range as [number, number];
          isAbnormal = Number(value) < numericRange[0] || Number(value) > numericRange[1];
      } else {
          isAbnormal = String(value).toLowerCase() !== String(range[0]).toLowerCase();
      }
      return isAbnormal ? f.name : null;
  }).filter(Boolean) as string[];

  const protectiveFactors = MOCK_FEATURE_IMPORTANCE.map(f => {
       const key = Object.keys(FEATURE_NAMES).find(k => FEATURE_NAMES[k as keyof PatientData] === f.name) as keyof PatientData;
       if (!key || riskFactors.includes(f.name)) return null;
       const range = NORMAL_RANGES[key];
       const value = patientData[key];
       if (!range) return null;
       
       let isNormal = false;
       if (typeof range[0] === 'number') {
           // FIX: Operator '<=' cannot be applied to types 'number' and 'string | number'.
           // Cast range to `[number, number]` to ensure TypeScript correctly infers the type for comparison.
           const numericRange = range as [number, number];
           isNormal = Number(value) >= numericRange[0] && Number(value) <= numericRange[1];
       } else {
           isNormal = String(value).toLowerCase() === String(range[0]).toLowerCase();
       }
       return isNormal ? f.name : null;
  }).filter(Boolean) as string[];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-dark-gray">Detailed Analysis Report</h2>
        <button onClick={onBack} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors">
          &larr; Back to Result
        </button>
      </div>

      {/* Input Summary */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-primary-purple">Input Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 text-sm">
          {Object.entries(patientData).map(([key, value]) => (
            <div key={key} className="truncate">
              <span className="font-semibold text-gray-600">{FEATURE_NAMES[key as keyof PatientData]}: </span>
              <span className="text-dark-gray">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Feature Importance & Risk Assessment */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-primary-purple">Feature Importance (Top 10)</h3>
          <p className="text-sm text-gray-500 mb-4">This chart shows which factors most heavily influenced the prediction model.</p>
           <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_FEATURE_IMPORTANCE} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12, fill: '#333' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: '14px' }}/>
              <Bar dataKey="importance" name="Importance" fill="url(#colorUv)" radius={[0, 4, 4, 0]} barSize={20} />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#764ba2" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
           <h3 className="text-xl font-bold mb-4 text-primary-purple">Risk Assessment</h3>
           <p className="text-sm text-gray-500 mb-4">Factors contributing to or protecting against CKD risk based on your data.</p>
           <div className="space-y-4">
               <div>
                   <h4 className="font-semibold text-danger-red">Contributing Factors</h4>
                   {isCkd && riskFactors.length > 0 ? (
                       <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                           {riskFactors.map(f => <li key={f}>{f}</li>)}
                       </ul>
                   ) : (
                       <p className="text-sm text-gray-500 mt-1">{isCkd ? "Multiple factors contributed moderately to the risk score." : "No significant contributing factors identified."}</p>
                   )}
               </div>
               <div>
                   <h4 className="font-semibold text-success-green">Protective Factors</h4>
                   {protectiveFactors.length > 0 ? (
                       <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
                           {protectiveFactors.slice(0, 5).map(f => <li key={f}>{f}</li>)}
                       </ul>
                   ) : (
                       <p className="text-sm text-gray-500 mt-1">No prominent protective factors identified from the key features.</p>
                   )}
               </div>
           </div>
        </div>
      </div>

      {/* Normal Range Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-primary-purple">Patient Values vs. Normal Ranges</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-light-gray text-gray-600 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Metric</th>
                <th className="px-4 py-3">Your Value</th>
                <th className="px-4 py-3">Normal Range</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(patientData).map(([key, value]) => {
                const k = key as keyof PatientData;
                return (
                  <ValueComparisonRow
                    key={k}
                    label={FEATURE_NAMES[k]}
                    value={value}
                    range={NORMAL_RANGES[k]}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};