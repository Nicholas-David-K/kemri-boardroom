'use client';

import { ElementRef, Fragment, useMemo, useRef } from 'react';
import { Link2Icon, Loader } from 'lucide-react';
import { ReservationFilters, ReservationItem } from '@/types';

import NoResults from './no-results';
import { Reservation } from '@prisma/client';
import { ReservationColumn } from '@/app/(frontend)/(routes)/[boardroomId]/components/columns';
import ReservationsClient from '@/app/(frontend)/(routes)/[boardroomId]/components/client';
import { format } from 'date-fns';
import { getFormattedMeetingTime } from '@/lib/utils';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';

interface ReservationsContainerProps {
    boardroomId: string | undefined;
}

const ReservationsContainer = ({ boardroomId }: ReservationsContainerProps) => {
    const filters = useMemo(
        () => ({
            boardroomId,
        }),
        [boardroomId]
    );

    const { data, status } = useReservationsQuery({
        queryKey: 'fetch-reservations',
        apiUrl: '/api/reservations',
        filters,
    });

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center mt-10">
                <Loader className="h-4 w-4 animate-spin text-slate-500" />
                <p className="text-sm text-slate-900">Loading reservations</p>
            </div>
        );
    }

    const formattedReservations: ReservationColumn[] = (data ?? []).map((item: Reservation) => ({
        id: item.id,
        name: item.name,
        date: item.date,
        type: item.type,
        duration: item.duration,
        platform: item.platform,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    }));

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 pt-6">
                <ReservationsClient data={formattedReservations} />
            </div>
        </div>
    );
};

export default ReservationsContainer;
