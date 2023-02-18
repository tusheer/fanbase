import { signinSchema, SigninType } from '@fanbase/schema';
import { Button, TextInput } from '@fanbase/ui/components';
import Router from 'next/router';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import trpc from '../src/config/trpc';
import BaseLayout from '../src/layouts/BaseLayout';
import removeNullOrEmpty from '../src/utils/removeNullOrEmpty';
import zodSchemaResolver from '../src/utils/zodSchemaParse';

const SigninPage = () => {
    const ceateUser = trpc.user.signinCelebrityUser.useMutation();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<SigninType>({
        resolver: zodSchemaResolver(signinSchema),
        mode: 'onSubmit',
    });

    const handleOnSubmit: SubmitHandler<SigninType> = async (data) => {
        if (!isValid) {
            return;
        }
        await ceateUser.mutateAsync(removeNullOrEmpty(data));
        Router.push(`/`);
    };

    return (
        <div className="px-5 pt-20">
            <div className="mx-auto max-w-3xl px-10 text-center">
                <h1 className="from-brand-main to-brand-600 mb-5 bg-gradient-to-tr bg-clip-text  text-3xl font-semibold text-gray-800 text-transparent">
                    Sigin celebrity account
                </h1>
                <p className="mx-auto mb-8 max-w-xl text-center text-gray-700">
                    Orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                </p>
            </div>

            <div className="mx-auto block max-w-2xl rounded-md border bg-white py-8 px-7">
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <TextInput
                        className="mb-5"
                        type="email"
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        {...register('email')}
                        label="Email"
                    />
                    <TextInput
                        type="password"
                        error={!!errors.password}
                        errorText={errors.password?.message}
                        {...register('password')}
                        label="Password"
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
