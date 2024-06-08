import Filter from '@/components/filter';
import Welcome from '@/components/welcome';
import WidthWrapper from '@/components/width-wrapper';

export default function Home() {
    return (
        <main>
            <Welcome />
            <WidthWrapper>
                <div className="grid grid-cols-4 gap-4">
                    <div className="lg:col-span-3 col-span-4 w-full">
                        <Filter />
                    </div>
                    <div className="bg-primary-500 h-full w-full p-10 hidden lg:block"></div>
                </div>
            </WidthWrapper>
        </main>
    );
}
