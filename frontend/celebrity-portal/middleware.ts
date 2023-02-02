import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './src/utils/jwt';

export async function middleware(req: NextRequest) {
    const refresh_token = req.cookies.get('refresh_token')?.value;
    const access_token = req.cookies.get('access_token')?.value;
    const device_uid = req.cookies.get('device_uid')?.value;
    const logged_in = req.cookies.get('logged_in')?.value;

    if (access_token && refresh_token && device_uid && logged_in) {
        const decodeRefreshToken = verifyJwt(refresh_token);

        if (!decodeRefreshToken) return NextResponse.redirect(new URL('/signin', req.url));

        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

export const config = {
    matcher: ['/'],
};
