import { CelebritySignupType } from 'schema';
import prisma, { Prisma } from '../../utils/prisma';
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import { Context } from '../../server';
import { CookieOptions } from 'express';
import customConfig from '../../config/default';
import { signJwt } from '../../utils/jwt';

// [...] Cookie options
const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};

const accessTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + customConfig.refreshTokenExpiresIn * 60 * 1000),
};

export const createCelebrityUserController = async ({
    input: { password, email, firstName, lastName, phoneNumber },
    ctx,
}: {
    input: CelebritySignupType;
    ctx: Context;
}) => {
    try {
        const hashpassword = await argon2.hash(password);
        const celebrityUser = await prisma.celebrity.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashpassword,
                phone: Number(phoneNumber),
            },
            select: {
                email: true,
                id: true,
                username: true,
            },
        });
        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = await signToken(user);

        // Send Access Token in Cookie
        ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
        ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        ctx.res.cookie('logged_in', true, {
            ...cookieOptions,
            httpOnly: false,
        });

        return { ...celebrityUser };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'BAD_REQUEST',
            message: 'Bad Request',
        });
    }
};

export const signTokens = async (user: Prisma.CelebrityCreateInput) => {
    // 1. Create Session
    redisClient.set(`${user.id}`, JSON.stringify(user), {
        EX: customConfig.redisCacheExpiresIn * 60,
    });

    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${customConfig.accessTokenExpiresIn}m`,
    });

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
    });

    return { access_token, refresh_token };
};
