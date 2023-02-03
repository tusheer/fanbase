import { Request, Response } from 'express';

export const getRefreshToken = async (res: Response, req: Request) => {
    const refresh_token = req.headers.refresh_token;
    const access_token = req.headers.access_token;
    const device_uid = req.headers.device_uid;

    return res.status(200).send({
        access_token,
        refresh_token,
        device_uid,
    });
};
