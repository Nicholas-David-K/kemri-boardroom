import BoardroomItem from '@/components/boardroom-item';
import Filter from '@/components/filter';
import WelcomeHeader from '@/components/welcome-header';
import WidthWrapper from '@/components/width-wrapper';

export default function Home() {
    return (
        <main>
            <WelcomeHeader />
            <WidthWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="md:col-span-4 col-span-4 w-full">
                        <BoardroomItem />
                    </div>
                    <div className="bg-primary-500 h-full w-full p-10 hidden lg:block"></div>
                </div>
            </WidthWrapper>
        </main>
    );
}
