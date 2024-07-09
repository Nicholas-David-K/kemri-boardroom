import { Button, buttonVariants } from '@/components/ui/button';
import { Filter, PlusCircle } from 'lucide-react';

import BoardroomItem from '@/components/boardroom-item';
import Link from 'next/link';
import WelcomeHeader from '@/components/welcome-header';
import WidthWrapper from '@/components/width-wrapper';
import { cn } from '@/lib/utils';

const DasshboardPage = () => {
    return (
        <main>
            <WelcomeHeader />
            <WidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-4 col-span-4 w-full">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/manage/add"
                                className={cn(
                                    'group',
                                    buttonVariants({
                                        variant: 'default',
                                    })
                                )}
                            >
                                <PlusCircle
                                    size="lg"
                                    className="h-5 w-5 mr-2 text-white group-hover:scale-110 transition "
                                />{' '}
                                Add boardroom
                            </Link>
                            <Filter />
                        </div>
                        <BoardroomItem />
                    </div>
                    <div className="bg-teal-500 h-full w-full p-10 hidden lg:block"></div>
                </div>
            </WidthWrapper>
        </main>
    );
};

export default DasshboardPage;
