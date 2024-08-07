import { Boardroom, MeetingType, Platform } from '@prisma/client';

export interface Filters {
    capcityId?: string;
    location?: string;
}

export interface ReservationFilters {
    boardroomId?: string;
}

export interface ReservationItem {
    id: string;
    name: string;
    duration: string;
    date: Date;
    platform: Platform;
    status: string;
    type: MeetingType;
    createdAt: string;
    meetingLink: string;
    approver: string;
    boardroom: Boardroom;
}
