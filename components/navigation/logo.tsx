import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    return (
        <Link href="/" className={cn('relative', className)}>
            <Image
                priority
                src="/images/kemri.svg"
                height="80"
                width="80"
                className="object-contain"
                alt=""
            />
        </Link>
    );
};

export default Logo;
