import BoardroomItem from '@/components/boardroom-item';
import BoardroomsContainer from '@/components/boardrooms-container';
import Filter from '@/components/filter';
import { FilterModal } from '@/components/modals/filter-modal';
import { Filters } from '@/types';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import WelcomeHeader from '@/components/welcome-header';
import WidthWrapper from '@/components/width-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HomepageProps {
    searchParams: Filters;
}

export default function Home({ searchParams }: HomepageProps) {
    return (
        <div>
            <WelcomeHeader />
            <WidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-4 col-span-4 w-full">
                        <div className="flex items-center justify-end">
                            <FilterModal />
                        </div>
                        <BoardroomsContainer params={searchParams} />
                    </div>
                    <div className="bg-primary-500 h-full w-full p-10 hidden lg:block"></div>
                </div>
            </WidthWrapper>
        </div>
    );
}
