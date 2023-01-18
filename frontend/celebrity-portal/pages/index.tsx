import { Button } from 'ui/components';
import BaseLayout from '../src/layouts/BaseLayout';
import React from 'react';
import Link from 'next/link';

export default function Web() {
    return (
        <>
            <section className="py-40 max-w-7xl px-5 mx-auto  ">
                <h1 className="text-transparent leading-tight  font-black text-6xl max-w-4xl mx-auto text-center  bg-clip-text bg-gradient-to-tr from-brand-main to-brand-600">
                    Fanbase, Grow with your amazing network
                </h1>
                <p className="max-w-4xl mx-auto text-center font-medium text-lg mt-8 text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti ullam ut deleniti, perferendis
                    impedit voluptas exercitationem aperiam minima. fugiat dolorum cumque ullam? A dolore placeat id,
                    quibusdam dolores nulla.
                </p>
                <div className="flex justify-center mt-8">
                    <Link href={'/singup'}>
                        <Button>Singup</Button>
                    </Link>
                </div>
            </section>
        </>
    );
}

Web.getLayout = (page: React.ReactNode) => {
    return <BaseLayout>{page}</BaseLayout>;
};
