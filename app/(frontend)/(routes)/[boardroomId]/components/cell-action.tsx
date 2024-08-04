'use client';

import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { ReservationColumn } from './columns';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';

interface CellActionProps {
    data: ReservationColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const [onDelete, setOnDelete] = useState(false);
    const [onApprove, setOnApprove] = useState(false);
    const [loading, setLoading] = useState(false);

    const { refetch } = useReservationsQuery({ queryKey: 'fetch-reservations' });

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Reservation id copied to the clipboard');
    };

    useEffect(() => {
        if (onDelete || onApprove) {
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = '';
            }, 0);

            return () => clearTimeout(timer);
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }, [onDelete, onApprove]);

    const onDeleteReservation = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/reservations/${data.id}`);
            toast.success('Reservation deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong! Please try again');
        } finally {
            setLoading(false);
            setOnDelete(false);
            refetch();
            router.refresh();
        }
    };

    const onApproveReservation = async () => {
        try {
            setLoading(true);
            // await axios.delete(`/api/reservations/${data.id}`);
            toast.success('Reservation approved.');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong! Please try again');
        } finally {
            setLoading(false);
            setOnApprove(false);
            refetch();
            router.refresh();
        }
    };

    return (
        <>
            <AlertModal
                isOpen={onDelete}
                onClose={() => setOnDelete(false)}
                onConfirm={onDeleteReservation}
                loading={loading}
                isDelete={true}
                title="Delete reservation! Are you sure?"
                subtitle="This action cannot be undone"
                body="You are about to delete a reservation. This action is irreversible and will permanently remove the reservation from the system. Do you want to proceed?"
            />

            <AlertModal
                isOpen={onApprove}
                onClose={() => setOnApprove(false)}
                onConfirm={onApproveReservation}
                loading={loading}
                title="Approve reservation?"
                subtitle="This action cannot be undone"
                body="You are about to approve this reservation. The owner of the reservation will be notified of your approval. Do you want to proceed?"
                isDelete={false}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                    </DropdownMenuItem>

                    <Separator />
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(`/manage/${params?.storeId}/capacities/${data.id}`)
                        }
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Cancel reservation
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOnApprove(true)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Approve reservation
                    </DropdownMenuItem>
                    <Separator />

                    <DropdownMenuItem onClick={() => setOnDelete(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
