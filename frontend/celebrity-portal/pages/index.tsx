import { Button, Modal } from '@fanbase/ui/components';
import { Edit } from '@fanbase/ui/icons/Pen';
import Image from 'next/image';
import React, { useState } from 'react';
import trpc from '../src/config/trpc';
import AuthLayout from '../src/layouts/AuthLayout';
import BaseLayout from '../src/layouts/BaseLayout';
import { DecodedUser, withSession } from './_app';

export default function Web() {
    const { isLoading, isError } = trpc.user.getCelebrityProfile.useQuery();
    const [isOpen, setisOpen] = useState(false);

    if (isError) {
        return <div>Error happen</div>;
    }
    {
        isLoading ? <div>...Loading</div> : null;
    }

    return (
        <section className="mx-auto max-w-7xl px-5">
            <div className="mt-3 flex gap-7">
                <div className="w-9/12">
                    <div className="relative h-56  rounded-md bg-gray-100">
                        <div className="absolute right-0  bottom-2 flex h-8 w-8 items-center justify-center rounded-full border bg-white">
                            <Edit className="h-5 w-5 text-gray-600" />
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
                                Jane Alam Tusher <div className="bg-brand-main h-4 w-4 rounded-full"></div>
                            </h2>
                            <p className="text-md font-medium text-gray-400">@tusheer</p>
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

            <Modal className="max-w-2xl rounded-xl border" open={isOpen} onClose={() => setisOpen(false)}>
                <div>
                    <div className="border-b py-3 px-5 ">
                        <h2 className="text-xl font-semibold">Edit profile picturer</h2>
                    </div>
                    <div className="px-5 py-7">
                        <div className="mx-auto h-64 w-64 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="flex justify-end gap-3 border-t px-5 py-3">
                        <Button rounded>Save Photo</Button>
                    </div>
                </div>
            </Modal>
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
