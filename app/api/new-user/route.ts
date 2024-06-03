import { getUserByEmail, getUserById } from '@/data/user';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { username, email } = await req.json();

        if (!username) {
            return new NextResponse('Username is required', { status: 400 });
        }

        if (!email) {
            return new NextResponse('Email is required', { status: 400 });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return new NextResponse('A user with this email already exists', { status: 400 });
        }

        const user = await db.user.create({
            data: {
                username,
                email,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log('[NEW_USER_CREATE_ERROR]: ', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
