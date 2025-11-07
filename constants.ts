
import { FormSection, PatientData } from './types';

export const FEATURE_NAMES: Record<keyof PatientData, string> = {
  age: 'Age',
  bp: 'Blood Pressure',
  sg: 'Specific Gravity',
  al: 'Albumin',
  su: 'Sugar',
  rbc: 'Red Blood Cells',
  pc: 'Pus Cell',
  pcc: 'Pus Cell Clumps',
  ba: 'Bacteria',
  bgr: 'Blood Glucose Random',
  bu: 'Blood Urea',
  sc: 'Serum Creatinine',
  sod: 'Sodium',
  pot: 'Potassium',
  hemo: 'Hemoglobin',
  pcv: 'Packed Cell Volume',
  wc: 'White Blood Cell Count',
  rc: 'Red Blood Cell Count',
  htn: 'Hypertension',
  dm: 'Diabetes Mellitus',
  cad: 'Coronary Artery Disease',
  appet: 'Appetite',
  pe: 'Pedal Edema',
  ane: 'Anemia',
};

export const FORM_SECTIONS: FormSection[] = [
  {
    title: 'Basic Information',
    fields: [
      { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 1, max: 120 },
      { id: 'bp', label: 'Blood Pressure', type: 'number', unit: 'mm/Hg', min: 40, max: 200 },
      { id: 'sg', label: 'Specific Gravity', type: 'select', options: [
          { value: '1.005', label: '1.005' },
          { value: '1.010', label: '1.010' },
          { value: '1.015', label: '1.015' },
          { value: '1.020', label: '1.020' },
          { value: '1.025', label: '1.025' },
        ],
      },
    ],
  },
  {
    title: 'Urine Test Results',
    fields: [
      { id: 'al', label: 'Albumin', type: 'select', options: [
          { value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' },
          { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' },
        ],
      },
      { id: 'su', label: 'Sugar', type: 'select', options: [
          { value: '0', label: '0' }, { value: '1', label: '1' }, { value: '2', label: '2' },
          { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' },
        ],
      },
      { id: 'rbc', label: 'Red Blood Cells', type: 'select', options: [
          { value: 'normal', label: 'Normal' },
          { value: 'abnormal', label: 'Abnormal' },
        ],
      },
      { id: 'pc', label: 'Pus Cell', type: 'select', options: [
          { value: 'normal', label: 'Normal' },
          { value: 'abnormal', label: 'Abnormal' },
        ],
      },
      { id: 'pcc', label: 'Pus Cell Clumps', type: 'select', options: [
          { value: 'notpresent', label: 'Not Present' },
          { value: 'present', label: 'Present' },
        ],
      },
      { id: 'ba', label: 'Bacteria', type: 'select', options: [
          { value: 'notpresent', label: 'Not Present' },
          { value: 'present', label: 'Present' },
        ],
      },
    ],
  },
  {
    title: 'Blood Test Results',
    fields: [
      { id: 'bgr', label: 'Blood Glucose Random', type: 'number', unit: 'mgs/dl', min: 50, max: 500 },
      { id: 'bu', label: 'Blood Urea', type: 'number', unit: 'mgs/dl', min: 10, max: 200 },
      { id: 'sc', label: 'Serum Creatinine', type: 'number', unit: 'mgs/dl', min: 0.1, max: 20, step: 0.1 },
      { id: 'sod', label: 'Sodium', type: 'number', unit: 'mEq/L', min: 100, max: 200 },
      { id: 'pot', label: 'Potassium', type: 'number', unit: 'mEq/L', min: 2, max: 10, step: 0.1 },
      { id: 'hemo', label: 'Hemoglobin', type: 'number', unit: 'gms', min: 3, max: 20, step: 0.1 },
      { id: 'pcv', label: 'Packed Cell Volume', type: 'number', unit: '%', min: 10, max: 60 },
      { id: 'wc', label: 'White Blood Cell Count', type: 'number', unit: 'cells/cumm', min: 2000, max: 30000 },
      { id: 'rc', label: 'Red Blood Cell Count', type: 'number', unit: 'millions/cmm', min: 2, max: 8, step: 0.1 },
    ],
  },
  {
    title: 'Medical History',
    fields: [
      { id: 'htn', label: 'Hypertension', type: 'radio', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'dm', label: 'Diabetes Mellitus', type: 'radio', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'cad', label: 'Coronary Artery Disease', type: 'radio', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'appet', label: 'Appetite', type: 'radio', options: [{ value: 'good', label: 'Good' }, { value: 'poor', label: 'Poor' }] },
      { id: 'pe', label: 'Pedal Edema', type: 'radio', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      { id: 'ane', label: 'Anemia', type: 'radio', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    ],
  },
];

export const CKD_POSITIVE_SAMPLE: PatientData = {
  age: 62, bp: 90, sg: "1.015", al: "3", su: "0", rbc: "abnormal", pc: "abnormal", pcc: "present", ba: "notpresent",
  bgr: 157, bu: 53, sc: 1.8, sod: 132, pot: 4.8, hemo: 11.2, pcv: 35, wc: 9200, rc: 4.1,
  htn: "yes", dm: "yes", cad: "no", appet: "poor", pe: "yes", ane: "yes"
};

export const HEALTHY_SAMPLE: PatientData = {
  age: 35, bp: 70, sg: "1.020", al: "0", su: "0", rbc: "normal", pc: "normal", pcc: "notpresent", ba: "notpresent",
  bgr: 105, bu: 32, sc: 1.0, sod: 138, pot: 4.2, hemo: 15.2, pcv: 45, wc: 7500, rc: 5.0,
  htn: "no", dm: "no", cad: "no", appet: "good", pe: "no", ane: "no"
};

export const NORMAL_RANGES: Record<keyof PatientData, [number, number] | [string, string] | null> = {
  age: null,
  bp: [60, 80],
  sg: ['1.010', '1.025'],
  al: [0, 0],
  su: [0, 0],
  rbc: ['normal', 'normal'],
  pc: ['normal', 'normal'],
  pcc: ['notpresent', 'notpresent'],
  ba: ['notpresent', 'notpresent'],
  bgr: [70, 140],
  bu: [7, 20],
  sc: [0.6, 1.2],
  sod: [135, 145],
  pot: [3.5, 5.0],
  hemo: [13.5, 17.5], // For men, slightly lower for women
  pcv: [41, 50], // For men
  wc: [4500, 11000],
  rc: [4.5, 5.9], // For men
  htn: ['no', 'no'],
  dm: ['no', 'no'],
  cad: ['no', 'no'],
  appet: ['good', 'good'],
  pe: ['no', 'no'],
  ane: ['no', 'no'],
};

export const MOCK_FEATURE_IMPORTANCE = [
  { name: 'Serum Creatinine', importance: 0.25 },
  { name: 'Blood Urea', importance: 0.20 },
  { name: 'Hemoglobin', importance: 0.15 },
  { name: 'Age', importance: 0.12 },
  { name: 'Blood Pressure', importance: 0.10 },
  { name: 'Hypertension', importance: 0.08 },
  { name: 'Diabetes', importance: 0.05 },
  { name: 'Albumin', importance: 0.03 },
  { name: 'Anemia', importance: 0.01 },
  { name: 'RBC Abnormal', importance: 0.01 },
];
