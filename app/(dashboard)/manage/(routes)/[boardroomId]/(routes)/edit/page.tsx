import BoardroomForm from '../../../add/components/boardroom-form';
import Header from '@/components/header';
import React from 'react';
import WidthWrapper from '@/components/width-wrapper';
import { db } from '@/lib/db';

interface BoardroomEditPage {
    params: {
        boardroomId: string;
    };
}

const BoardroomEditPage = async ({ params }: BoardroomEditPage) => {
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
            <Header heading="Edit boardroom" subtitle="Update boardroom details" />
            <WidthWrapper>
                <BoardroomForm initialData={boardroom} />
            </WidthWrapper>
        </div>
    );
};

export default BoardroomEditPage;
