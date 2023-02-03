import Link from 'next/link';
import React from 'react';
import { Button } from 'ui/components';
import useUserStore from '../../store/user';

const Navbar = () => {
    const { user, removeUser } = useUserStore();

    return (
        <nav className="h-20 bg-white border-b ">
            <div className="max-w-7xl px-5 flex justify-between h-full items-center mx-auto ">
                <Link href={'/'}>
                    <b className="text-3xl text-transparent  bg-clip-text bg-gradient-to-tr from-brand-main to-brand-600">
                        Fanbase.
                    </b>
                </Link>
                {user ? (
                    <Button onClick={removeUser}>Logout</Button>
                ) : (
                    <div className="flex gap-9  items-center">
                        <Link
                            className="text-base font-medium hover:text-brand-main active:text-brand-500"
                            href="/signin"
                        >
                            Signin
                        </Link>
                        <Link href={'/signup'}>
                            <Button rounded>Signup</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
