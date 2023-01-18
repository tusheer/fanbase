import React, { ReactNode } from 'react';
import { CelebritySignupType, celebritySignupSchema } from 'schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from 'ui/components';
import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';

const SigninPage = () => {
    const ceateUser = trpc.user.createCelebrityUser.useMutation();

    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<CelebritySignupType>({
        resolver: zodResolver(celebritySignupSchema),
        mode: 'onSubmit',
    });

    const handleOnSubmit: SubmitHandler<CelebritySignupType> = async (data) => {
        if (!isValid) {
            return;
        }
        await ceateUser.mutateAsync(data);
    };

    return (
        <div className="pt-20 px-5">
            <div className="max-w-3xl text-center px-10 mx-auto">
                <h1 className="text-3xl mb-5 text-gray-800 font-semibold text-transparent  bg-clip-text bg-gradient-to-tr from-brand-main to-brand-600">
                    Sigin celebrity account
                </h1>
                <p className="mb-8 max-w-xl text-center mx-auto text-gray-700">
                    Orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                </p>
            </div>

            <div className="max-w-2xl block py-8 px-7 bg-white border rounded-md mx-auto">
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <TextInput
                        error={!!errors.firstName}
                        errorText={errors.firstName?.message}
                        {...register('firstName')}
                        label="First Name"
                    />
                    <TextInput
                        error={!!errors.lastName}
                        errorText={errors.lastName?.message}
                        {...register('lastName')}
                        label="Second Name"
                    />

                    <Button className="mt-7" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

SigninPage.getLayout = (page: ReactNode) => {
    return <BaseLayout className="min-h-screen bg-gray-50 bg-opacity-80">{page}</BaseLayout>;
};

export default SigninPage;
