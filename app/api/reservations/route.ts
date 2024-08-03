import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const boardroomId = searchParams.get('boardroomId') || null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const query: any = {};

        if (boardroomId !== null) {
            query.boardroomId = boardroomId;
        }

        const reservations = await db.reservation.findMany({
            where: query,
            include: {
                boardroom: true,
                user: true,
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
