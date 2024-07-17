import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const capacityId = searchParams.get('capacityId');
        const location = searchParams.get('location');

        const query: any = {};

        if (capacityId) {
            if (capacityId === '1') {
                // 10 — 25
                query.capacity = { gt: 10, lt: 25 };
            }

            if (capacityId === '2') {
                // 26 — 49
                query.capacity = { gt: 26, lt: 49 };
            }

            if (capacityId === '3') {
                // > 50
                query.capacity = { gt: 50 };
            }
        }

        if (location) {
            query.location = location;
        }

        query.active = true;

        const boardrooms = await db.boardroom.findMany({
            where: query,
            include: {
                images: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(boardrooms);
    } catch (error) {
        console.log(['BOARDROOMS_GET_ERROR'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
