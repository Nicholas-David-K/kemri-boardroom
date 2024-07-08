import DashboardSidebar from '@/components/navigation/dashboard-sidebar';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[110px] z-30 flex-col fixed inset-y-0">
                <DashboardSidebar />
            </div>
            <main className="md:pl-[110px] h-full">{children}</main>
        </div>
    );
};

export default DashboardLayout;
