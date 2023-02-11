import { RequestHandler } from 'express';
import useragent from 'express-useragent';
import userServices from '../../service/user';
import { verifyJwt } from '../../utils/jwt';

export type DecodedUser = {
    email: string;
    id: string;
    username: string;
    iat: number;
    exp: number;
};

export const getRefreshToken: RequestHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token as string;
        const accessToken = req.cookies.access_token;
        const device_uid = req.cookies.device_uid as string;
        const deviceInfo = useragent.parse(req.headers['user-agent'] as string);

        const refreshTokenDecoded = verifyJwt(refreshToken, 'refreshTokenPrivateKey') as DecodedUser;

        if (!refreshTokenDecoded || !accessToken) {
            return res.status(401).send({
                message: 'UNAUTHORIZED',
            });
        }

        const celebrityUser = await userServices.findCelebrityUser({
            where: {
                email: refreshTokenDecoded.email,
            },
            select: {
                email: true,
                id: true,
                username: true,
                session: true,
            },
        });

        if (!celebrityUser) {
            res.statusCode = 401;
            return new Error('User is not registred');
        }
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

            userServices.removeUserCookies({ req, res });
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
        userServices.setUserCookies(
            { req, res },
            {
                access_token,
                refresh_token,
                session_uid: session.id,
            }
        );

        return res.status(200).send({
            email: celebrityUser.email,
            id: celebrityUser.id,
            username: celebrityUser.username,
        });
    } catch (error) {
        return new Error('UNAUTHENTICATED');
    }
};
