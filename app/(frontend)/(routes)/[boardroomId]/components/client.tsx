'use client';

import { ReservationColumn, columns } from './columns';

import { DataTable } from '@/app/(frontend)/(routes)/[boardroomId]/components/data-table';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';

interface ReservationClientProps {
    data: ReservationColumn[];
}

const ReservationsClient = ({ data }: ReservationClientProps) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Total Reservations (${data.length})`}
                    subtitle="Bookings for this boardroom"
                />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};

export default ReservationsClient;
