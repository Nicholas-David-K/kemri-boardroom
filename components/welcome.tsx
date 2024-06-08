'use client';

import { getGreeting } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/auth/use-current-user';

const Welcome = () => {
    const greeting = getGreeting();
    const currentUser = useCurrentUser();

    return (
        <div className="font-bold ml-2 text-2xl pt-10 pb-2 border-b">
            {greeting}, {currentUser?.name}!
        </div>
    );
};

export default Welcome;
