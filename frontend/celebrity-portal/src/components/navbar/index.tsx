import Link from 'next/link';
import React from 'react';
import { Button } from 'ui/components';

const Navbar = () => {
    return (
        <nav className="h-20 bg-white border-b ">
            <div className="max-w-7xl px-5 flex justify-between h-full items-center mx-auto ">
                <Link href={'/'}>
                    <b className="text-3xl text-transparent  bg-clip-text bg-gradient-to-tr from-brand-main to-brand-600">
                        Fanbase.
                    </b>
                </Link>

                <div>
                    <Link href={'/signup'}>
                        <Button rounded>Signup</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
