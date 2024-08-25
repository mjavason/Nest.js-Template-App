import dotenv from 'dotenv';
dotenv.config();

// Utility function to get environment variables with default values
export const getEnv = (key: string, defaultValue: string) => process.env[key] || defaultValue;
