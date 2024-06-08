import Navbar from '@/components/navigation/navbar';
import NavigationSidebar from '@/components/navigation/navigation-sidebar';

type Props = {
    children: React.ReactNode;
};

const FrontendLayout = async ({ children }: Props) => {
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
