import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/actions/get-current-user';

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();

        console.log(body);

        const {
            name,
            date,
            meetingDuration,
            meetingType,
            platformType,
            meetingLink,
            recordMeeting,
            boardroomId,
        } = body;

        if (!currentUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!boardroomId) {
            return new NextResponse('Boardroom ID is required', { status: 400 });
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 });
        }

        if (!date) {
            return new NextResponse('Date is required', { status: 400 });
        }

        if (!meetingDuration) {
            return new NextResponse('Meeting duration is required', { status: 400 });
        }

        if (!meetingType) {
            return new NextResponse('Meeting duration is required', { status: 400 });
        }

        if (meetingType === 'Hybrid') {
            if (!platformType) {
                return new NextResponse('Platform type is required', { status: 400 });
            }

            if (!meetingLink) {
                return new NextResponse('Meeting link is required', { status: 400 });
            }

            if (!recordMeeting) {
                return new NextResponse('Record meeting is required', { status: 400 });
            }
        }

        const newStart = new Date(date).getTime();
        const newEnd = newStart + meetingDuration * 60000;

        const existingReservations = await db.reservation.findMany({
            where: {
                boardroomId,
                date: new Date(date),
            },
        });

        for (const reservation of existingReservations) {
            const existingStart = new Date(reservation.date).getTime();
            const existingEnd = existingStart + Number(reservation.duration) * 60000;

            if (
                (newStart >= existingStart && newStart < existingEnd) ||
                (newEnd > existingStart && newEnd <= existingEnd) ||
                (newStart <= existingStart && newEnd >= existingEnd)
            ) {
                return new NextResponse('Reservation conflict', { status: 409 });
            }
        }

        return NextResponse.json('success');
    } catch (error) {
        console.log(['BOARDROOM_RESERVE_ERROR'], error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
