import { Amenities } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getGreeting() {
    const now = new Date();
    const uctHour = now.getUTCHours();
    const eatHour = (uctHour + 3) % 24;

    if (eatHour < 12) {
        return 'Good morning';
    } else if (eatHour < 18) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}
