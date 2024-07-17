import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/get-current-user';

export async function PATCH(req: Request, { params }: { params: { boardroomId: string } }) {
    try {
        const currentUser = await getCurrentUser();
        const formData = await req.json();

        const { name, location, description, amenities, images, capacity } = formData;

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

        await db.boardroom.update({
            where: {
                id: params.boardroomId,
            },
            data: {
                name,
                location,
                description,
                amenities: amenityList,
                capacity,
                startTime: '06:00',
                endTime: '16:30',
                images: {
                    deleteMany: {},
                },
            },
        });

        const product = await db.boardroom.update({
            where: {
                id: params.boardroomId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)],
                    },
                },
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log(['BOARDROOM_UPDATE_ERROR'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
