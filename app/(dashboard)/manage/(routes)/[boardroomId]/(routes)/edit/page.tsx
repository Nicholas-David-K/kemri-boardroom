import React from 'react';

interface BoardroomEditPage {
    params: {
        boardroomId: string;
    };
}

const BoardroomEditPage = ({ params }: BoardroomEditPage) => {
    return <div>BoardroomEditPage {params.boardroomId}</div>;
};

export default BoardroomEditPage;
