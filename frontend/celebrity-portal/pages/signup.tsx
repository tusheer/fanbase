import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { celebritySignupSchema } from 'hero/schema/user';
import { useForm } from 'react-hook-form';

const SignupPage = () => {
    return (
        <div>
            <h1>Signup celebrity</h1>

            <form>
                <input type="text" />
            </form>
        </div>
    );
};

export default SignupPage;
