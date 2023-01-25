import { NextRequest, NextResponse } from 'next/server';

//? If any authenticated path name change or add please edit matcher array, otherwise authentication middleware will not work

export function middleware(req: NextRequest) {
    const buyerToken = req.cookies.get('refresh_token');

    if (buyerToken?.value) {
        let user: null = null;

        if (user) {
            // NextResponse.redirect(req.url).cookies.set('user', JSON.stringify(user));
            return NextResponse.next();
        }
        return NextResponse.redirect(process.env.NODE_ENV as string);
    }
    return NextResponse.redirect(process.env.NODE_ENV as string);
}

export const config = {
    matcher: ['/'],
};
