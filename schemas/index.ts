import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().email({
        message: 'Invalid email address',
    }),

    password: z.string().min(1, {
        message: 'Password is required',
    }),
});
