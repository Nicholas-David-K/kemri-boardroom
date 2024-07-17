import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().email({
        message: 'Invalid email address',
    }),

    password: z.string().min(1, {
        message: 'Password is required',
    }),
});

export const BoardroomSchema = z.object({
    name: z.string().min(1),
    location: z.string().min(1, { message: 'Required' }),
    description: z.string().min(1, { message: 'Required' }),
    amenities: z.string().array().min(1, { message: 'Required' }),
    images: z.object({ url: z.string() }).array().min(1, {
        message: 'Upload at least one image',
    }),
    capacity: z.coerce.number().min(1),
});
