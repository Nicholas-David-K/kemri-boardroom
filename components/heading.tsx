'use client';

type Props = {
    title: string;
    subtitle?: string;
    center?: boolean;
};

const Heading = ({ title, subtitle, center }: Props) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-lg font-bold">{title}</div>
            <div className="font-light text-neutral-500 text-sm">{subtitle}</div>
        </div>
    );
};

export default Heading;
