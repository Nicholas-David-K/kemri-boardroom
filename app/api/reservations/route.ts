import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const boardroomId = searchParams.get('boardroomId');

        console.log('[BOARDROOM_ID]: ', boardroomId);

        const reservations = await db.reservation.findMany({
            where: {
                boardroomId: 'KN6FZg0eMP',
            },
            include: {
                boardroom: true,
            },
            orderBy: {
                date: 'asc',
            },
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.log(['RESERVATIONS_GET_ERROR'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
