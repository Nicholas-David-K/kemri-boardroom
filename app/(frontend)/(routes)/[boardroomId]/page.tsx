import BoardroomInfo from '@/components/boardroom-info';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { Plus } from 'lucide-react';
import { ReservationFilters } from '@/types';
import WidthWrapper from '@/components/width-wrapper';
import { db } from '@/lib/db';

interface BoardroomDetailPage {
    params: {
        boardroomId: string;
    };
}

const BoardroomDetailPage = async ({ params }: BoardroomDetailPage) => {
    const boardroom = await db.boardroom.findUnique({
        where: {
            id: params.boardroomId,
        },
        include: {
            images: true,
        },
    });

    return (
        <main>
            <Header
                heading="Reservations"
                subtitle={`${boardroom?.name} - KEMRI ${
                    boardroom?.location === 'Nairobi' ? 'Headquarters' : boardroom?.location
                }`}
            />
            <WidthWrapper>
                <BoardroomInfo data={boardroom} />
            </WidthWrapper>
        </main>
    );
};

export default BoardroomDetailPage;
