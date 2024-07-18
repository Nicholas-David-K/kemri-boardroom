import BoardroomInfo from '@/components/boardroom-info';
import Header from '@/components/header';
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
        <div>
            <Header heading="Boardroom Detail Page" subtitle="View Boardroom Details" />
            <WidthWrapper>
                <BoardroomInfo data={boardroom} />
            </WidthWrapper>
        </div>
    );
};

export default BoardroomDetailPage;
