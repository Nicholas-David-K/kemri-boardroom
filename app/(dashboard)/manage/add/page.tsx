import BoardroomForm from './components/boardroom-form';
import Header from '@/components/header';
import WidthWrapper from '@/components/width-wrapper';

type Props = {};

const AddBoardroomPage = (props: Props) => {
    return (
        <div>
            <Header
                heading="New boardroom"
                subtitle="Provide the details to add a new boardroom to the system."
            />
            <WidthWrapper>
                <BoardroomForm />
            </WidthWrapper>
        </div>
    );
};

export default AddBoardroomPage;
