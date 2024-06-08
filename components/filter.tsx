'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const Filter = () => {
    return (
        <div className="border p-2 rounded-lg">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Capacity" />
                </SelectTrigger>
                {/* <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent> */}
            </Select>
        </div>
    );
};

export default Filter;
