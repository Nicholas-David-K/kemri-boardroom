'use client';

import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ReservationColumn } from './columns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

// import { AlertModal } from '@/components/modals/alert-modal';

interface CellActionProps {
    data: ReservationColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Capacity id copied to the clipboard');
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params?.storeId}/capacities/${data.id}`);
            router.refresh();
            toast.success('Capacity deleted.');
        } catch (error) {
            toast.error('Make sure you have removed all products using this capacity first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            {/* <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
                body="You are about to delete a capacity. This will permanently delete your data from our servers."
            /> */}
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
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
