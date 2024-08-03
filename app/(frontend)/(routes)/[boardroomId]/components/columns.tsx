'use client';

import { Platform, User } from '@prisma/client';
import { format, isToday } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { BellRing } from 'lucide-react';
import { CellAction } from './cell-action';
import { ColumnDef } from '@tanstack/react-table';
import { FaUserAlt } from 'react-icons/fa';
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
    user: User;
    boardroom: ReservationItem;
};

export const columns: ColumnDef<ReservationColumn>[] = [
    {
        accessorKey: 'user',
        cell: ({ row }) => {
            return (
                <div className="flex  items-center space-x-2 min-w-[270px]">
                    <div className="h-10 w-10 flex flex-col items-center justify-center bg-white-bg rounded-full">
                        <FaUserAlt className="h-4 w-4 text-icon" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-medium">{row.original.user.name}</p>
                        <p>{row.original.user.email}</p>
                    </div>
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
                    <span className="font-semibold">{row.getValue('name')}</span>
                    {isToday(new Date(row.getValue('date'))) && (
                        <BellRing className="h-4 w-4 text-primary-500" />
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Meeting time / date',
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-2 min-w-[270px]">
                    <Badge variant="gray">
                        {getFormattedMeetingTime(row.getValue('date'), row.original.duration)}
                    </Badge>
                    <span className="font-semibold">
                        {format(row.getValue('date'), 'MMMM do, yyyy')}
                    </span>
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
                            ? 'warning'
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
