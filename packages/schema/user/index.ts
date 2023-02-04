import { infer as ZodInfer, object, string, ZodIssueCode } from 'zod';

export const celebritySignupSchema = object({
    email: string().email().trim(),
    password: string().min(6),
    firstName: string().min(1).trim(),
    lastName: string().min(1).trim(),
    // phoneNumber: string().refine((stg) => stg?.length === 0 || stg?.length > 10, { message: 'Required 11 length' }),
    phoneNumber: string().min(11).max(13).trim().optional(),
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
