'use client';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { startTransition, useState } from 'react';

import { Button } from '@/components/ui/button';
import { FaLock } from 'react-icons/fa';
import FormError from '@/components/form-error';
import FormIcon from '@/components/ui/form-icon';
import FormSuccess from '@/components/form-success';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { LoginSchema } from '@/schemas';
import { MdEmail } from 'react-icons/md';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            setIsLoading(true);
            const validatedFields = LoginSchema.safeParse(values);

            if (!validatedFields.success) {
                setError('Invalid fields');
                return;
            }

            const { username, password } = validatedFields.data;

            signIn('credentials', {
                username,
                password,
                redirect: false,
            })
                .then((callback) => {
                    if (callback) {
                        switch (callback.error) {
                            case 'CredentialsSignin':
                                console.log(callback);
                                return setError('Invalid credentials');
                            default:
                                if (callback.ok) {
                                    return setSuccess('Confirmation email sent');
                                } else {
                                    const error = callback.error
                                        ? callback.error
                                        : 'Something went wrong';
                                    return setError(error);
                                }
                        }
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    };

    return (
        <>
            <div className="split-bg h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
                <div className="lg:p-8 bg-white drop-shadow p-10 rounded-sm">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                        <div className="flex flex-col justify-center items-center space-y-2 text-center">
                            <div className="mb-5">
                                <Image
                                    alt="logo"
                                    src="/images/kemri.svg"
                                    width={180}
                                    height={0}
                                    objectFit="contain"
                                />
                            </div>
                            <p className="text-2xl font-semibold tracking-tight">
                                In Search of Better Health
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Sign in to start your session
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="">
                                            <FormError message={error} />
                                            <FormSuccess message={success} />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <FormIcon
                                                            icon={MdEmail}
                                                            className="h-5 w-5"
                                                        >
                                                            <div className="relative">
                                                                <Input
                                                                    {...field}
                                                                    {...form.register('username', {
                                                                        required:
                                                                            'This is required.',
                                                                        pattern: {
                                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                            message:
                                                                                'Invalid username',
                                                                        },
                                                                    })}
                                                                    className="pl-10 focus-visible:ring-primary-500 py-5"
                                                                />
                                                                <div className="absolute flex items-center pr-3 right-0 inset-y-0">
                                                                    <div className="bg-white rounded-sm text-sm shadow py-1 px-2 font-semibold text-dark-500/90">
                                                                        @kemri.go.ke
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </FormIcon>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <FormIcon icon={FaLock} className="h-4 w-4">
                                                            <Input
                                                                {...field}
                                                                type="password"
                                                                {...form.register('password', {
                                                                    required: 'This is required',
                                                                })}
                                                                className="pl-10 focus-visible:ring-primary-500 py-5"
                                                            />
                                                        </FormIcon>
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </form>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full rounded-sm"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
                                    Continue
                                </Button>
                                <span className="text-xs text-neutral-900 text-center">
                                    Copyright &copy; KEMRI {new Date().getFullYear()}. All rights
                                    reserved. Powered by KEMRI ICT
                                </span>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
