'use client';

import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
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
import { LoginSchema } from '@/schemas';
import { MdEmail } from 'react-icons/md';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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
                                    return setSuccess('Success');
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
                    setTimeout(() => {
                        router.refresh();
                    }, 500);
                });
        });
    };

    return (
        // <div className="flex flex-col justify-center items-center h-screen px-72">
        //     <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        //         <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r rounded-2xl">
        //             <div className="absolute inset-0 rounded-2xl">
        //                 <Image
        //                     alt="logo"
        //                     src="/images/boardroom.jpg"
        //                     fill
        //                     objectFit="cover"
        //                     className="rounded-2xl"
        //                 />
        //             </div>

        //             <div className="absolute z-1 bottom-0 left-0 w-full h-full bg-gradient-blue rounded-2xl" />

        //             <div className="relative z-20 mt-auto flex items-center space-x-3">
        //                 <Image
        //                     alt="logo"
        //                     src="/images/kemri.svg"
        //                     width={100}
        //                     height={0}
        //                     objectFit="contain"
        //                 />

        //                 <blockquote className="space-y-2">
        //                     <p className="underline underline-offset-4">
        //                         KENYA MEDICAL RESEARCH INSTITUTE
        //                     </p>
        //                     <footer className="text-sm">In Search of Better Health</footer>
        //                 </blockquote>
        //             </div>

        //             <div className="absolute top-10 space-x-3 bg-primary-500 text-white px-2 py-1.5 border-b borderpi font-semibold rounded-sm text-sm">
        //                 Boardroom Reservation
        //             </div>
        //         </div>

        //         <div className="lg:p-8">
        //             {/* form */}
        //             <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        //                 <div className="flex flex-col justify-center items-center space-y-2 text-center">
        //                     <p className="text-dark-500 text-2xl font-semibold">Sign In</p>
        //                     <p className="text-sm">Welcome back! Enter your details to continue</p>
        //                 </div>
        //                 <div className="grid gap-6">
        //                     <Form {...form}>
        //                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        //                             <div className="flex flex-col gap-4">
        //                                 <div className="">
        //                                     <FormError message={error} />
        //                                     <FormSuccess message={success} />
        //                                 </div>
        //                                 <FormField
        //                                     control={form.control}
        //                                     name="username"
        //                                     render={({ field }) => (
        //                                         <FormItem>
        //                                             <FormLabel>Username</FormLabel>
        //                                             <FormControl>
        //                                                 <FormIcon
        //                                                     icon={MdEmail}
        //                                                     className="h-5 w-5"
        //                                                 >
        //                                                     <div className="relative">
        //                                                         <Input
        //                                                             {...field}
        //                                                             {...form.register('username', {
        //                                                                 required:
        //                                                                     'This is required.',
        //                                                                 pattern: {
        //                                                                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        //                                                                     message:
        //                                                                         'Invalid username',
        //                                                                 },
        //                                                             })}
        //                                                             className="pl-10 focus-visible:ring-primary-500 py-5"
        //                                                         />
        //                                                         {/* <div className="absolute flex items-center pr-3 right-0 inset-y-0">
        //                                                             <div className="bg-white rounded-sm text-sm shadow py-1 px-2 font-semibold text-dark-500/90">
        //                                                                 @kemri.go.ke
        //                                                             </div>
        //                                                         </div> */}
        //                                                     </div>
        //                                                 </FormIcon>
        //                                             </FormControl>
        //                                             <FormMessage />
        //                                         </FormItem>
        //                                     )}
        //                                 />
        //                                 <FormField
        //                                     control={form.control}
        //                                     name="password"
        //                                     render={({ field }) => (
        //                                         <FormItem>
        //                                             <FormLabel>Password</FormLabel>
        //                                             <FormControl>
        //                                                 <FormIcon icon={FaLock} className="h-4 w-4">
        //                                                     <Input
        //                                                         {...field}
        //                                                         type="password"
        //                                                         {...form.register('password', {
        //                                                             required: 'This is required',
        //                                                         })}
        //                                                         className="pl-10 focus-visible:ring-primary-500 py-5"
        //                                                     />
        //                                                 </FormIcon>
        //                                             </FormControl>

        //                                             <FormMessage />
        //                                         </FormItem>
        //                                     )}
        //                                 />
        //                             </div>
        //                         </form>
        //                         <Button
        //                             type="submit"
        //                             disabled={isLoading}
        //                             className="w-full rounded-sm"
        //                             onClick={form.handleSubmit(onSubmit)}
        //                         >
        //                             {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
        //                             Continue
        //                         </Button>
        //                         <span className="text-xs text-neutral-900 text-center">
        //                             Copyright &copy; KEMRI {new Date().getFullYear()}. All rights
        //                             reserved. Powered by KEMRI ICT
        //                         </span>
        //                     </Form>
        //                 </div>
        //             </div>
        //             {/* form */}
        //         </div>
        //     </div>
        // </div>
        <>
            <div className="split-bg h-screen flex-col items-center justify-center grid lg:max-w-none lg:px-0">
                <div className="lg:p-8">
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
                            <p className="text-2xl font-semibold tracking-tight text-primary-400 italic drop-shadow-lg">
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
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <FormIcon
                                                            icon={MdEmail}
                                                            className="h-5 w-5"
                                                        >
                                                            <Input
                                                                {...field}
                                                                {...form.register('username', {
                                                                    required: 'This is required.',
                                                                    pattern: {
                                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                        message: 'Invalid username',
                                                                    },
                                                                })}
                                                                placeholder="email@kemri.go.ke"
                                                                className="pl-10 focus-visible:ring-primary-500 py-6 text-sm bg-white"
                                                            />
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
                                                            <>
                                                                <Input
                                                                    {...field}
                                                                    type={
                                                                        showPassword
                                                                            ? 'text'
                                                                            : 'password'
                                                                    }
                                                                    {...form.register('password', {
                                                                        required:
                                                                            'This is required',
                                                                    })}
                                                                    className="pl-10 focus-visible:ring-primary-500 py-6 text-sm bg-white"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            (prev) => !prev
                                                                        )
                                                                    }
                                                                >
                                                                    {showPassword ? (
                                                                        <EyeIcon
                                                                            className="h-4 w-4"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <EyeOffIcon
                                                                            className="h-4 w-4"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    <span className="sr-only">
                                                                        {showPassword
                                                                            ? 'Hide password'
                                                                            : 'Show password'}
                                                                    </span>
                                                                </Button>
                                                            </>
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
                                    className="rounded-sm"
                                    onClick={form.handleSubmit(onSubmit)}
                                >
                                    {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
                                    Login
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
