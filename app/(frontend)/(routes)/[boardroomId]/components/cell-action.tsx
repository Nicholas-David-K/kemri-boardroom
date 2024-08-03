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
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';

interface CellActionProps {
    data: ReservationColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { refetch } = useReservationsQuery({ queryKey: 'fetch-reservations' });

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Reservation id copied to the clipboard');
    };

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                document.body.style.pointerEvents = '';
            }, 0);

            return () => clearTimeout(timer);
        } else {
            document.body.style.pointerEvents = 'auto';
        }
    }, [open]);

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/reservations/${data.id}`);
            toast.success('Reservation deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong! Please try again');
        } finally {
            setLoading(false);
            setOpen(false);
            refetch();
            router.refresh();
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
                body="You are about to delete a reservation. This action is irreversible and will permanently remove the reservation from the system. Please confirm that you want to proceed."
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
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(`/manage/${params?.storeId}/capacities/${data.id}`)
                        }
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(!open)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
