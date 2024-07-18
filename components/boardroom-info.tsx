'use client';

import { Boardroom, Image as ImageType } from '@prisma/client';

import Image from 'next/image';

interface BoardroomInfoProps {
    data: Boardroom & {
        images: ImageType[];
    };
}

const BoardroomInfo = ({ data }: BoardroomInfoProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="">
                <Image
                    src={`${data?.images[0]}`}
                    alt="boardroom-img"
                    height={100}
                    width={100}
                    objectFit="cover"
                />
            </div>
        </div>
    );
};
export default BoardroomInfo;
