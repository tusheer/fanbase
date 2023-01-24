import { CelebritySignupType, SigninType } from 'schema';
import prisma, { Prisma } from '../../utils/prisma';
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import { Context } from '../../server';
import { CookieOptions } from 'express';
import customConfig from '../../config/default';
import { signJwt } from '../../utils/jwt';
import redisClient from '../../utils/connectRedis';
import { nanoid } from 'nanoid';
import useragent from 'express-useragent';
// [...] Cookie options

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};

const accessTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 24 * 3600000),
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + customConfig.refreshTokenExpiresIn * 24 * 3600000),
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
        const deviceInfo = useragent.parse(ctx.req.headers['user-agent'] as string);

        const username = `${stringReplace(firstName)}-${stringReplace(lastName)}-${nanoid(6)}`;
        const hashpassword = await argon2.hash(password);

        const celebrityUser = await prisma.celebrity.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashpassword,
                phone: phoneNumber,
                username,
            },
        });

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = signTokens(celebrityUser);

        const session = await prisma.session.create({
            data: {
                refreshToken: refresh_token,
                userAgent: JSON.stringify(deviceInfo),
                celebrityId: celebrityUser.id,
            },
        });

        ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
        ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        ctx.res.cookie('device_uid', session.id, {
            ...cookieOptions,
            httpOnly: true,
        });
        ctx.res.cookie('logged_in', true, {
            ...cookieOptions,
            httpOnly: false,
        });

        setUserInRedis({
            ...celebrityUser,
            session: [session],
        });

        return {
            username: celebrityUser.username,
            id: celebrityUser.id,
        };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'BAD_REQUEST',
            message: 'BAD REQUEST',
        });
    }
};

export const singinCelebrityUser = async ({ input, ctx }: { input: SigninType; ctx: Context }) => {
    const deviceInfo = useragent.parse(ctx.req.headers['user-agent'] as string);

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
                session: true,
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

        //if user trying to singin from the same device, then we remove his currect session and reassign
        const device_uid = ctx.req.cookies.device_uid;
        const findSessionInUser = celebrityUser.session.find((session) => session.id === device_uid);

        if (findSessionInUser) {
            await prisma.session.delete({
                where: {
                    id: device_uid,
                },
                include: {
                    Celebrity: true,
                },
            });

            deleteUserSessionInRedis(celebrityUser.username, device_uid);

            ctx.res.clearCookie('access_token');
            ctx.res.clearCookie('refresh_token');
            ctx.res.clearCookie('device_uid');
            ctx.res.clearCookie('logged_in');
        }

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = signTokens({
            email: celebrityUser.email,
            id: celebrityUser.id,
            username: celebrityUser.username,
        });

        //Create sesstion for user agent
        const session = await prisma.session.create({
            data: {
                refreshToken: refresh_token,
                userAgent: JSON.stringify(deviceInfo),
                celebrityId: celebrityUser.id,
            },
        });

        //remove previous session and add new
        const sessionIndex = celebrityUser.session.findIndex((data) => data.id === device_uid);
        celebrityUser.session.splice(sessionIndex, 1, session);

        setUserInRedis({
            ...celebrityUser,
        });

        //  Send Access Token in Cookie
        ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
        ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        ctx.res.cookie('device_uid', session.id, {
            ...cookieOptions,
            httpOnly: true,
        });
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

const setUserInRedis = (
    user: Prisma.CelebrityGetPayload<{
        select: {
            username: true;
            email: true;
            session: true;
        };
    }>
) => {
    // 1. Create Session

    //TODO : Need to set a expire date after 2 month
    redisClient.set(`${user.username}`, JSON.stringify({ ...user }));
};

const deleteUserSessionInRedis = async (username: string, deviceUid: string) => {
    const jsonUser = (await redisClient.get(username)) as string;

    if (jsonUser) {
        const user = JSON.parse(jsonUser) as Prisma.CelebrityGetPayload<{
            select: {
                session: true;
            };
        }>;

        const sessionIndex = user.session.findIndex((data) => data.id === deviceUid);
        user.session.splice(sessionIndex, 1);
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

        return { access_token, refresh_token };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'SERVER ERROR',
        });
    }
};
