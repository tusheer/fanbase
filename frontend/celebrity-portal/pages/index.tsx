import React from 'react';
import trpc from '../src/config/trpc';
import AuthLayout from '../src/layouts/AuthLayout';
import BaseLayout from '../src/layouts/BaseLayout';
import { DecodedUser, withSession } from './_app';

export default function Web() {
    const { data, isLoading, isError } = trpc.user.getCelebrityProfile.useQuery();

    if (isError) {
        return <div>Error happen</div>;
    }
    {
        isLoading ? <div>...Loading</div> : null;
    }
    return (
        <section className="mx-auto max-w-7xl px-5">
            <section className="py-40 ">{JSON.stringify(data)}</section>
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
            <BaseLayout>{page}</BaseLayout>
        </AuthLayout>
    );
};
