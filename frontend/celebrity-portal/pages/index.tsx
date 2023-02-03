import { GetServerSidePropsContext } from 'next';
import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import React from 'react';
import { verifyJwt } from '../src/utils/jwt';

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const refresh_token = context.req.cookies.refresh_token;
    const access_token = context.req.cookies.access_token;
    const device_uid = context.req.cookies.device_uid;
    const logged_in = context.req.cookies.logged_in;

    if (access_token && refresh_token && device_uid && logged_in) {
        const decodeRefreshToken = verifyJwt(refresh_token, 'refreshTokenPrivateKey');

        if (!decodeRefreshToken) {
            return {
                redirect: {
                    destination: '/signin',
                    permanent: false,
                },
            };
        }

        return {
            props: {
                user: decodeRefreshToken,
            }, // will be passed to the page component as props
        };
    } else {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }
}

Web.getLayout = (page: React.ReactNode) => {
    return <BaseLayout>{page}</BaseLayout>;
};
