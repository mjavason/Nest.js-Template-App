import { GOOGLE_GEMINI_KEY } from './constants';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_KEY);
export const generativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
export const AIRules = [
  'Be helpful.',
  // 'Summarize in 30 words max.',
  'Be as brief as possible',
  'Avoid repeating the question; give direct answers.',
  'Return regular text, dont add any unnecessary special characters like *',
  // 'Limit scope to countries/capitals; reply just "#E-OS" otherwise.',
];
