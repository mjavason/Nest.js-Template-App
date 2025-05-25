import crypto from 'crypto';

export function generateSecret() {
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  return jwtSecret;
}
