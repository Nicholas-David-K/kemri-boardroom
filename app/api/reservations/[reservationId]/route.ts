import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/get-current-user';

export async function DELETE(req: Request, { params }: { params: { reservationId: string } }) {
    try {
        const currentUser = await getCurrentUser();

        console.log('PARAMS ID: ', params.reservationId);
        console.log('[CURRENT_USER]: ', currentUser);

        // if (!currentUser.id || currentUser.role === 'Customer') {
        //     return new NextResponse('Unauthorized', { status: 401 });
        // }

        // if (!params.billboardId) {
        //     return new NextResponse('Billboard Id is requried', { status: 400 });
        // }

        return NextResponse.json('success');
    } catch (error) {
        console.log(['RESERVATIONS_DELETE'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
