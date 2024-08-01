import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface AmenityItemProps {
    amenity: string;
    icon: IconType | LucideIcon;
}

const AmenityItem = ({ amenity, icon: Icon }: AmenityItemProps) => {
    return (
        <div className="border rounded-xl p-3 flex flex-col items-center justify-center">
            <div className="border w-10 h-10 flex flex-col items-center justify-center rounded-xl p-2">
                <Icon className="text-icon h-4 w-4" />
            </div>

            <p className="text-sm text-slate-500 mt-3">{amenity}</p>
        </div>
    );
};

export default AmenityItem;
