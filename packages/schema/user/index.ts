import { object, string, ZodIssueCode, infer as ZodInfer } from 'zod';

export const celebritySignupSchema = object({
    email: string().email(),
    password: string().min(6),
    firstName: string().min(1),
    lastName: string().min(1),
    phoneNumber: string().min(11).optional(),
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

export const adminSignupSchema = object({
    email: string(),
    password: string(),
});

export type CelebritySignupType = ZodInfer<typeof celebritySignupSchema>;
