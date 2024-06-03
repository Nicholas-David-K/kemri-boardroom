'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Home() {
    const session = useSession();
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            BILLBOARDS
            {JSON.stringify(session.data)}
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
