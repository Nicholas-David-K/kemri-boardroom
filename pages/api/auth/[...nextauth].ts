import { AuthOptions, Session } from 'next-auth';
import { getUserByEmail, getUserById } from '@/data/user';

import CredentialsProvider from 'next-auth/providers/credentials';
import LdapClient from 'ldapjs-client';
import { LoginSchema } from '@/schemas';
import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';

export interface AuthSession {
    session: Session;
    token?: any;
}

const createLdapClient = () => {
    return new LdapClient({
        // url: 'ldap://192.168.100.72',
        url: 'ldap://10.0.2.53',
        tlsOptions: { rejectUnauthorized: false },
    });
};

export const authOptions: AuthOptions = {
    callbacks: {
        async session({ session, token }: AuthSession) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.username && session.user) {
                session.user.username = token.username;
            }

            if (token.email && session.user) {
                session.user.email = token.email;
            }

            if (token.password && session.user) {
                session.user.password = token.password;
            }

            if (token.name && session.user) {
                session.user.name = token.name;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            // console.log('SESSION: ', session);

            return session;
        },

        async jwt({ token, user, session }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            token.email = existingUser?.email;
            token.username = existingUser?.username;
            token.name = existingUser?.name;
            token.role = existingUser?.role;

            // console.log('TOKEN: ', token);

            return token;
        },
    },

    adapter: PrismaAdapter(db),

    providers: [
        CredentialsProvider({
            name: 'LDAP',
            credentials: {
                username: { label: 'username', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                const client = createLdapClient();

                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { username, password } = validatedFields.data;

                    try {
                        await client.bind(username, password);

                        const options: LdapClient.SearchOptions = {
                            filter: `userPrincipalName=${username}`,
                            scope: 'sub',
                            attributes: ['*'],
                        };

                        const res: any = await client.search('DC=kemri,DC=org', options);
                        console.log(res);

                        const user = await getUserByEmail(res[0]['userPrincipalName']);

                        // console.log('[USER]: ', user);

                        if (!user?.id && res) {
                            const newUser = await db.user.create({
                                data: {
                                    name: res[0]['givenName'],
                                    username: res[0]['sAMAccountName'],
                                    email: res[0]['userPrincipalName'],
                                },
                            });

                            return newUser;
                        }

                        return user;
                    } catch (error) {
                        console.log('[LDAP_ERROR]: ', error);
                        throw Error('Something went wrong!');
                    }
                }
                return null;
            },
        }),
    ],

    pages: {
        signIn: '/auth/login',
    },
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
