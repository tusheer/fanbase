import { ImageType } from '@fanbase/schema';
import React, { PropsWithChildren, useEffect } from 'react';
import { DecodedUser } from '../../../pages/_app';
import trpc from '../../config/trpc';
import useUserStore from '../../store/user';

type AuthProps = PropsWithChildren<{
    user: DecodedUser | null;
}>;

const AuthLayout: React.FC<AuthProps> = ({ children, user }) => {
    const { setUser } = useUserStore();

    useEffect(() => {
        setUser(user);
    }, [user, setUser]);

    trpc.user.getCelebrityProfile.useQuery(undefined, {
        onSuccess({ socialMedia, coverImage, profilePicture, ...data }) {
            setUser({
                ...data,
                socialMedia: socialMedia as any,
                profilePicture: profilePicture as ImageType,
                coverImage: coverImage as ImageType,
            });
        },
    });

    return <>{children}</>;
};

export default AuthLayout;
