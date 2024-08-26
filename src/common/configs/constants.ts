import { registerAs } from '@nestjs/config';
import dotenv from 'dotenv';
dotenv.config();

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'xxx',
  apiPrefix: 'api/v1',
  envName: process.env.NODE_ENV || 'development',
  baseURL: process.env.BASE_URL || 'http://localhost:5000',
  name: process.env.APP_NAME || 'Startup',
  // frontendUrl: process.env.FRONTEND_URL,
  // emailUser: process.env.EMAIL_SENDER,
}));

export const databaseConfig = registerAs('db', () => ({
  name: process.env.MONGO_DB_NAME || 'startup',
  url: process.env.MONGO_DB_URL + MONGO_DB_NAME || 'mongodb://localhost:27017/' + MONGO_DB_NAME,
}));

export const cloudinaryConfig = registerAs('cloudinary', () => ({
  name: process.env.CLOUDINARY_API_NAME || 'cloudinary',
  key: process.env.CLOUDINARY_API_KEY || '12345',
  secret: process.env.CLOUDINARY_API_SECRET || 'xxxx',
}));

export const mailConfig = registerAs('mail', () => ({
  address: process.env.MAIL_ADDRESS || 'admin@startup.com',
  password: process.env.MAIL_PASSWORD || 'xxx',
}));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const MAIL_ADDRESS = process.env.MAIL_ADDRESS || 'admin@startup.com';
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || 'xxx';

export const CLOUDINARY_API_NAME = process.env.CLOUDINARY_API_NAME || 'cloudinary';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '12345';
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'xxxx';

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'startup';
export const MONGO_DB_URL =
  process.env.MONGO_DB_URL + MONGO_DB_NAME || 'mongodb://localhost:27017/' + MONGO_DB_NAME;

export const PORT = process.env.PORT || 5000;

export const APP_NAME = process.env.APP_NAME || 'Startup';
export const JWT_SECRET = process.env.JWT_SECRET || 'xxx';
export const API_PREFIX = 'api/v1';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const BASE_URL = process.env.BASE_URL || `http://locahost:${PORT}`;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'https://startup.com';

export const MESSAGES = {
  FETCHED: 'Resource retrieved successfully',
  UPDATED: 'Resource updated successfully',
  ERROR: 'Oops! An error occurred while processing the resource',
  CREATED: 'Resource created successfully',
  DELETED: 'Resource deleted successfully',
  SUCCESSFUL: 'Successful',
  ASSIGNED: 'Resource assignment completed successfully',
  NOT_FOUND: 'Sorry, the requested resource was not found',
  DEFAULT: 'Live!!!',
  ALREADY_EXISTS: 'This resource already exists',
  USER_ALREADY_EXISTS: 'The user already exists',
  AUTH_DEFAULT: 'Authentication is required for this action',
  LOGOUT: "You've been successfully logged out. Have a wonderful day!",
  LOGIN_FIRST: 'Oops! Please log in first to proceed',
  LOGGED_IN: "You've been successfully logged in",
  LOGIN_FAILURE: 'Login failed. Please check your email and password',
  USER_UNAUTHORIZED: 'Unauthorized access: You are not allowed to take this action.',
  USER_NOT_LOGGED_IN: 'Unauthorized access: Please log in to access this resource.',
  USER_NOT_FOUND: 'User not found',
  MAIL_SENT: 'Email sent successfully. Please check your inbox!',
  INVALID_UNIQUE_ID: 'Invalid unique identifier provided',
  UNKNOWN_ERROR: 'Oops! An unknown error occurred',
  AUTH_FAILURE: 'Authentication failed. Please check your credentials',
  FORBIDDEN: "Sorry, you don't have permission to access this resource",
  AUTHENTICATION_FAILURE: 'Authentication failed. Please log in again',
  NOT_AUTHENTICATED: 'Oops! You need to be authenticated for this action',
  BAD_PARAMETERS: 'Oops! Invalid parameters were provided',
  INTERNAL_ERROR: 'An internal error occurred. Our team is addressing it!',
  SUCCESS_MSG_RESPONSE: 'Success! The operation was completed successfully',
  FAILURE_MSG_RESPONSE: 'Oops! The operation failed to complete',
  ACCESS_TOKEN_ERROR_RESPONSE: 'Access token is invalid. Please log in again',
  TOKEN_REFRESH_RESPONSE: 'Success! The access token was refreshed successfully',
  ROUTE_NOT_FOUND: "Sorry, the page you're looking for doesn't exist",
  WELCOME_V1: 'Welcome to Version 1',
  COMING_SOON:
    'The service you requested is currently in development. We will notify you once it is available for use',
};
