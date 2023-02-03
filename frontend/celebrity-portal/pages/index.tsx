import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import React from 'react';
import { DecodedUser, withSession } from './_app';
import AuthLayout from '../src/layouts/AuthLayout';

export default function Web() {
    const { data, isLoading, isError } = trpc.user.getCelebrityProfile.useQuery();

    if (isError) {
        return <div>Error happen</div>;
    }
    return (
        <>
            {isLoading ? <div>...Loading</div> : null}
            <section className="py-40 max-w-7xl px-5 mx-auto">{JSON.stringify(data)}</section>
        </>
    );
}

export const getServerSideProps = withSession((ctx, user) => {
    // if (user) {
    return {
        props: {
            user,
        },
    };
    // }
    // return { redirect: { destination: '/signin', permanent: true } };
});

Web.getLayout = (page: React.ReactNode, pageProps: { user: DecodedUser | null }) => {
    return (
        <AuthLayout user={pageProps.user}>
            <BaseLayout>{page}</BaseLayout>
        </AuthLayout>
    );
};
