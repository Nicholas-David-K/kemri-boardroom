import { Amenities } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { Wifi } from 'lucide-react';
import { BiLogoZoom } from 'react-icons/bi';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { FaLink, FaUnlink } from 'react-icons/fa';
import { FaPeopleRoof } from 'react-icons/fa6';
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

export const meetingTypes = [
    {
        label: 'Hybrid',
        icon: Wifi,
    },
    {
        label: 'Physical',
        icon: FaPeopleRoof,
    },
];

export const platformTypes = [
    {
        label: 'Zoom',
        icon: BiLogoZoom,
    },
    {
        label: 'Teams',
        icon: BsMicrosoftTeams,
    },
];

export const meetingLinks = [
    {
        label: 'Yes',
        icon: FaLink,
    },
    {
        label: 'No',
        icon: FaUnlink,
    },
];

export const durations = [
    {
        label: '30 minutes',
        minutes: 30,
    },
    {
        label: '1 hour',
        minutes: 60,
    },
    {
        label: '1.5 hours',
        minutes: 90,
    },
    {
        label: '2 hours',
        minutes: 120,
    },
    {
        label: '2.5 hours',
        minutes: 150,
    },
    {
        label: '3 hours',
        minutes: 180,
    },
    {
        label: 'Whole day',
        minutes: 1440,
    },
];
