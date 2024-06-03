import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().regex(/[^@]+$/, {
        message: "Username should not contain '@'",
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
});
