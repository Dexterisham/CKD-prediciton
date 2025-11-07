import { PatientData, PredictionResult } from '../types';
import { GoogleGenAI } from '@google/genai';

class PredictionService {
  private ai: GoogleGenAI | null = null;

  private getAi(): GoogleGenAI {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY! });
    }
    return this.ai;
  }

  public async predictCkd(data: PatientData): Promise<PredictionResult> {
    const ai = this.getAi();
    const model = 'gemini-2.5-flash';

    const schema = {
      type: 'OBJECT',
      properties: {
        prediction: {
          type: 'STRING',
          description: 'The binary prediction for Chronic Kidney Disease. Must be one of: "CKD Detected" or "No CKD Detected".',
        },
        confidence: {
          type: 'NUMBER',
          description: 'The confidence level of the prediction, from 0 to 100.',
        },
        riskLevel: {
          type: 'STRING',
          description: 'The assessed risk level for the patient. Must be one of: "High", "Medium", or "Low".',
        },
        riskScore: {
            type: 'NUMBER',
            description: 'A numerical risk score from 0 to 100, where higher indicates greater risk.',
        }
      },
      required: ['prediction', 'confidence', 'riskLevel', 'riskScore'],
    };

    const prompt = `
      You are a sophisticated medical AI specializing in nephrology. Your task is to predict the likelihood of Chronic Kidney Disease (CKD) based on the provided patient data.
      Analyze the following patient data and provide a prediction.

      Patient Data:
      ${JSON.stringify(data, null, 2)}

      Based on this data, please provide a JSON response with your prediction, a confidence score, the patient's risk level, and a numerical risk score.
      - The prediction should be either "CKD Detected" or "No CKD Detected".
      - The confidence score should be a number between 0 and 100, representing your certainty.
      - The risk level should be "Low", "Medium", or "High". If no CKD is detected, the risk level should always be "Low".
      - The riskScore should be a number from 0-100 reflecting the calculated risk. A higher score means a higher risk.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: schema,
        },
      });

      const resultJson = response.text.trim();
      const predictionResult: PredictionResult = JSON.parse(resultJson);
      
      if (predictionResult.prediction === 'No CKD Detected') {
        predictionResult.riskLevel = 'Low';
      }
      
      return predictionResult;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get prediction from AI model.');
    }
  }
}

export const predictionService = new PredictionService();