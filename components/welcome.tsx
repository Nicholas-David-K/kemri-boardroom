'use client';

import Header from './header';
import { getGreeting } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const Welcome = () => {
    const greeting = getGreeting();
    const currentUser = useCurrentUser();

    return (
        <Header
            heading={`${greeting}, ${currentUser?.name}!`}
            subtitle="Effortlessly reserve your boardroom and stay updated on ongoing meetings."
        />
    );
};

export default Welcome;
