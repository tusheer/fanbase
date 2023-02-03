import jwt from 'jsonwebtoken';
import serverEnv from '../config/serverenv';

export const verifyJwt = <T>(token: string, key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'): T | null => {
    const privateKey = Buffer.from(serverEnv[key], 'base64').toString('ascii');

    const decoded = jwt.verify(token, privateKey) as T;
    return decoded;
};
