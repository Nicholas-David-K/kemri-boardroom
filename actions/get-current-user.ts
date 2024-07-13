import { AuthSession, authOptions } from '@/pages/api/auth/[...nextauth]';

import { ExtendedUser } from '@/next.auth';
import { getServerSession } from 'next-auth';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        return session.user;
    } catch (error: any) {
        return null;
    }
}
