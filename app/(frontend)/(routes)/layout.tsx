import Header from '@/components/header';
import Navbar from '@/components/navigation/navbar';
import NavigationSidebar from '@/components/navigation/navigation-sidebar';
import { getGreeting } from '@/lib/utils';
import { getServerSession } from 'next-auth';

type Props = {
    children: React.ReactNode;
};

const FrontendLayout = async ({ children }: Props) => {
    const currentUser = await getServerSession();
    const greeting = getGreeting();
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[110px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[110px] h-full">{children}</main>
        </div>
    );
};

export default FrontendLayout;
