import { User } from '@fanbase/database';
import { CelebritySignupType, SigninType } from '@fanbase/schema';
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import useragent from 'express-useragent';
import { nanoid } from 'nanoid';
import { AuthContext } from '../../middleware/protectedTrpcProdedure';
import userServices from '../../service/user';
import redisClient from '../../utils/connectRedis';
import { Context } from '../../utils/trpc';

const stringReplace = (str: string) => str.replace(' ', '-').toLowerCase();

export const createCelebrityUserController = async ({
    input: { password, email, firstName, lastName, phoneNumber },
    ctx,
}: {
    input: CelebritySignupType;
    ctx: Context;
}) => {
    try {
        const _user = await userServices.findCelebrityUser({
            where: {
                email,
            },
        });

        if (_user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'User already exit',
            });
        }
        const deviceInfo = useragent.parse(ctx.req.headers['user-agent'] as string);

        //TODO : Add lodash for utils
        const username = `${stringReplace(firstName)}-${stringReplace(lastName)}-${nanoid(6)}`;
        const hashpassword = await argon2.hash(password);

        const celebrityUser = await userServices.createCelebrityUser({
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
        const { access_token, refresh_token } = userServices.signTokens(celebrityUser);

        const session = await userServices.createUserSession({
            data: {
                refreshToken: refresh_token,
                userAgent: JSON.stringify(deviceInfo),
                userId: celebrityUser.id,
            },
        });
        userServices.setUserCookies(ctx, {
            access_token,
            refresh_token,
            session_uid: session.id,
        });

        userServices.setUserInRedis({
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
        const celebrityUser = await userServices.findCelebrityUser({
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
                message: 'Password is not correct',
            });
        }

        //if user trying to singin from the same device, then we remove his currect session and reassign
        const device_uid = ctx.req.cookies.device_uid;
        const findSessionInUser = celebrityUser.session.find((session) => session.id === device_uid);

        if (findSessionInUser) {
            await userServices.deleteUserSession({
                where: {
                    id: device_uid,
                },
                include: {
                    User: true,
                },
            });

            userServices.deleteUserSessionInRedis(celebrityUser.username, device_uid);

            userServices.removeUserCookies(ctx);
        }

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = userServices.signTokens({
            email: celebrityUser.email,
            id: celebrityUser.id,
            username: celebrityUser.username,
        });

        //Create sesstion for user agent
        const session = await userServices.createUserSession({
            data: {
                refreshToken: refresh_token,
                userAgent: JSON.stringify(deviceInfo),
                userId: celebrityUser.id,
            },
        });

        //remove previous session and add new
        const sessionIndex = celebrityUser.session.findIndex((data) => data.id === device_uid);
        celebrityUser.session.splice(sessionIndex, 1, session);

        userServices.setUserInRedis({
            ...celebrityUser,
        });

        //  Send Access Token in Cookie
        userServices.setUserCookies(ctx, {
            access_token,
            refresh_token,
            session_uid: session.id,
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

export const logoutCelebrityUserController = async ({ ctx }: { ctx: AuthContext }) => {
    try {
        const device_uid = ctx.req.cookies.device_uid;

        await userServices.deleteUserSession({
            where: {
                id: device_uid,
            },
            select: {
                User: true,
            },
        });

        await userServices.deleteUserSessionInRedis(ctx.user.username, device_uid);

        userServices.removeUserCookies(ctx);

        return {
            message: 'Logout successfully',
        };
    } catch (error) {
        throw new TRPCError({
            cause: error,
            code: 'BAD_REQUEST',
            message: 'BAD REQUEST',
        });
    }
};

export const getCelebrityProfileController = async ({ ctx }: { ctx: AuthContext }) => {
    const userName = ctx.user.username;
    const findUserInRedis = (await redisClient.get(userName)) as User | null;

    if (findUserInRedis) {
        return {
            firstName: findUserInRedis.firstName,
            lastName: findUserInRedis.lastName,
            profilePicture: findUserInRedis.profilePicture,
            email: findUserInRedis.email,
            phone: findUserInRedis.email,
            socialMedia: findUserInRedis.socialMedia,
        } as User;
    }

    const findUserInDatabase = await userServices.findCelebrityUser({
        where: {
            username: userName,
        },
        select: {
            firstName: true,
            lastName: true,
            profilePicture: true,
            email: true,
            phone: true,
            socialMedia: true,
        },
    });

    if (!findUserInDatabase) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
        });
    }

    return findUserInDatabase;
};

export const updateCelebrityProfilePicture = () => {
    return {};
};
