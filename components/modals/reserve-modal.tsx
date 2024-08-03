'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Video, VideoOff } from 'lucide-react';
import { durations, meetingLinks, meetingTypes, platformTypes } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

import ChoiceSelector from '@/components/choice-selector';
import { DateTimePicker } from '../date-time-picker';
import Heading from '@/components/heading';
import Input from '@/components/inputs/input';
import Modal from '@/components/modals/modal';
import axios from 'axios';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';
import useReserveModal from '@/hooks/reservations/use-reserve-modal';
import { useRouter } from 'next/navigation';
import useSuccessModal from '@/hooks/reservations/use-success-modal';

enum STEPS {
    MEETING_TYPE = 0,
    MEETING_DETAILS = 1,
    MEETING_INFO = 2,
}

const ReserveModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>();
    const [error, setError] = useState('');

    const [step, setStep] = useState(STEPS.MEETING_TYPE);
    const reserveModal = useReserveModal();
    const successModal = useSuccessModal();

    const router = useRouter();
    const { refetch } = useReservationsQuery({ queryKey: 'fetch-reservations' });

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
            date: new Date(),
            meetingDuration: 30,
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
    const meetingDuration = watch('meetingDuration');

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

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setError('');

        if (step !== STEPS.MEETING_INFO) {
            return onNext();
        }

        try {
            setIsLoading(true);

            if ((meetingType === 'Physical' || meetingType === 'Hybrid') && !date) {
                setError('Please provide the date and time of the meeting');
                return;
            }

            await axios.post('/api/boardrooms/reserve', {
                ...values,
                boardroomId: reserveModal.data?.id,
            });

            reserveModal.onClose();
            reset();

            setTimeout(() => {
                successModal.onOpen();
            }, 500);
        } catch (error: any) {
            if (error?.response?.status === 409) {
                setError(
                    'The selected time overlaps with an existing reservation. Please choose a different time slot.'
                );
            } else {
                setError('Something went wrong! Please try again');
            }
        } finally {
            setIsLoading(false);
            refetch();
        }
    };

    useEffect(() => {
        setValue('date', date);
    }, [date, setValue]);

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
        bodyContent = (
            <div className="flex flex-col gap-8">
                {meetingType === 'Hybrid' && (
                    <>
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
                                    icon={Video}
                                />
                                <ChoiceSelector
                                    onClick={() => setCustomValue('recordMeeting', 'No')}
                                    selected={recordMeeting === 'No'}
                                    label="No"
                                    icon={VideoOff}
                                />
                            </div>
                        </div>
                    </>
                )}

                {meetingType !== 'Hybrid' && (
                    <>
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
                    </>
                )}
            </div>
        );
    }

    //! STEP 2: MEETING INFO
    if (step === STEPS.MEETING_INFO) {
        bodyContent = (
            <>
                {meetingType === 'Hybrid' && (
                    <>
                        <Heading title="Enter the name of the meeting" />
                        <div className="flex flex-col gap-8 mb-3">
                            <Input
                                id="name"
                                label="Name"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                        </div>
                    </>
                )}

                <Heading title="Select the date and meeting time" />
                <DateTimePicker hourCycle={12} value={date} onChange={setDate} />

                <div className="mt-3">
                    <Heading title="Select the duration of the meeting" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto mt-3">
                        {durations.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <ChoiceSelector
                                    onClick={() => setCustomValue('meetingDuration', item.minutes)}
                                    selected={meetingDuration === item.minutes}
                                    label={item.label}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <Modal
            isOpen={reserveModal.isOpen}
            onClose={reserveModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title={`Reserve ${reserveModal.data?.name}`}
            description="Follow the steps to make a reservation"
            disabled={isLoading}
            isLoading={isLoading}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.MEETING_TYPE ? undefined : onBack}
            body={bodyContent}
            error={error}
        />
    );
};

export default ReserveModal;
