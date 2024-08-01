'use client';

import { BellRing, Clock10 } from 'lucide-react';
import { format, isToday } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { CellAction } from './cell-action';
import { ColumnDef } from '@tanstack/react-table';
import { Platform } from '@prisma/client';
import { ReservationItem } from '@/types';
import { getFormattedMeetingTime } from '@/lib/utils';

export type ReservationColumn = {
    id: string;
    name: string;
    date: string;
    status: string;
    duration: number;
    type: string;
    platform: Platform;
    createdAt: string;
    boardroom: ReservationItem;
};

export const columns: ColumnDef<ReservationColumn>[] = [
    {
        accessorKey: 'date',
        header: 'Meeting date / time',
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2 min-w-[270px]">
                    <span className="font-semibold">
                        {format(row.getValue('date'), 'MMMM do, yyyy')}
                    </span>
                    <Badge variant="gray">
                        {getFormattedMeetingTime(row.getValue('date'), row.original.duration)}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Meeting name',
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2 min-w-[250px]">
                    {isToday(new Date(row.getValue('date'))) && (
                        <BellRing className="h-4 w-4 mr-1 text-primary-500" />
                    )}

                    <span className="font-semibold">{row.getValue('name')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'platform',
        header: 'Platform',
    },
    {
        accessorKey: 'createdAt',
        header: 'Reserved date',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            return (
                <Badge
                    variant={
                        row.original.status === 'Pending'
                            ? 'secondary'
                            : row.original.status === 'Cancelled'
                            ? 'destructive'
                            : 'default'
                    }
                >
                    {row.original.status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
