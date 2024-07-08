'use client';

import {
    ArrowRight,
    Monitor,
    Pencil,
    PhoneIcon,
    SunIcon,
    Trash,
    Users,
    WifiIcon,
} from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const BoardroomItem = () => {
    const currentUser = useCurrentUser();

    return (
        <div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
                <div className="rounded-lg bg-gray-200/30 p-6 group gap-4 relative">
                    <div className="absolute shadow-lg rounded-lg -top-5 left-5 hidden 2xl:block">
                        <Image
                            src="/images/boardroom.jpg"
                            alt="boardroom-img"
                            width={180}
                            height={180}
                            objectFit="cover"
                            className="rounded-lg group-hover:scale-105 transition-all"
                        />
                    </div>

                    {/* ADMIN ACTIONS */}
                    {currentUser?.role === 'admin' && (
                        <div className="absolute shadow-lg rounded-lg top-3 right-5">
                            <div className="bg-slate-500/20 flex flex-col gap-y-3 py-2 rounded-lg px-1.5">
                                <div
                                    role="button"
                                    className="bg-white rounded-lg p-2.5 hover:bg-white/70 group/trash transition"
                                >
                                    <Trash className="h-4 w-4 group-hover/trash:text-red-500" />
                                </div>
                                <div
                                    role="button"
                                    className="bg-white rounded-lg p-2.5 hover:bg-white/70 group/edit transition"
                                >
                                    <Pencil className="h-4 w-4 group-hover/edit:text-teal-500" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col 2xl:mt-28">
                        <h4 className="font-bold text-slate-900 lg:text-lg">
                            Computer Science Annex
                        </h4>
                        <div className="flex items-center text-sm text-slate-500 m-0 p-0 mb-3">
                            <p>KEMRI Headquarters</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <ActionTooltip label="Internet Access">
                                <div className="border rounded-xl p-2">
                                    <WifiIcon className="text-gray-500 h-4 w-4" />
                                </div>
                            </ActionTooltip>
                            <ActionTooltip label="Lighting">
                                <div className="border rounded-xl p-2">
                                    <SunIcon className="text-gray-500 h-4 w-4" />
                                </div>
                            </ActionTooltip>
                            <ActionTooltip label="Screen">
                                <div className="border rounded-xl p-2">
                                    <Monitor className="text-gray-500 h-4 w-4" />
                                </div>
                            </ActionTooltip>
                            <ActionTooltip label="Phone">
                                <div className="border rounded-xl p-2">
                                    <PhoneIcon className="text-gray-500 h-4 w-4" />
                                </div>
                            </ActionTooltip>
                        </div>
                        <div className="flex items-center space-x-2 mt-5">
                            <Users className="h-4 w-4 text-gray-500" />
                            <p className="text-sm">Fits 7 people</p>
                        </div>
                        <hr className="my-2" />
                        <p className="text-sm text-slate-900 line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            natus obcaecati. Assumenda ad culpa doloremque a, iste, molestias eos
                            quidem reprehenderit voluptatem eius tempora obcaecati facilis optio
                            aut. Harum, culpa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardroomItem;
