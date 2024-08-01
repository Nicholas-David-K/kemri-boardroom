'use client';

import { Boardroom, Image as ImageType } from '@prisma/client';
import {
    CalendarClock,
    CirclePlus,
    CircleX,
    Clock,
    EllipsisVertical,
    HistoryIcon,
    Link,
    MicVocal,
    Monitor,
    User2Icon,
    Users,
    WifiIcon,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FaBlenderPhone, FaChalkboardTeacher } from 'react-icons/fa';

import { Amenities } from '@prisma/client';
import AmenityItem from './aminity-item';
import { BsPeople } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReservationFilters } from '@/types';
import ReservationsContainer from './reservations-container';
import SearchInput from './navigation/search-input';
import { cn } from '@/lib/utils';
import useReserveModal from '@/hooks/reservations/use-reserve-modal';

interface BoardroomInfoProps {
    data:
        | (Boardroom & {
              images: ImageType[];
          })
        | null;
    params: ReservationFilters;
}

const BoardroomInfo = ({ data, params }: BoardroomInfoProps) => {
    const reserveModal = useReserveModal();

    const amenitiesIcons = {
        [Amenities.Whiteboard]: FaChalkboardTeacher,
        [Amenities.Projection]: Monitor,
        [Amenities.Internet]: WifiIcon,
        [Amenities.Sound]: MicVocal,
        [Amenities.Telephone]: FaBlenderPhone,
    };

    return (
        <div className="grid grid-cols-7 gap-8">
            <div className="col-span-7 xl:col-span-5">
                <div className="bg-white-bg p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <div>
                        <div className="pb-2">
                            <p className="text-2xl font-bold">{data?.name}</p>
                            <p className="text-sm">
                                KEMRI{' '}
                                {data?.location === 'Nairobi'
                                    ? `Headquarters, ${data?.location}`
                                    : data?.location}
                            </p>
                        </div>

                        <p className="text-sm text-slate-500 mt-5">{data?.description}</p>

                        <div className="mt-10">
                            <h3 className="uppercase font-bold text-sm mb-2.5">Amenities</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mt-2">
                                <>
                                    {Object.values(Amenities)
                                        .filter((amenity) => data?.amenities.includes(amenity))
                                        .map((amenity, index) => {
                                            const IconComponent = amenitiesIcons[amenity];
                                            return (
                                                <AmenityItem
                                                    key={index}
                                                    amenity={amenity}
                                                    icon={IconComponent}
                                                />
                                            );
                                        })}
                                </>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full hidden md:block">
                        <Image
                            className="rounded-lg"
                            src={`${data?.images[0].url}`}
                            alt="boardroom-img"
                            fill
                            objectFit="cover"
                        />
                    </div>

                    <div
                        className="absolute top-10 right-10 z-10 bg-primary-500 w-40 text-white font-semibold flex items-center py-1.5 text-sm
                     justify-center rounded-lg"
                    >
                        <Users className="mr-2 h-5 w-5" />
                        Fits {data?.capacity} people
                    </div>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-[#f4f4f5] sticky">
                    <div className="flex items-center justify-between">
                        <div className="grid grid-cols-4 gap-2 w-full md:w-[500px]">
                            <button
                                onClick={() => {}}
                                className={cn(
                                    'py-3 px-2 bg-white flex flex-row items-center justify-center gap-3 rounded-lg cursor-pointer transition text-sm font-semibold'
                                )}
                            >
                                <CalendarClock
                                    className={cn('text-slate-500 h-4 w-4 hidden md:block')}
                                />
                                <div>Upcoming</div>
                            </button>
                            <button
                                onClick={() => {}}
                                className={cn(
                                    'py-3 px-2 flex bg-white flex-row items-center justify-center gap-3 rounded-lg cursor-pointer transition text-sm font-semibold'
                                )}
                            >
                                <Clock className={cn('text-slate-500 h-4 w-4 hidden md:block')} />
                                <div>Pending</div>
                            </button>
                            <button
                                onClick={() => {}}
                                className={cn(
                                    'py-3 px-2 flex flex-row items-center justify-center gap-3 rounded-lg cursor-pointer transition text-sm font-semibold'
                                )}
                            >
                                <HistoryIcon
                                    className={cn('text-slate-500 h-4 w-4 hidden md:block')}
                                />
                                <div>Past</div>
                            </button>
                            <button
                                onClick={() => {}}
                                className={cn(
                                    'py-3 px-2 flex flex-row items-center justify-center gap-3 rounded-lg cursor-pointer transition text-sm font-semibold'
                                )}
                            >
                                <CircleX className={cn('text-slate-500 h-4 w-4 hidden md:block')} />
                                <div>Cancelled</div>
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <SearchInput className="w-80 hidden lg:block" />
                            <Button
                                onClick={() => reserveModal.onOpen(data || undefined)}
                                variant="primary"
                                size="lg"
                                className="capitalize hidden md:flex items-center space-x-2"
                            >
                                Book {data?.name}{' '}
                                <CirclePlus className="h-5 w-5 ml-5 hidden md:block" />
                            </Button>
                        </div>
                    </div>
                </div>

                <ReservationsContainer boardroomId={data?.id} />
            </div>
            <div className="hidden xl:block xl:col-span-2 bg-red-500"></div>
        </div>
    );
};
export default BoardroomInfo;
