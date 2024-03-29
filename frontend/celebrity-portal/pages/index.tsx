import { UnmountDelay } from '@fanbase/ui/components';
import { Pen } from '@fanbase/ui/icons/Pen';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState } from 'react';
import AuthLayout from '../src/layouts/AuthLayout';
import BaseLayout from '../src/layouts/BaseLayout';
import useUserStore from '../src/store/user';
import { DecodedUser, withSession } from './_app';

const UploadProfileModal = dynamic(() => import('../src/modules/profile/components/UploadProfileModal'), {
    ssr: true,
});

export default function Web() {
    const user = useUserStore((state) => state.user);

    const [isOpen, setisOpen] = useState(false);

    return (
        <section className="mx-auto max-w-7xl px-5">
            <div className="mt-3 flex gap-7">
                <div className="w-9/12">
                    <div className="relative h-56  rounded-md bg-gray-100">
                        <div className="absolute right-0  bottom-2 flex h-8 w-8 items-center justify-center rounded-full border bg-white">
                            <Pen className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="absolute -bottom-10 left-6 h-36 w-36 rounded-full bg-white p-1">
                            <div className="relative h-full w-full  rounded-full bg-gray-200 ">
                                <div className="relative h-full w-full overflow-hidden rounded-full">
                                    <Image
                                        className="min-h-full min-w-full object-cover"
                                        src="/images/profile/blank_profile.png"
                                        alt="TGe"
                                        fill={true}
                                    />
                                </div>
                                <div
                                    onClick={() => setisOpen(true)}
                                    className="absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-full  transition-all duration-200 hover:bg-black/10"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between px-5">
                        <div className="mt-14">
                            <h2 className="flex items-center gap-3 text-xl font-extrabold">
                                {user?.firstName} {user?.lastName}{' '}
                                <div className="bg-brand-main h-4 w-4 rounded-full"></div>
                            </h2>
                            <p className="text-md font-medium text-gray-400">@{user?.username}</p>
                        </div>
                        <div>
                            <div
                                onClick={() => setisOpen(true)}
                                className="mt-4 flex h-10  w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-50"
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="h-72 w-3/12 rounded-md bg-gray-100"></div>
            </div>
            <UnmountDelay unmount={isOpen} delay={300}>
                <UploadProfileModal isOpen={isOpen} onClose={() => setisOpen(false)} />
            </UnmountDelay>
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
