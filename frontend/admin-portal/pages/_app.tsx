import { NextPage } from 'next';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            {getLayout(
                <>
                    <Component {...pageProps} />
                </>,
                { ...(pageProps as AppProps) }
            )}
        </>
    );
}
