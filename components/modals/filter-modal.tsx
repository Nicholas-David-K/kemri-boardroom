'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Filter, MapPin, SlidersHorizontal, Trash, UsersRound } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Locations } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import qs from 'query-string';

export function FilterModal() {
    const searchParams = useSearchParams();
    const router = useRouter();

    console.log(searchParams?.size);

    const capacitySelected = searchParams?.get('capacityId');
    const locationSelected = searchParams?.get('location');

    const capacities = [
        {
            id: '1',
            label: 'Small to medium',
            value: '10 — 25',
        },
        {
            id: '2',
            label: 'Medium to large',
            value: '26 — 49',
        },
        {
            id: '3',
            label: '50 and above',
            value: '50+',
        },
    ];

    const onClick = async (id: string, valueKey: string) => {
        const current = qs.parse(searchParams?.toString() || '');

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );

        router.push(url);
    };

    const onClearFilters = () => {
        const parsedUrl = qs.parseUrl(window.location.href);
        router.push(parsedUrl.url);
    };

    return (
        <Dialog>
            <div className="flex items-center space-x-2">
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
                    </Button>
                </DialogTrigger>
                {searchParams?.size !== 0 && (
                    <Button onClick={onClearFilters} className="text-sm" variant="destructive">
                        Clear filters <Trash className="text-white h-4 w-4 ml-2" />
                    </Button>
                )}
            </div>
            <DialogContent className="xs:w-[400px] md:w-full rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Filter</DialogTitle>
                    <DialogDescription>
                        Find your next work space / boardroom / conference hall
                    </DialogDescription>
                </DialogHeader>

                <Separator />
                <small className="text-slate-500 font-semibold">Capacity</small>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
                    {capacities.map((capacity, index) => (
                        <button
                            key={capacity.id + index}
                            onClick={() => onClick(capacity.id, 'capacityId')}
                            className={cn(
                                'py-1.5 px-2 border-[1px] border-neutral-200 flex flex-row items-center justify-center gap-3 rounded-lg cursor-pointer hover:border hover:border-slate-500 transition text-sm font-semibold',
                                capacitySelected === capacity.id && 'bg-dark-500 text-white'
                            )}
                        >
                            <UsersRound
                                className={cn(
                                    'text-slate-500 h-4 w-4',
                                    capacitySelected === capacity.id && 'text-white'
                                )}
                            />
                            <div>{capacity.value}</div>
                        </button>
                    ))}
                </div>
                <Separator />
                <small className="text-slate-500 font-semibold">Location</small>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
                    {Object.keys(Locations).map((location, index) => (
                        <button
                            key={index}
                            onClick={() => onClick(location, 'location')}
                            className={cn(
                                'py-1.5 px-2 border-[1px] border-neutral-200 flex flex-row items-center justify-center gap-3 rounded-lg cursor-pointer hover:border hover:border-slate-500 transition text-sm font-semibold',
                                locationSelected === location && 'bg-dark-500 text-white'
                            )}
                        >
                            <MapPin
                                className={cn(
                                    'text-slate-500 h-4 w-4',
                                    locationSelected === location && 'text-white'
                                )}
                            />
                            <div>{location}</div>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
