'use client';

import { Amenities, Boardroom, Image as ImageType } from '@prisma/client';
import { FaBlenderPhone, FaChalkboardTeacher } from 'react-icons/fa';
import { LucideIcon, MicVocal, Monitor, Pencil, Trash, Users, WifiIcon } from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';
import { IconType } from 'react-icons/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

interface BoardroomItemProps {
    data: Boardroom & {
        images: ImageType[];
    };
}

const BoardroomItem = ({ data }: BoardroomItemProps) => {
    const currentUser = useCurrentUser();

    const amenitiesIcons = {
        [Amenities.Whiteboard]: FaChalkboardTeacher,
        [Amenities.Projection]: Monitor,
        [Amenities.Internet]: WifiIcon,
        [Amenities.Sound]: MicVocal,
        [Amenities.Telephone]: FaBlenderPhone,
    };

    const Amenity = ({ amenity, Icon }: { amenity: string; Icon: IconType | LucideIcon }) => (
        <ActionTooltip label={amenity}>
            <div className="border rounded-xl p-2">
                <Icon className="text-gray-500 h-4 w-4" />
            </div>
        </ActionTooltip>
    );

    return (
        <Link href={`/${data.id}`}>
            <div className="rounded-lg bg-white-bg p-6 group gap-4 relative h-full hover:border-b-2 transition border-primary-500">
                <div className="absolute shadow-lg rounded-lg -top-5 left-5 hidden 2xl:block">
                    <Image
                        src={data?.images[0].url}
                        alt="boardroom-img"
                        width={52}
                        height={32}
                        priority
                        objectFit="cover"
                        className="rounded-lg object-cover h-32 w-52"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* ADMIN ACTIONS */}
                {currentUser?.role === 'admin' && (
                    <div className="absolute shadow-lg rounded-lg top-3 right-5 z-10">
                        <div className="bg-slate-500/20 flex flex-col gap-y-3 py-2 rounded-lg px-1.5">
                            <div
                                role="button"
                                className="bg-white rounded-lg p-2.5 hover:bg-white/70 group/trash transition"
                            >
                                <Trash className="h-4 w-4 group-hover/trash:text-red-500 group-hover/trash:scale-110 transition" />
                            </div>
                            <Link
                                href={`/manage/${data?.id}/edit`}
                                role="button"
                                className="bg-white rounded-lg p-2.5 hover:bg-white/70 group/edit transition"
                            >
                                <Pencil className="h-4 w-4 group-hover/edit:text-teal-500 group-hover/edit:scale-110 transition" />
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex flex-col 2xl:mt-24">
                    <h4 className="font-bold text-slate-900 lg:text-lg">{data?.name}</h4>
                    <div className="flex items-center text-sm text-slate-500 m-0 p-0 mb-3">
                        <p>
                            KEMRI{' '}
                            {data?.location === 'Nairobi'
                                ? `Headquarters, ${data?.location}`
                                : data?.location}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <>
                            {Object.values(Amenities)
                                .filter((amenity) => data.amenities.includes(amenity))
                                .map((amenity, index) => {
                                    const IconComponent = amenitiesIcons[amenity];
                                    return (
                                        <Amenity
                                            key={index}
                                            amenity={amenity}
                                            Icon={IconComponent}
                                        />
                                    );
                                })}
                        </>
                    </div>
                    <div className="flex items-center space-x-2 mt-5">
                        <Users className="h-4 w-4 text-gray-500" />
                        <p className="text-sm">Fits {data?.capacity} people</p>
                    </div>
                    <hr className="my-2" />
                    <p className="text-sm text-slate-900 line-clamp-2">{data?.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default BoardroomItem;
