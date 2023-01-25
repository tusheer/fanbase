import React, { ReactNode } from 'react';
import { CelebritySignupType, celebritySignupSchema } from 'schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from 'ui/components';
import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import Router from 'next/router';

const SignupPage = () => {
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
        try {
            await ceateUser.mutateAsync(data);
            Router.push(`/`);
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <div className="pt-20 px-5">
            <div className="max-w-3xl text-center px-10 mx-auto">
                <h1 className="text-3xl mb-5 text-gray-800 font-semibold text-transparent  bg-clip-text bg-gradient-to-tr from-brand-main to-brand-600">
                    Signup celebrity account
                </h1>
                <p className="mb-8 max-w-xl text-center mx-auto text-gray-700">
                    Orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                </p>
            </div>

            <div className="max-w-2xl block py-8 px-7 bg-white border rounded-md mx-auto">
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="mb-4 flex gap-5">
                        <TextInput
                            className="w-6/12"
                            error={!!errors.firstName}
                            errorText={errors.firstName?.message}
                            {...register('firstName')}
                            label="First Name"
                        />
                        <TextInput
                            className="w-6/12"
                            error={!!errors.lastName}
                            errorText={errors.lastName?.message}
                            {...register('lastName')}
                            label="Second Name"
                        />
                    </div>
                    <div className="mb-4 flex gap-5">
                        <TextInput
                            className="w-6/12"
                            error={!!errors.email}
                            errorText={errors.email?.message}
                            {...register('email')}
                            label="Email"
                        />
                        <TextInput
                            error={!!errors.phoneNumber}
                            errorText={errors.phoneNumber?.message}
                            {...register('phoneNumber')}
                            label="Phone Number"
                            className="w-6/12"
                        />
                    </div>
                    <div className="flex gap-5">
                        <TextInput
                            error={!!errors.password}
                            errorText={errors.password?.message}
                            {...register('password')}
                            type="password"
                            label="Password"
                            className="w-6/12"
                        />
                        <TextInput
                            error={!!errors.confirmPassword}
                            errorText={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                            type="password"
                            label="Confirm Password"
                            className="w-6/12"
                        />
                    </div>

                    <Button className="mt-7" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

SignupPage.getLayout = (page: ReactNode) => {
    return <BaseLayout className="min-h-screen bg-gray-50 bg-opacity-80">{page}</BaseLayout>;
};

export default SignupPage;
