'use client';

import { Button } from '@/components/ui/button';
import { ReservationColumn } from './columns';
import useManageReservation from '@/hooks/reservations/use-manage-reservation';

interface ManageActionProps {
    data: ReservationColumn;
}

const ManageAction = ({ data }: ManageActionProps) => {
    const manageReservation = useManageReservation();

    return (
        <div>
            <Button onClick={() => manageReservation.onOpen(data)} variant="primary" size="sm">
                Manage
            </Button>
        </div>
    );
};

export default ManageAction;
