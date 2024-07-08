'use client';

import Header from '@/components/header';
import { getGreeting } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const WelcomHeader = () => {
    const greeting = getGreeting();
    const currentUser = useCurrentUser();

    return (
        <Header
            heading={`${greeting}, ${currentUser?.name}!`}
            subtitle={
                currentUser?.role !== 'user'
                    ? 'Effortlessly manage work spaces at your organization'
                    : 'Effortlessly reserve your boardroom and stay updated on ongoing meetings.'
            }
        />
    );
};

export default WelcomHeader;
