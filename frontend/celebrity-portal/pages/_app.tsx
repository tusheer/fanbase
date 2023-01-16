import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import trpc from '../src/config/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from '@next/font/google';
import type { AppRouter } from 'hero';
import '../styles/tailwind.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const inter = Inter({ weight: ['300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <main className={inter.className}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
        </main>
    );
};

//  @ts-ignore: Unreachable code error
export default trpc.withTRPC<AppRouter>(MyApp);
