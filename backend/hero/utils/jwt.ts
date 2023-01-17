import jwt, { SignOptions } from 'jsonwebtoken';
import customConfig from '../config/default';
import { TRPCError } from '@trpc/server';

export const signJwt = (
    payload: { [key: string]: string },
    key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options: SignOptions = {}
) => {
    const privateKey = Buffer.from(customConfig[key], 'base64').toString('ascii');

    try {
        console.log({ key: customConfig[key] });
        const token = jwt.sign(payload, privateKey, {
            ...(options ? options : {}),
            algorithm: 'HS512',
        });
        console.log('end');
        return token;
    } catch (error) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'JWT Isssue',
            cause: error,
        });
    }
};

export const verifyJwt = <T>(token: string, key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null => {
    const publicKey = Buffer.from(customConfig[key], 'base64').toString('ascii');
    try {
        return jwt.verify(token, publicKey) as T;
    } catch (error) {
        console.log(error);
        return null;
    }
};
