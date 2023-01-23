import { CelebritySignupType, SigninType } from 'schema';
import prisma from '../../utils/prisma';
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import { Context } from '../../server';
import { CookieOptions } from 'express';
import customConfig from '../../config/default';
import { signJwt } from '../../utils/jwt';
import redisClient from '../../utils/connectRedis';
import { nanoid } from 'nanoid';
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
//TODO : Add lodash for utils
const stringReplace = (str: string) => str.replace(' ', '-').toLowerCase();

export const createCelebrityUserController = async ({
    input: { password, email, firstName, lastName, phoneNumber },
    ctx,
}: {
    input: CelebritySignupType;
    ctx: Context;
}) => {
    try {
        const _user = await prisma.celebrity.findUnique({
            where: {
                email: email,
            },
        });

        if (_user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'User already exit',
            });
        }

        const username = `${stringReplace(firstName)}-${stringReplace(lastName)}-${nanoid(6)}`;
        const hashpassword = await argon2.hash(password);
        const celebrityUser = await prisma.celebrity.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashpassword,
                phone: Number(phoneNumber),
                username,
            },
            select: {
                email: true,
                id: true,
                username: true,
            },
        });

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = signTokens(celebrityUser);

        // // Send Access Token in Cookie
        ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
        ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        ctx.res.cookie('logged_in', true, {
            ...cookieOptions,
            httpOnly: false,
        });

        return celebrityUser;
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'BAD_REQUEST',
            message: 'BAD REQUEST',
        });
    }
};

export const singinCelebrityUser = async ({ input, ctx }: { input: SigninType; ctx: Context }) => {
    try {
        const celebrityUser = await prisma.celebrity.findUnique({
            where: {
                email: input.email,
            },

            select: {
                email: true,
                id: true,
                username: true,
                password: true,
            },
        });

        if (!celebrityUser) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'User is not exit',
            });
        }

        const verifyPassword = await argon2.verify(celebrityUser.password, input.password);
        if (!verifyPassword) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'BAD_REQUEST',
            });
        }

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = signTokens({
            email: celebrityUser.email,
            id: celebrityUser.id,
            username: celebrityUser.username,
        });

        // // Send Access Token in Cookie
        ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
        ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        ctx.res.cookie('logged_in', true, {
            ...cookieOptions,
            httpOnly: false,
        });

        return {
            email: celebrityUser.email,
            id: celebrityUser.id,
            username: celebrityUser.username,
        };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'BAD_REQUEST',
            message: 'BAD REQUEST',
        });
    }
};

export const signTokens = (user: { email: string; id: string; username: string | null }) => {
    try {
        // 2. Create Access and Refresh tokens
        const access_token = signJwt(user, 'accessTokenPrivateKey', {
            expiresIn: `${customConfig.accessTokenExpiresIn}m`,
        });

        const refresh_token = signJwt(user, 'refreshTokenPrivateKey', {
            expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
        });

        // 1. Create Session
        redisClient.set(`${user.id}`, JSON.stringify({ ...user, refresh_token }), {
            EX: customConfig.redisCacheExpiresIn * 60,
        });

        return { access_token, refresh_token };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'SERVER ERROR',
        });
    }
};
