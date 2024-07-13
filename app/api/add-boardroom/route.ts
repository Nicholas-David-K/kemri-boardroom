import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/get-current-user';

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();

        const { name, location, description, amenities, images, capacity } = body;

        if (!currentUser || currentUser.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }

        if (!location) {
            return new NextResponse('Location is required', { status: 400 });
        }

        if (!description) {
            return new NextResponse('Description is required', { status: 400 });
        }

        if (!capacity) {
            return new NextResponse('Capacity is required', { status: 400 });
        }

        let amenityList = amenities.map(
            (item: any) => item.charAt(0).toUpperCase() + item.slice(1)
        );

        const boardroom = await db.boardroom.create({
            data: {
                name,
                location,
                description,
                amenities: amenityList,
                capacity,
                startTime: '06:00',
                endTime: '16:30',
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)],
                    },
                },
            },
        });

        return NextResponse.json(boardroom);
    } catch (error) {
        console.log(['BOARDROOM_CREATE_ERROR'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
