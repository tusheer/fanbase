import jwt, { SignOptions } from 'jsonwebtoken';
import customConfig from '../config/default';
import { TRPCError } from '@trpc/server';

export const signJwt = (
    payload: { [key: string]: string | null },
    key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options: SignOptions = {}
) => {
    const privateKey = Buffer.from(customConfig[key], 'base64').toString('ascii');
    try {
        const token = jwt.sign(payload, privateKey, {
            ...(options ? options : {}),
            algorithm: 'HS512',
        });
        return token;
    } catch (error) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'JWT Isssue',
            cause: error,
        });
    }
};

export const verifyJwt = <T>(token: string, key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey'): T | null => {
    const privateKey = Buffer.from(customConfig[key], 'base64').toString('ascii');

    try {
        const decoded = jwt.verify(token, privateKey) as T;
        console.log({ decoded });
        return decoded;
    } catch (error) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'JWT Isssue',
            cause: error,
        });
    }
};
