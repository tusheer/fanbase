import React from 'react';
import trpc from '../src/config/trpc';
import AuthLayout from '../src/layouts/AuthLayout';
import BaseLayout from '../src/layouts/BaseLayout';
import { DecodedUser, withSession } from './_app';

export default function Web() {
    const { isLoading, isError } = trpc.user.getCelebrityProfile.useQuery();

    if (isError) {
        return <div>Error happen</div>;
    }
    {
        isLoading ? <div>...Loading</div> : null;
    }
    return (
        <section className="mx-auto max-w-7xl px-5">
            <div className="mt-3 flex gap-7">
                <div className="relative h-60 w-9/12 rounded bg-gray-100">
                    <div className="absolute -bottom-10 left-7 h-36 w-36 rounded-full bg-white p-1">
                        <div className="h-full w-full rounded-full bg-gray-200"></div>
                    </div>
                </div>
                <div className="h-72 w-3/12 rounded bg-gray-100"></div>
            </div>
        </section>
    );
}

export const getServerSideProps = withSession((ctx, user) => {
    if (user) {
        return {
            props: {
                user,
            },
        };
    }
    return { redirect: { destination: '/signin', permanent: true } };
});

Web.getLayout = (page: React.ReactNode, pageProps: { user: DecodedUser | null }) => {
    return (
        <AuthLayout user={pageProps.user}>
            <BaseLayout className="min-h-screen">{page}</BaseLayout>
        </AuthLayout>
    );
};
