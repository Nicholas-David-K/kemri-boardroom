import { useSession } from 'next-auth/react';

export type ExtendedUser = DefaultSession['user'] & {
    id: string;
    username: string;
    email: string;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: ExtendedUser;
    }
}
