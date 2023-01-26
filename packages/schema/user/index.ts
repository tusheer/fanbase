import { object, string, ZodIssueCode, infer as ZodInfer } from 'zod';

export const celebritySignupSchema = object({
    email: string().email(),
    password: string().min(6),
    firstName: string().min(1),
    lastName: string().min(1),
    phoneNumber: string().refine((stg) => stg?.length === 0 || stg?.length > 10, { message: 'Required 11 length' }),
    confirmPassword: string().min(6),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: ZodIssueCode.custom,
            message: 'Passworld should match',
            path: ['confirmPassword'],
        });
    }
});

export const signinSchema = object({
    email: string().email(),
    password: string().min(6),
});

export type CelebritySignupType = ZodInfer<typeof celebritySignupSchema>;
export type SigninType = ZodInfer<typeof signinSchema>;
