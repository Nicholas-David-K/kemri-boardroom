import { ReservationFilters } from '@/types';
import qs from 'query-string';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ProductProps {
    queryKey: string;
    apiUrl?: string;
    filters?: ReservationFilters;
}

export const useReservationsQuery = ({
    queryKey,
    apiUrl = '/api/reservations',
    filters,
}: ProductProps) => {
    const fetchReservations = async () => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    ...filters,
                },
            },
            { skipNull: true }
        );

        const res = await fetch(url);
        return res.json();
    };

    const { data, status, refetch } = useQuery({
        queryKey: [queryKey],
        queryFn: fetchReservations,
    });

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    return {
        data,
        status,
        refetch,
    };
};
