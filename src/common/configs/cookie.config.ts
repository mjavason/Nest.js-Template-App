import { NODE_ENV } from './constants';

export const cookieConfig = {
  httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
  secure: NODE_ENV === 'production', // Send only over HTTPS in production
  maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (e.g., 1 day)
  sameSite: true, // Helps mitigate CSRF attacks
};

export const clearCookieConfig = {
  httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
  secure: NODE_ENV === 'production', // Send only over HTTPS in production
  sameSite: true, // Helps mitigate CSRF attacks
};
