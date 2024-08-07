'use client';

import { Loader } from 'lucide-react';
import { ReservationColumn } from '@/app/(frontend)/(routes)/[boardroomId]/components/columns';
import ReservationsClient from '@/app/(frontend)/(routes)/[boardroomId]/components/client';
import { format } from 'date-fns';
import { getCurrentUser } from '@/actions/get-current-user';
import { useCurrentUser } from '@/hooks/auth/use-current-user';
import { useMemo } from 'react';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';

interface ReservationsContainerProps {
    boardroomId: string | undefined;
}

const ReservationsContainer = ({ boardroomId }: ReservationsContainerProps) => {
    const currentUser = useCurrentUser();

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

    const formattedReservations: ReservationColumn[] = (data ?? []).map(
        (item: ReservationColumn) => ({
            id: item.id,
            name: item.name,
            date: item.date,
            type: item.type,
            status: item.status,
            duration: item.duration,
            platform: item.platform,
            createdAt: format(item.createdAt, 'MMMM do, yyyy'),
            boardroom: item.boardroom,
            user: item.user,
            isApprover: item.boardroom.approver === currentUser.email,
        })
    );

    console.log('[FORMATTED_RESERVATIONS]: ', formattedReservations);

    return (
        <div className="space-y-4 pt-6">
            <ReservationsClient data={formattedReservations} />
        </div>
    );
};

export default ReservationsContainer;
