'use client';

import { useEffect, useMemo } from 'react';

import { Boardroom } from '@prisma/client';
import BoardroomItem from './boardroom-item';
import { Filters } from '@/types';
import NoResults from './no-results';
import { SkeletonCard } from './skeleton';
import { useBoardroomsQuery } from '@/hooks/boardrooms/use-boardrooms-query';

interface BoardroomsContainerProps {
    params: Filters;
}

const BoardroomsContainer = ({ params }: BoardroomsContainerProps) => {
    const { data, status } = useBoardroomsQuery({
        queryKey: 'fetch-boardrooms',
        apiUrl: '/api/boardrooms',
        filters: params,
    });

    if (status === 'loading') {
        return (
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
                {Array.from({ length: 10 }, (_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (data?.length === 0) {
        return <NoResults />;
    }

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data?.map((boardroom: any) => (
                <div key={boardroom.id}>
                    <BoardroomItem data={boardroom} />
                </div>
            ))}
        </div>
    );
};

export default BoardroomsContainer;
