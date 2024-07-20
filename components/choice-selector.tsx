'use client';

import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

interface ChoiceSelectorProps {
    selected?: boolean;
    icon?: IconType | LucideIcon;
    label: string;
    onClick: (value: string) => void;
}

const ChoiceSelector = ({ onClick, selected, icon: Icon, label }: ChoiceSelectorProps) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-3 flex flex-col gap-3 hover:bg-primary-400 hover:text-white transition cursor-pointer ${
                selected ? 'bg-primary-400 text-white' : 'border-neutral-200'
            }`}
        >
            <div className="flex flex-row items-center gap-x-10">
                {Icon && <Icon size={20} />}
                <div className="font-semibold">{label}</div>
            </div>
        </div>
    );
};

export default ChoiceSelector;
