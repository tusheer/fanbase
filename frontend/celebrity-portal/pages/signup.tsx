import React from 'react';
import { celebritySignupSchema } from 'hero/schema/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type CelebritySignupType = z.infer<typeof celebritySignupSchema>;

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<CelebritySignupType>({
        resolver: zodResolver(celebritySignupSchema),
        mode: 'onChange',
    });

    const handleOnSubmit: SubmitHandler<CelebritySignupType> = (data) => {
        if (!isValid) {
            return;
        }

        console.log(data);
    };

    return (
        <div>
            <h1>Signup celebrity</h1>

            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <label htmlFor="firstName">
                    <input id="firstName" {...register('firstName')} />
                </label>
                <label htmlFor="lastName">
                    <input id="lastName" {...register('lastName')} />
                </label>
                <label htmlFor="email">
                    <input type="email" id="email" {...register('email')} />
                </label>
                <label htmlFor="password">
                    <input id="password" {...register('password')} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignupPage;
