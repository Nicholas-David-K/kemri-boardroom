'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import Logo from '@/components/navigation/logo';
import { MenuIcon } from 'lucide-react';
import React from 'react';
import WidthWrapper from '@/components/width-wrapper';
import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const Navbar = () => {
    const currentUser = useCurrentUser();

    return (
        <>
            <div className="py-3 border-b border-b-dark-500 border-opacity-10">
                <WidthWrapper>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <div className="flex items-center space-x-2">
                            <Logo />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-7 h-7">
                                <AvatarImage
                                    src="/images/user_placeholder.webp"
                                    alt="default-image"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h5 className="text-sm">{currentUser?.name}</h5>
                            <Button onClick={() => signOut()}>Sign out</Button>
                        </div>
                    </div>
                </WidthWrapper>
            </div>
        </>
    );
};

export default Navbar;
