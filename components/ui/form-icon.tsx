import { IconType } from 'react-icons/lib';
import React from 'react';
import { cn } from '@/lib/utils';

interface FormIconProps {
    children: React.ReactNode;
    icon: IconType;
    className?: string;
}

const FormIcon = ({ children, className, icon: Icon }: FormIconProps) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className={cn('text-dark-500/80', className)} />
            </div>
            {children}
        </div>
    );
};

export default FormIcon;
