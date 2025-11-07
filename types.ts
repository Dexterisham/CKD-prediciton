
export interface PatientData {
  age: number;
  bp: number;
  sg: string;
  al: string;
  su: string;
  rbc: 'normal' | 'abnormal';
  pc: 'normal' | 'abnormal';
  pcc: 'present' | 'notpresent';
  ba: 'present' | 'notpresent';
  bgr: number;
  bu: number;
  sc: number;
  sod: number;
  pot: number;
  hemo: number;
  pcv: number;
  wc: number;
  rc: number;
  htn: 'yes' | 'no';
  dm: 'yes' | 'no';
  cad: 'yes' | 'no';
  appet: 'good' | 'poor';
  pe: 'yes' | 'no';
  ane: 'yes' | 'no';
}

export interface PredictionResult {
  prediction: 'CKD Detected' | 'No CKD Detected';
  confidence: number;
  riskLevel: 'High' | 'Medium' | 'Low';
  riskScore: number;
}

export type FormField = {
  id: keyof PatientData;
  label: string;
  unit?: string;
  type: 'number' | 'select' | 'radio';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
};

export type FormSection = {
  title: string;
  fields: FormField[];
};
