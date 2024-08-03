import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md min-w-6 h-6 px-1.5 cursor-default text-[0.75rem] py-0.5 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-[#ccfbf1] text-[#1c786f] border-2 border-[#1c786f]/10',
                warning:
                    'border-transparent bg-[#fef8c3] text-[#a76d26] border-2 border-[#a76d26]/10',
                destructive:
                    'border-transparent bg-[#fde6eb] text-[#b72963] border-2 border-[#b72963]/10',
                gray: 'border-transparent bg-[#f1f7f9] text-[#35505a] border-2 border-[#35505a]/10',
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
