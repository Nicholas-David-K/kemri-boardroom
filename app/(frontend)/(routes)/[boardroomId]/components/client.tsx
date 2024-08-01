'use client';

'use client';

import { ReservationColumn, columns } from './columns';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/heading';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CapacityClientProps {
    data: ReservationColumn[];
}

const ReservationsClient = ({ data }: CapacityClientProps) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Reservations (${data.length})`} subtitle="Manage reservations" />
                <Button variant="primary" onClick={() => router.push('')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    );
};

export default ReservationsClient;
