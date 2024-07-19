'use client';

import { CalendarIcon, Wifi } from 'lucide-react';
import { FaCheckCircle, FaLink, FaUnlink } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMemo, useState } from 'react';

import { BiLogoZoom } from 'react-icons/bi';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import ChoiceSelector from '@/components/choice-selector';
import { FaPeopleRoof } from 'react-icons/fa6';
import Heading from '@/components/heading';
import Input from '@/components/inputs/input';
import Modal from '@/components/modals/modal';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import useReserveModal from '@/hooks/use-reserve-modal';
import { useRouter } from 'next/navigation';

const meetingTypes = [
    {
        id: 1,
        label: 'Hybrid',
        icon: Wifi,
    },
    {
        id: 2,
        label: 'Physical',
        icon: FaPeopleRoof,
    },
];

const platformTypes = [
    {
        id: 1,
        label: 'Teams',
        icon: BsMicrosoftTeams,
    },
    {
        id: 2,
        label: 'Zoom',
        icon: BiLogoZoom,
    },
];

const meetingLinks = [
    {
        id: 1,
        label: 'Yes',
        icon: FaLink,
    },
    {
        id: 2,
        label: 'No',
        icon: FaUnlink,
    },
];

enum STEPS {
    MEETING_TYPE = 0,
    MEETING_DETAILS = 1,
    MEETING_INFO = 2,
}

const ReserveModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>();

    const [step, setStep] = useState(STEPS.MEETING_TYPE);
    const reserveModal = useReserveModal();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            date: date,
            duration: '',
            meetingType: 'Hybrid',
            platformType: 'Teams',
            meetingLink: 'Yes',
            recordMeeting: 'Yes',
        },
    });

    const meetingType = watch('meetingType');
    const platformType = watch('platformType');
    const meetingLink = watch('meetingLink');
    const recordMeeting = watch('recordMeeting');

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        if (step !== STEPS.MEETING_INFO) {
            return onNext();
        }

        setIsLoading(true);
        console.log(values);
        setIsLoading(false);
    };

    // dynamic action labels
    const actionLabel = useMemo(() => {
        if (step === STEPS.MEETING_INFO) {
            return 'Reserve boardroom';
        }
        return 'Continue';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.MEETING_TYPE) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    //! STEP 0: MEETING TYPE
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Please indicate the meeting format" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {meetingTypes.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <ChoiceSelector
                            onClick={(type) => setCustomValue('meetingType', type)}
                            selected={meetingType === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
            <small className="text-xs text-slate-900">
                Select the type that best describes your meeting.
            </small>
        </div>
    );

    //! STEP 1: MEETING PLATFORM / NAME
    if (step === STEPS.MEETING_DETAILS) {
        bodyContent =
            meetingType === 'Hybrid' ? (
                <div className="flex flex-col gap-8">
                    <div>
                        <h3 className="text-slate-900 mb-3 text-sm">
                            Which platform would you prefer for the meeting?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                            {platformTypes.map((item) => (
                                <div key={item.label} className="col-span-1">
                                    <ChoiceSelector
                                        onClick={(type) => setCustomValue('platformType', type)}
                                        selected={platformType === item.label}
                                        label={item.label}
                                        icon={item.icon}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 mb-3 text-sm">
                            Would you like ICT Support to generate a meeting link for you?
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                            {meetingLinks.map((item) => (
                                <div key={item.label} className="col-span-1">
                                    <ChoiceSelector
                                        onClick={(type) => setCustomValue('meetingLink', type)}
                                        selected={meetingLink === item.label}
                                        label={item.label}
                                        icon={item.icon}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 mb-3 text-sm">
                            Would you like the meeting to be recorded?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                            <ChoiceSelector
                                onClick={() => setCustomValue('recordMeeting', 'Yes')}
                                selected={recordMeeting === 'Yes'}
                                label="Yes"
                                icon={FaPeopleRoof}
                            />
                            <ChoiceSelector
                                onClick={() => setCustomValue('recordMeeting', 'No')}
                                selected={recordMeeting === 'No'}
                                label="No"
                                icon={FaPeopleRoof}
                            />
                        </div>
                    </div>

                    <small className="text-xs text-slate-900">
                        Provide details for your meeting.
                    </small>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <Heading title="Enter the name of the meeting" />
                    <div className="flex flex-col gap-8">
                        <Input
                            id="name"
                            label="Name"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <small className="text-xs text-slate-900">
                        Provide a name for your meeting.
                    </small>
                </div>
            );
    }

    //! STEP 2: MEETING INFO
    if (step === STEPS.MEETING_INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Select the meeting date" />
                <Popover modal={true}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full justify-start text-left font-normal py-6',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                </Popover>
                <small className="text-xs text-slate-900">
                    Specify the date and duration for your meeting.
                </small>
            </div>
        );
    }

    return (
        <Modal
            isOpen={reserveModal.isOpen}
            onClose={reserveModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Reserve boardroom"
            description="Follow the steps to reserve your boardroom"
            disabled={isLoading}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.MEETING_TYPE ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default ReserveModal;
