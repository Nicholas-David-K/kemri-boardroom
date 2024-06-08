import { cn } from '@/lib/utils';

type WrapperProps = {
    className?: string;
    children: React.ReactNode;
};

const WidthWrapper = ({ className, children }: WrapperProps) => {
    return <div className="xl:px-14 md:px-10 px-6">{children}</div>;
};

export default WidthWrapper;
