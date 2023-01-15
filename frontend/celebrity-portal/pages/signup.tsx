import React from 'react';
import { celebritySignupSchema } from 'schema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput } from 'ui/components/TextInput';

type CelebritySignupType = z.infer<typeof celebritySignupSchema>;

const SignupPage = () => {
    const {
        // register,
        handleSubmit,
        formState: { isValid },
    } = useForm<CelebritySignupType>({
        resolver: zodResolver(celebritySignupSchema),
        mode: 'onChange',
    });

    const handleOnSubmit: SubmitHandler<CelebritySignupType> = () => {
        if (!isValid) {
            return;
        }
    };

    return (
        <div>
            <h1>Signup celebrity</h1>

            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <TextInput />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignupPage;
