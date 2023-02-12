import { User } from '@fanbase/database';
import { CelebritySignupType, DeviceInfoType, ImageType, SigninType } from '@fanbase/schema';
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
        const deviceInfo = useragent.parse(ctx.req.headers['user-agent'] as string) as DeviceInfoType;

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
            select: {
                email: true,
                id: true,
                username: true,
                password: true,
                session: true,
                coverImage: true,
                firstName: true,
                lastName: true,
                phone: true,
                socialMedia: true,
                updateAt: true,
                createdAt: true,
                country: true,
                userType: true,
                profilePicture: true,
            },
        });

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = userServices.signTokens({
            country: celebrityUser.country,
            coverImage: celebrityUser.coverImage,
            createdAt: celebrityUser.createdAt,
            email: celebrityUser.email,
            firstName: celebrityUser.firstName,
            id: celebrityUser.id,
            lastName: celebrityUser.lastName,
            phone: celebrityUser.phone,
            profilePicture: celebrityUser.profilePicture,
            socialMedia: celebrityUser.socialMedia,
            updateAt: celebrityUser.updateAt,
            username: celebrityUser.username,
            userType: celebrityUser.userType,
        });

        const session = await userServices.createUserSession({
            data: {
                refreshToken: refresh_token,
                userAgent: {
                    isMobile: deviceInfo.isMobile,
                    isiPhone: deviceInfo.isiPhone,
                    isAndroid: deviceInfo.isAndroid,
                    browser: deviceInfo.browser,
                    os: deviceInfo.os,
                    platform: deviceInfo.platform,
                    source: deviceInfo.source,
                },
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
    const deviceInfo = useragent.parse(ctx.req.headers['user-agent'] as string) as DeviceInfoType;

    try {
        const { id, password, ...celebriryUser } = await userServices.findCelebrityUser({
            where: {
                email: input.email,
            },
            select: {
                email: true,
                id: true,
                username: true,
                session: true,
                coverImage: true,
                firstName: true,
                lastName: true,
                phone: true,
                socialMedia: true,
                updateAt: true,
                password: true,
                createdAt: true,
                country: true,
                userType: true,
                profilePicture: true,
            },
        });

        if (!id) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'User is not exit',
            });
        }

        const verifyPassword = await argon2.verify(password, input.password);
        if (!verifyPassword) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Password is not correct',
            });
        }

        //if user trying to singin from the same device, then we remove his currect session and reassign
        const device_uid = ctx.req.cookies.device_uid;
        const findSessionInUser = celebriryUser.session.find((session) => session.id === device_uid);

        if (findSessionInUser) {
            await userServices.deleteUserSession({
                where: {
                    id: device_uid,
                },
                include: {
                    User: true,
                },
            });

            userServices.deleteUserSessionInRedis(celebriryUser.userType, device_uid);

            userServices.removeUserCookies(ctx);
        }

        // Create the Access and refresh Tokens
        const { access_token, refresh_token } = userServices.signTokens({
            ...celebriryUser,
            id,
        });

        //Create sesstion for user agent
        const _session = await userServices.createUserSession({
            data: {
                refreshToken: refresh_token,
                userAgent: {
                    isMobile: deviceInfo.isMobile,
                    isiPhone: deviceInfo.isiPhone,
                    isAndroid: deviceInfo.isAndroid,
                    browser: deviceInfo.browser,
                    os: deviceInfo.os,
                    platform: deviceInfo.platform,
                    source: deviceInfo.source,
                },
                userId: id,
            },
        });

        //remove previous session and add new
        const sessionIndex = celebriryUser.session.findIndex((data) => data.id === device_uid);
        celebriryUser.session.splice(sessionIndex, 1, _session);

        userServices.setUserInRedis({
            ...celebriryUser,
            id,
        });

        //  Send Access Token in Cookie
        userServices.setUserCookies(ctx, {
            access_token,
            refresh_token,
            session_uid: _session.id,
        });

        return {
            id,
            email: celebriryUser.email,
            username: celebriryUser.username,
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
    try {
        const userName = ctx.user.username;
        const findUserInRedis = (await redisClient.get(userName)) as string | null;

        if (findUserInRedis) {
            const parseUser = JSON.parse(findUserInRedis) as User;
            return {
                firstName: parseUser.firstName,
                lastName: parseUser.lastName,
                profilePicture: parseUser.profilePicture,
                email: parseUser.email,
                phone: parseUser.email,
                socialMedia: parseUser.socialMedia,
                coverImage: parseUser.coverImage,
                country: parseUser.country,
                id: parseUser.id,
                updateAt: parseUser.updateAt,
                createdAt: parseUser.createdAt,
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
                country: true,
                updateAt: true,
                createdAt: true,
                coverImage: true,
                id: true,
                username: true,
                userType: true,
            },
        });

        if (!findUserInDatabase) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
            });
        }

        return findUserInDatabase;
    } catch (error) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
        });
    }
};

export const updateCelebrityProfilePicture = async ({ ctx, input }: { ctx: AuthContext; input: ImageType }) => {
    try {
        const updateUserProfilePicturer = await userServices.updateUser({
            data: {
                profilePicture: input,
            },
            where: {
                username: ctx.user.username,
            },
        });

        //TODO : add updated profile in session
        // userServices.setUserInRedis()

        return updateUserProfilePicturer;
    } catch (error) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
        });
    }
};
