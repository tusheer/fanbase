import { celebritySignupSchema, CelebritySignupType } from '@fanbase/schema';
import { Button, TextInput } from '@fanbase/ui/components';
import Router from 'next/router';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import removeNullOrEmpty from '../src/utils/removeNullOrEmpty';
import zodSchemaResolver from '../src/utils/zodSchemaParse';

const SignupPage = () => {
    const ceateUser = trpc.user.createCelebrityUser.useMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<CelebritySignupType>({
        resolver: zodSchemaResolver(celebritySignupSchema),
        mode: 'onSubmit',
    });

    const handleOnSubmit: SubmitHandler<CelebritySignupType> = async (data) => {
        if (!isValid) {
            return;
        }
        try {
            await ceateUser.mutateAsync(removeNullOrEmpty(data));
            Router.push(`/`);
        } catch (error) {
            console.log('error');
        }
    };

    return (
        <div className="px-5 pt-20">
            <div className="mx-auto max-w-3xl px-10 text-center">
                <h1 className="from-brand-main to-brand-600 mb-5 bg-gradient-to-tr bg-clip-text  text-3xl font-semibold text-gray-800 text-transparent">
                    Signup celebrity account
                </h1>
                <p className="mx-auto mb-8 max-w-xl text-center text-gray-700">
                    Orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                </p>
            </div>

            <div className="mx-auto block max-w-2xl rounded-md border bg-white py-8 px-7">
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
