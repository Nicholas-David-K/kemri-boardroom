"use client";

import { Boardroom, Image as ImageType } from "@prisma/client";

import Image from "next/image";
import { Amenities } from "@prisma/client";
import { FaBlenderPhone, FaChalkboardTeacher } from "react-icons/fa";
import {
  EllipsisVertical,
  LucideIcon,
  MicVocal,
  Monitor,
  Pencil,
  Plus,
  SquarePen,
  WifiIcon,
} from "lucide-react";
import { IconType } from "react-icons/lib";
import { Button } from "./ui/button";
import useBookModal from "@/hooks/use-book-modal";

interface BoardroomInfoProps {
  data: Boardroom & {
    images: ImageType[];
  };
}

const BoardroomInfo = ({ data }: BoardroomInfoProps) => {
  const bookModal = useBookModal();

  const amenitiesIcons = {
    [Amenities.Whiteboard]: FaChalkboardTeacher,
    [Amenities.Projection]: Monitor,
    [Amenities.Internet]: WifiIcon,
    [Amenities.Sound]: MicVocal,
    [Amenities.Telephone]: FaBlenderPhone,
  };

  const Amenity = ({
    amenity,
    Icon,
  }: {
    amenity: string;
    Icon: IconType | LucideIcon;
  }) => (
    <div className="border rounded-xl p-5">
      <div className="border w-10 h-10 flex flex-col items-center justify-center rounded-xl p-2">
        <Icon className="text-gray-500 h-4 w-4" />
      </div>

      <p className="text-sm text-slate-500 mt-5">{amenity}</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-end mb-5 group">
        <Button onClick={bookModal.onOpen} variant="primary">
          Book Boardroom
          <Plus className="h-5 w-5 text-white group-hover:scale-125 transition ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.images.map((image) => (
          <div key={image.id} className="relative rounded-lg h-56 w-full">
            <Image
              className="rounded-lg"
              src={`${image.url}`}
              alt="boardroom-img"
              fill
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="flex flex-col space-y-10">
          <div>
            <h3 className="uppercase font-bold text-sm mb-2.5">Description</h3>
            <p className="text-sm text-slate-500">{data.description}</p>
          </div>

          <div>
            <h3 className="uppercase font-bold text-sm mb-2.5">Amenities</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
              <>
                {Object.values(Amenities)
                  .filter((amenity) => data.amenities.includes(amenity))
                  .map((amenity, index) => {
                    const IconComponent = amenitiesIcons[amenity];
                    return (
                      <>
                        <Amenity
                          key={index}
                          amenity={amenity}
                          Icon={IconComponent}
                        />
                      </>
                    );
                  })}
              </>
            </div>
          </div>
        </div>

        <div>
          <h3 className="uppercase font-bold text-sm mb-2.5">My Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border rounded-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Design Sprint Meeting</h3>
                  <p className="text-sm text-slate-500">
                    July 18, 2024 | 10:00 AM - 2:30 PM
                  </p>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <SquarePen className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EllipsisVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis quo,
              </div>
            </div>

            <div className="border rounded-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Design Sprint Meeting</h3>
                  <p className="text-sm text-slate-500">
                    July 18, 2024 | 10:00 AM - 2:30 PM
                  </p>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <SquarePen className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EllipsisVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis quo,
              </div>
            </div>
          </div>

          <h3 className="uppercase font-bold text-sm mb-2.5 mt-10">
            Upcoming Bookings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border rounded-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Design Sprint Meeting</h3>
                  <p className="text-sm text-slate-500">
                    July 18, 2024 | 10:00 AM - 2:30 PM
                  </p>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <SquarePen className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EllipsisVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis quo,
              </div>
            </div>

            <div className="border rounded-sm p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Design Sprint Meeting</h3>
                  <p className="text-sm text-slate-500">
                    July 18, 2024 | 10:00 AM - 2:30 PM
                  </p>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm">
                    <SquarePen className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <EllipsisVertical className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              <div className="text-sm mt-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Corporis quo,
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardroomInfo;
