import { Amenities } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { addMinutes, format, parseISO } from 'date-fns';
import { CheckCheck, CircleX, Clock, Wifi } from 'lucide-react';
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

export function getFormattedMeetingTime(meetingDateUTC: string, durationMinutes: number) {
    const meetingDateLocal = new Date(meetingDateUTC);

    const endDate = addMinutes(meetingDateLocal, durationMinutes);

    const formattedStartTime = format(meetingDateLocal, 'h:mm a');
    const formattedEndTime = format(endDate, 'h:mm a');

    return `${formattedStartTime} - ${formattedEndTime}`;
}

export const meetingTypes = [
    {
        label: 'Hybrid',
        value: 'Hybrid',
        icon: Wifi,
    },
    {
        label: 'Physical',
        value: 'Physical',
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

export const reservationStatuses = [
    {
        value: 'Pending',
        label: 'Pending',
        icon: Clock,
    },
    {
        value: 'Cancelled',
        label: 'Cancelled',
        icon: CircleX,
    },
    {
        value: 'Approved',
        label: 'Approved',
        icon: CheckCheck,
    },
];
