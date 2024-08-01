import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md min-w-6 h-6 px-1.5 cursor-default text-[0.75rem] py-0.5 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-[#d3efdf] text-[#118d69] shadow',
                secondary: 'border-transparent bg-[#fff1d6] text-[#b76e00] shadow',
                destructive: 'border-transparent bg-[#f7ddd8] text-[#b71d18] shadow',
                sky: 'border-transparent bg-[#d6f4f9] text-[#006c9c] shadow',
                gray: 'border-transparent bg-[#e5e8eb] text-[#637381] shadow',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className, 'h6')} {...props} />;
}

export { Badge, badgeVariants };
