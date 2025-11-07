
import React, { useState, useCallback } from 'react';
import { PatientData, FormField } from '../types';
import { FORM_SECTIONS, CKD_POSITIVE_SAMPLE, HEALTHY_SAMPLE } from '../constants';

interface PredictionPageProps {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
  error: string | null;
}

const initialFormData: PatientData = {
  age: 45, bp: 80, sg: '1.020', al: '0', su: '0', rbc: 'normal', pc: 'normal',
  pcc: 'notpresent', ba: 'notpresent', bgr: 120, bu: 40, sc: 1.2, sod: 140,
  pot: 4.5, hemo: 15, pcv: 45, wc: 8000, rc: 5, htn: 'no', dm: 'no', cad: 'no',
  appet: 'good', pe: 'no', ane: 'no'
};

const FormInput: React.FC<{ field: FormField; value: any; onChange: (id: keyof PatientData, value: any) => void }> = ({ field, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(field.id, e.target.value);
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field.id, e.target.value);
  }

  switch (field.type) {
    case 'number':
      return (
        <div className="flex flex-col">
          <label htmlFor={field.id} className="mb-1 text-sm font-medium text-gray-700">{field.label}</label>
          <div className="relative">
            <input
              type="number"
              id={field.id}
              name={field.id}
              value={value || ''}
              onChange={handleChange}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
              required
            />
            {field.unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{field.unit}</span>}
          </div>
        </div>
      );
    case 'select':
      return (
        <div className="flex flex-col">
          <label htmlFor={field.id} className="mb-1 text-sm font-medium text-gray-700">{field.label}</label>
          <select
            id={field.id}
            name={field.id}
            value={value}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-purple"
            required
          >
            {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      );
    case 'radio':
        return (
            <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">{field.label}</label>
                <div className="flex gap-4 mt-2">
                    {field.options?.map(opt => (
                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name={field.id}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={handleRadioChange}
                                className="form-radio h-4 w-4 text-primary-purple focus:ring-secondary-purple"
                                required
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    default:
      return null;
  }
};


export const PredictionPage: React.FC<PredictionPageProps> = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState<PatientData>(initialFormData);
  const [isSampleMenuOpen, setIsSampleMenuOpen] = useState(false);

  const handleFormChange = useCallback((id: keyof PatientData, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = Object.entries(formData).reduce((acc, [key, value]) => {
      const field = FORM_SECTIONS.flatMap(s => s.fields).find(f => f.id === key);
      // FIX: Cast accumulator to `any` to allow dynamic property assignment
      // and prevent TypeScript error 'Type 'any' is not assignable to type 'never''.
      if(field && field.type === 'number'){
        (acc as any)[key] = Number(value);
      } else {
        (acc as any)[key] = value;
      }
      return acc;
    }, {} as PatientData);
    onSubmit(processedData);
  };
  
  const loadSample = (sample: PatientData) => {
    setFormData(sample);
    setIsSampleMenuOpen(false);
  }
  
  const clearForm = () => {
    setFormData(initialFormData);
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2 text-dark-gray">Patient Data Input</h2>
      <p className="text-center text-gray-600 mb-8">Fill in the details below to get a CKD risk prediction.</p>
      
       <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <div className="relative inline-block text-left">
            <div>
              <button 
                type="button" 
                onClick={() => setIsSampleMenuOpen(!isSampleMenuOpen)} 
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-purple"
              >
                Load Sample Data
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {isSampleMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => loadSample(CKD_POSITIVE_SAMPLE)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    CKD Positive Sample
                  </button>
                  <button onClick={() => loadSample(HEALTHY_SAMPLE)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Healthy Sample
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-danger-red text-red-700 p-4 mb-6 rounded-md" role="alert">
          <p className="font-bold">Prediction Failed</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-8">
        <fieldset disabled={isLoading} className="space-y-8">
            {FORM_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex}>
                <h3 className="text-xl font-bold mb-4 text-white p-3 rounded-t-md bg-gradient-to-r from-primary-purple to-secondary-purple">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border border-t-0 rounded-b-md border-gray-200">
                {section.fields.map(field => (
                    <FormInput key={field.id} field={field} value={formData[field.id]} onChange={handleFormChange} />
                ))}
                </div>
            </div>
            ))}
        </fieldset>
        <div className="flex justify-center gap-6 pt-6">
          <button type="button" onClick={clearForm} className="px-10 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-colors shadow-md disabled:opacity-50" disabled={isLoading}>Clear Form</button>
          <button type="submit" className="px-10 py-3 w-52 bg-gradient-to-r from-primary-purple to-secondary-purple text-white font-bold rounded-md hover:opacity-90 transition-opacity shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex justify-center items-center" disabled={isLoading}>
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
            ) : 'Predict CKD Risk'}
          </button>
        </div>
      </form>
    </div>
  );
};
