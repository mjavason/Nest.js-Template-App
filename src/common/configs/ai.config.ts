import { GoogleGenerativeAI } from '@google/generative-ai';
import { GOOGLE_GEMINI_KEY } from './constants';

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_KEY);
export const generativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
export const AIRules = [
  'Be helpful.',
  'Be as brief as possible',
  'Avoid repeating the question; give direct answers.',
  'Return regular text, do not add any unnecessary special characters like *',
];
