import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessProps {
    message?: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) {
        return null;
    }
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500 text-sm">
            <CheckCircledIcon />
            <p>{message}</p>
        </div>
    );
};

export default FormSuccess;
