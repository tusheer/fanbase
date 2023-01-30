import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import React from 'react';

export default function Web() {
    const { data, isLoading, isError, error } = trpc.user.getCelebrityProfile.useQuery(undefined);
    if (isError) {
        return JSON.stringify(error);
    }
    return (
        <>
            {isLoading ? <div>...Loadingg</div> : null}
            <section className="py-40 max-w-7xl px-5 mx-auto">{JSON.stringify(data)}</section>
        </>
    );
}

Web.getLayout = (page: React.ReactNode) => {
    return <BaseLayout>{page}</BaseLayout>;
};
