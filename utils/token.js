import crypto from 'crypto';

export const TOKEN_LIVE_TIME = 10 * 60000;
export const getNewToken = () => crypto.randomBytes(64).toString('hex');
