import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/get-current-user';

export async function DELETE(req: Request, { params }: { params: { reservationId: string } }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!params.reservationId) {
            return new NextResponse('Reservervation Id is requried', { status: 400 });
        }

        const reservation = await db.reservation.delete({
            where: {
                id: params.reservationId,
                userId: currentUser.id,
            },
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.log(['RESERVATIONS_DELETE'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
