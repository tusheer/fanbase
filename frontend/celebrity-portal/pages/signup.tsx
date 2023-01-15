import React from 'react';
import { celebritySignupSchema } from 'schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput } from 'ui/components';

type CelebritySignupType = z.infer<typeof celebritySignupSchema>;

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<CelebritySignupType>({
        resolver: zodResolver(celebritySignupSchema),
        mode: 'onSubmit',
    });

    const handleOnSubmit: SubmitHandler<CelebritySignupType> = (data) => {
        if (!isValid) {
            return;
        }
    };

    return (
        <div className="min-h-screen pt-20 px-5 bg-gray-50">
            <div className="max-w-2xl block p-7 bg-white border rounded-md mx-auto">
                <h1 className="text-3xl mb-8 text-gray-800 font-medium">Signup celebrity</h1>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <TextInput
                        error={!!errors.firstName}
                        errorText={errors.firstName?.message}
                        {...register('firstName')}
                        className="mb-2.5"
                        label="First Name"
                    />
                    <TextInput
                        error={!!errors.lastName}
                        errorText={errors.lastName?.message}
                        {...register('lastName')}
                        label="Second Name"
                        className="mb-2.5"
                    />
                    <TextInput
                        error={!!errors.password}
                        errorText={errors.phoneNumber?.message}
                        {...register('phoneNumber')}
                        label="Phone Number"
                        className="mb-2.5"
                    />
                    <TextInput
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        {...register('email')}
                        label="Email"
                        className="mb-2.5"
                    />
                    <TextInput
                        error={!!errors.password}
                        errorText={errors.password?.message}
                        {...register('password')}
                        type="password"
                        label="Password"
                        className="mb-2.5"
                    />
                    <button
                        className="mt-7 bg-gray-800 rounded-md h-10 text-white text-sm font-medium px-7 hover:bg-gray-900"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
