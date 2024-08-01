import { Filters } from '@/types';
import qs from 'query-string';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ProductProps {
    queryKey: string;
    apiUrl: string;
    filters?: Filters;
}

export const useBoardroomsQuery = ({ queryKey, apiUrl, filters }: ProductProps) => {
    const fetchProducts = async () => {
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
        queryFn: fetchProducts,
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
