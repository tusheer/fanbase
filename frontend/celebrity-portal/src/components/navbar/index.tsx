import Link from 'next/link';
import Router from 'next/router';
import { Button } from 'ui/components';
import trpc from '../../config/trpc';
import useUserStore from '../../store/user';

const Navbar = () => {
    const { user, removeUser } = useUserStore();

    const logoutUser = trpc.user.logoutCelebrityUser.useMutation({
        onSuccess: () => {
            removeUser();
            Router.push('/signin');
        },
    });

    return (
        <nav className="h-14 border-b border-b-gray-100 bg-white ">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 ">
                <Link href={'/'}>
                    <b className="from-brand-main to-brand-600  bg-gradient-to-tr bg-clip-text text-3xl text-transparent">
                        Fanbase.
                    </b>
                </Link>
                {user ? (
                    <Button rounded onClick={() => logoutUser.mutate()}>
                        Logout
                    </Button>
                ) : (
                    <div className="flex items-center  gap-9">
                        <Link
                            className="hover:text-brand-main active:text-brand-500 text-base font-medium"
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
