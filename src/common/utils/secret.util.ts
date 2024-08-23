import crypto from 'crypto';

// Generate a 256-bit (32 bytes) secret
export function generateSecret() {
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  // console.log('Generated Secret:', jwtSecret);
  return jwtSecret;
}
