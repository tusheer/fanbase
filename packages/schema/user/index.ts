import { object, string } from 'zod';

export const celebritySignupSchema = object({
    email: string().email(),
    password: string().min(6),
    firstName: string().min(1),
    lastName: string().min(1),
    phoneNumber: string().optional(),
});

export const adminSignupSchema = object({
    email: string(),
    password: string(),
});
