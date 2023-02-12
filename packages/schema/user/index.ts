import { infer as ZodInfer, object, string, z, ZodIssueCode } from 'zod';

const sizes = ['xsm', 'sm', 'md', 'lg'] as const;

const imageFileSchema = object({
    size: z.enum(sizes),
    url: string(),
    hash: string(),
});

export const celebritySignupSchema = object({
    email: string().email().trim(),
    password: string().min(6),
    firstName: string().min(1).trim(),
    lastName: string().min(1).trim(),
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

export const updateProfilePicturerSchema = object({
    xsm: imageFileSchema,
    sm: imageFileSchema,
    md: imageFileSchema,
    lg: imageFileSchema,
});

export type CelebritySignupType = ZodInfer<typeof celebritySignupSchema>;
export type SigninType = ZodInfer<typeof signinSchema>;
export type ProfilePictureType = ZodInfer<typeof updateProfilePicturerSchema>;
