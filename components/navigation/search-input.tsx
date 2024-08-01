'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import qs from 'query-string';
import { useState } from 'react';

interface SearchInputProps {
    className?: string;
}
const SearchInput = ({ className }: SearchInputProps) => {
    const params = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');

    const router = useRouter();

    const handleChange = (e: string) => {
        let value = e.valueOf();
        let currentQuery = {};

        setSearchValue(value);

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            search: value,
        };

        // Delete active state when clicked again
        if (params?.get('search') === value) {
            delete updatedQuery.search;
        }

        if (value === '') {
            delete updatedQuery.search;
        }

        const url = qs.stringifyUrl(
            {
                url: '',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setTimeout(() => {
            router.push(url);
        }, 500);
    };

    return (
        <div className={cn('w-full', className)}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-4 h-4 dark:text-slate-400" />
                </div>
                <Input
                    id="default-search"
                    className="h-12 w-full p-4 pl-10 text-sm text-slate-900 dark:text-white rounded-sm bg-slate-500/5 focus:first-of-type:bg-slate-500/5 focus:first-of-type:border-slate-400/10 border-slate-400/10 hover:bg-slate-400/15 focus-visible:ring-transparent outline-none"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {searchValue && (
                    <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={() => {}}
                    >
                        <XIcon className="w-5 h-5 dark:text-slate-400" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
