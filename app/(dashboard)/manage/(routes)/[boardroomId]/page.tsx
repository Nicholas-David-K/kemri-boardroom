import React from 'react';

interface BoardroomDetailPage {
    params: {
        boardroomId: string;
    };
}

const BoardroomDetailPage = ({ params }: BoardroomDetailPage) => {
    return <div>BoardroomDetailPage {params.boardroomId}</div>;
};

export default BoardroomDetailPage;
