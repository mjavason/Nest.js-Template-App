import { CookieOptions } from 'express';
// import { NODE_ENV } from './constants';

// export const cookieConfig: CookieOptions = {
//   httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
//   secure: NODE_ENV === 'production', // Send only over HTTPS in production
//   maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (e.g., 1 day)
//   sameSite: true, // Helps mitigate CSRF attacks
// };

// export const clearCookieConfig: CookieOptions = {
//   httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
//   secure: NODE_ENV === 'production', // Send only over HTTPS in production
//   sameSite: true, // Helps mitigate CSRF attacks
// };

// Lax Cookie Configuration. Make sure youre not using any host that has a different port (localhost:5000). It will not work
export const cookieConfig: CookieOptions = {
  httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
  secure: true, // Send only over HTTPS in production. This goes hand in hand with httpOnly. Dont bother changing it
  maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (e.g., 1 day)
  sameSite: 'none', // Helps mitigate CSRF attacks
};

export const clearCookieConfig: CookieOptions = {
  httpOnly: true, // Ensures cookie is only accessible via HTTP(S), not JavaScript
  secure: true, // Send only over HTTPS in production. This goes hand in hand with httpOnly. Dont bother changing it
  sameSite: 'none', // Helps mitigate CSRF attacks
};
