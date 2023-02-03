import React, { PropsWithChildren, useEffect } from 'react';
import { DecodedUser } from '../../../pages/_app';
import useUserStore from '../../store/user';

type AuthProps = PropsWithChildren<{
    user: DecodedUser | null;
}>;

const AuthLayout: React.FC<AuthProps> = ({ children, user }) => {
    const { setUser } = useUserStore();

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    return <>{children}</>;
};

export default AuthLayout;
