'use client';

import { IoLocationSharp, IoNotifications, IoPeople } from 'react-icons/io5';

import ActionTooltip from '../action-tooltip';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import Logo from './logo';
import NavigationItem from './navigation-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SiGoogleanalytics } from 'react-icons/si';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const NavigationSidebar = () => {
    const pathname = usePathname();

    const routes = [
        {
            href: '/',
            label: 'Homepage',
            icon: GoHomeFill,
            active: pathname === '/',
        },
        {
            href: '/calendar',
            label: 'Calendar',
            icon: FaCalendarAlt,
            active: pathname === '/calendar',
        },
        {
            href: '/analytics',
            label: 'Analytics',
            icon: SiGoogleanalytics,
            active: pathname === '/analytics',
        },
        {
            href: '/meetings',
            label: 'Meetings',
            icon: IoPeople,
            active: pathname === '/meetings',
        },
        {
            href: '/locations',
            label: 'Locations',
            icon: IoLocationSharp,
            active: pathname === '/locations',
        },
    ];

    return (
        <div className="space-y-4 flex flex-col items-center h-full w-full py-3 bg-gradient-to-b from-primary-400 to-[#546FC2]">
            <Logo />
            {/* <NavigationAction /> */}
            <Separator className="h-[2px] bg-neutral-100 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {routes.map((route) => (
                    <div key={route.href} className="mb-2">
                        <NavigationItem route={route} />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <div className="relative">
                    <IoNotifications className="h-6 w-6 text-white" />
                    <div className="absolute flex flex-col h-3 w-3 rounded-full items-center top-0 left-2 justify-center px-1 bg-rose-500 text-sm text-white">
                        <span>1</span>
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

export default NavigationSidebar;
