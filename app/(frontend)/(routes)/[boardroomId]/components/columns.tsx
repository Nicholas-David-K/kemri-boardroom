'use client';

import { format, isToday } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { CellAction } from './cell-action';
import { Clock10 } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Platform } from '@prisma/client';
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
};

export const columns: ColumnDef<ReservationColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Meeting name',
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    {isToday(new Date(row.getValue('date'))) && (
                        <Clock10 className="h-4 w-4 mr-1 text-primary-500" />
                    )}

                    <span className="min-w-[200px] truncate font-semibold">
                        {row.getValue('name')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Meeting date / time',
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2 min-w-[300px]">
                    <span className="font-semibold">
                        {format(row.getValue('date'), 'MMMM do, yyyy')} |
                    </span>
                    <Badge variant="gray">
                        {getFormattedMeetingTime(row.getValue('date'), row.original.duration)}
                    </Badge>
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
        header: 'Reserved Date',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
