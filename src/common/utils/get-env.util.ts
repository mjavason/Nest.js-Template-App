import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (key: string, defaultValue: string) => process.env[key] || defaultValue;
