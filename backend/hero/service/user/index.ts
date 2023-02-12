import { Prisma } from '@fanbase/database';
import { TRPCError } from '@trpc/server';
import { CookieOptions } from 'express';
import { Context } from '../..';
import customConfig from '../../config/default';
import redisClient from '../../utils/connectRedis';
import { signJwt } from '../../utils/jwt';
import prisma from '../../utils/prisma';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
};

const accessTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + 60 * 24 * 3600000),
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    expires: new Date(Date.now() + 60 * 24 * 3600000),
};

const createCelebrityUser = async (createArg: Prisma.UserCreateArgs) => {
    return await prisma.user.create(createArg);
};

const findCelebrityUser = async <T extends Prisma.UserSelect | undefined>({
    where = {},
    select,
}: {
    select?: T;
    where?: Prisma.UserWhereUniqueInput;
}) => {
    return (await prisma.user.findUnique({
        where,
        select,
    })) as Prisma.UserGetPayload<{ select: T }>;
};

const createUserSession = async (creaetArg: Prisma.SessionCreateArgs) => {
    return await prisma.session.create(creaetArg);
};

const deleteUserSession = async (deleteArg: Prisma.SessionDeleteArgs) => {
    return await prisma.session.delete(deleteArg);
};

const setUserInRedis = (
    user: Prisma.UserGetPayload<{
        select: {
            email: true;
            id: true;
            username: true;
            session: true;
            coverImage: true;
            firstName: true;
            lastName: true;
            phone: true;
            socialMedia: true;
            updateAt: true;
            createdAt: true;
            country: true;
            userType: true;
            profilePicture: true;
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
        const user = JSON.parse(jsonUser) as Prisma.UserGetPayload<{
            select: {
                session: true;
            };
        }>;

        const sessionIndex = user.session.findIndex((data) => data.id === deviceUid);
        user.session.splice(sessionIndex, 1);
    }
};

const updateUser = (updateArg: Prisma.UserUpdateArgs) => prisma.user.update(updateArg);

const setUserCookies = (
    ctx: Context,
    { access_token, refresh_token, session_uid }: { access_token: string; refresh_token: string; session_uid: string }
) => {
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    ctx.res.cookie('device_uid', session_uid, {
        ...cookieOptions,
        httpOnly: true,
    });
    ctx.res.cookie('logged_in', true, {
        ...cookieOptions,
        httpOnly: false,
    });
};

const removeUserCookies = (ctx: Context) => {
    ctx.res.clearCookie('access_token');
    ctx.res.clearCookie('refresh_token');
    ctx.res.clearCookie('device_uid');
    ctx.res.clearCookie('logged_in');
};

export const signTokens = (
    user: Prisma.UserGetPayload<{
        select: {
            email: true;
            id: true;
            username: true;
            coverImage: true;
            firstName: true;
            lastName: true;
            phone: true;
            socialMedia: true;
            updateAt: true;
            createdAt: true;
            country: true;
            userType: true;
            profilePicture: true;
        };
    }>
) => {
    try {
        // 2. Create Access and Refresh tokens
        const access_token = signJwt(user, 'accessTokenPrivateKey', {
            expiresIn: `${customConfig.accessTokenExpiresIn}d`,
        });

        const refresh_token = signJwt(user, 'refreshTokenPrivateKey', {
            expiresIn: `${customConfig.refreshTokenExpiresIn}d`,
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

export default {
    createCelebrityUser,
    createUserSession,
    setUserInRedis,
    deleteUserSessionInRedis,
    setUserCookies,
    removeUserCookies,
    deleteUserSession,
    findCelebrityUser,
    signTokens,
    updateUser,
};
