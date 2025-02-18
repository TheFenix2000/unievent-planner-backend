import { randomBytes } from 'crypto';

export function generateCode(length: number = 6) {
  return randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, length);
}
