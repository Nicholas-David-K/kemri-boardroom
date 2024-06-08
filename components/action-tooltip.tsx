'use client';

import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

import React from 'react';
import { Tooltip } from '@/components/ui/tooltip';

interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

const ActionTooltip = ({ label, children, side, align }: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className="bg-dark-500 rounded-sm text-white px-2 py-1.5 
					"
                >
                    <p className="font-semibold text-sm capitalize">{label.toLocaleLowerCase()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionTooltip;
