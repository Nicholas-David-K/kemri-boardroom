'use client';

import { IconType } from 'react-icons/lib';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
    route: {
        href: string;
        label: string;
        icon: IconType | LucideIcon;
        active: boolean;
    };
}

const NavigationItem = ({ route }: NavigationItemProps) => {
    return (
        <Link href={route.href} className="group flex flex-col justify-center items-center w-full">
            <div
                className={cn(
                    'flex flex-col h-[80px] w-[90px] rounded-[10px] transition-all overflow-hidden items-center justify-center group-hover:bg-white text-white group-hover:text-primary-400 font-medium',
                    route.active && 'bg-white text-primary-400 font-semibold'
                )}
            >
                <route.icon className="h-6 w-6 mb-1.5 group-hover:scale-110 transition-all" />
                <p className="text-sm text-center">{route.label}</p>
            </div>
        </Link>
    );
};

export default NavigationItem;
