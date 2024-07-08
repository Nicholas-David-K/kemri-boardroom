import { Filter, PlusCircle } from 'lucide-react';

import BoardroomItem from '@/components/boardroom-item';
import { Button } from '@/components/ui/button';
import WelcomeHeader from '@/components/welcome-header';
import WidthWrapper from '@/components/width-wrapper';

const DasshboardPage = () => {
    return (
        <main>
            <WelcomeHeader />
            <WidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-4 col-span-4 w-full">
                        <div className="flex items-center justify-between">
                            <Filter />
                            <Button>
                                <PlusCircle size="lg" className="h-4 w-4 mr-2" /> Add boardroom
                            </Button>
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
