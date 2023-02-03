import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import trpc from '../src/config/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from '@next/font/google';
import type { AppRouter } from 'hero';
import '../styles/tailwind.css';
import { verifyJwt } from '../src/utils/jwt';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export type DecodedUser = {
    email: string;
    id: string;
    username: string;
    iat: number;
    exp: number;
};

const inter = Inter({ weight: ['300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <main className={inter.className}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
        </main>,
        { ...pageProps }
    );
};

export const withSession = (
    getSerSideProps: (ctx: GetServerSidePropsContext, user: DecodedUser | null) => any
): GetServerSideProps => {
    return (ctx: GetServerSidePropsContext) => {
        const refresh_token = ctx.req.cookies.refresh_token;
        const access_token = ctx.req.cookies.access_token;
        const device_uid = ctx.req.cookies.device_uid;
        const logged_in = ctx.req.cookies.logged_in;

        let decodedUser: DecodedUser | null = null;

        if (access_token && refresh_token && device_uid && logged_in) {
            decodedUser = verifyJwt(refresh_token, 'refreshTokenPrivateKey') as DecodedUser;
        }

        return getSerSideProps(ctx, decodedUser);
    };
};
//  @ts-ignore: Unreachable code error
export default trpc.withTRPC<AppRouter>(MyApp);
