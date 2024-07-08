'use client';

import { MapPin, Users } from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoNotifications } from 'react-icons/io5';
import Logo from '@/components/navigation/logo';
import NavigationAction from '@/components/navigation/navigation-action';
import NavigationItem from '@/components/navigation/navigation-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
    const pathname = usePathname();

    const routes = [
        {
            href: '/boardrooms',
            label: 'Boardrooms',
            icon: MapPin,
            active: pathname === '/boardrooms',
        },
        {
            href: '/users',
            label: 'Manage users',
            icon: Users,
            active: pathname === '/users',
        },
    ];

    return (
        <div className="space-y-4 flex flex-col items-center h-full w-full py-3 bg-gradient-to-b from-primary-400 to-[#546FC2]">
            <Logo />
            <NavigationAction />

            <Separator className="h-[2px] bg-neutral-100 rounded-md w-10 mx-auto" />

            <ScrollArea className="flex-1 w-full">
                {routes.map((route) => (
                    <div key={route.href} className="mb-4">
                        <NavigationItem route={route} />
                    </div>
                ))}
            </ScrollArea>

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <div className="relative">
                    <IoNotifications className="h-6 w-6 text-white" />
                    <div className="absolute flex flex-col h-4 w-4 rounded-full items-center -top-1.5 left-3 justify-center p-2 bg-rose-500 text-sm text-white">
                        <span>2</span>
                    </div>
                </div>

                <ActionTooltip side="top" align="center" label="Logout">
                    <button onClick={() => signOut()} className="group flex items-center mx-6">
                        <AiOutlineLogout className="h-6 w-6 text-white" />
                    </button>
                </ActionTooltip>
            </div>
        </div>
    );
};

export default DashboardSidebar;
