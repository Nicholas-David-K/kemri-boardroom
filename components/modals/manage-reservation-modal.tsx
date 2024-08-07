'use client';

import { CheckCheck, CircleX } from 'lucide-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import ChoiceSelector from '../choice-selector';
import { FaUserAlt } from 'react-icons/fa';
import Heading from '@/components/heading';
import Modal from '@/components/modals/modal';
import { Textarea } from '../textarea';
import { format } from 'date-fns';
import { getFormattedMeetingTime } from '@/lib/utils';
import useManageReservation from '@/hooks/reservations/use-manage-reservation';
import { useReservationsQuery } from '@/hooks/reservations/use-reservations-query';
import { useState } from 'react';

const ManageReservationModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { refetch } = useReservationsQuery({ queryKey: 'fetch-reservations' });

    const manageReservation = useManageReservation();
    const { data } = useManageReservation();

    const {
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            reason: '',
        },
    });

    const requestType = watch('requestType');
    const reason = watch('reason');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setError('');
            setIsLoading(true);

            if (requestType === 'deny' && reason === '') {
                setError('Please provide a reason for denying the request');
            }

            // await axios.post('/api/boardrooms/reserve', {
            //     ...values,
            //     boardroomId: reserveModal.data?.id,
            // });
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

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Would you like to approve this request?" />

            <div className="p-7 rounded-md bg-white-bg">
                <div className="flex  items-center space-x-2 min-w-[270px]">
                    <div className="h-10 w-10 flex flex-col items-center justify-center bg-white-bg rounded-full border">
                        <FaUserAlt className="h-4 w-4 text-icon" />
                    </div>
                    <div className="flex flex-col -space-y-1.5">
                        <p className="font-bold">{data?.user.name}</p>
                        <p>{data?.user.email}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-sm">
                        <span className="text-muted-foreground">Meeting name: </span>
                        {data?.name}
                    </p>
                    <p className="text-sm">
                        <span className="text-muted-foreground">Meeting date & time: </span>
                        {data?.date && data?.duration ? (
                            <>
                                {getFormattedMeetingTime(data.date, data.duration)}
                                &mdash;<span> {format(new Date(data.date), 'MMMM do, yyyy')}</span>
                            </>
                        ) : (
                            <span>Data not available</span>
                        )}
                    </p>
                    <p className="text-sm">
                        <span className="text-muted-foreground">Reserved on: </span>
                        {data?.createdAt ? (
                            <>{format(new Date(data.date), 'MMMM do, yyyy, h:mm a')}</>
                        ) : (
                            <span>Data not available</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-1">
                    <ChoiceSelector
                        onClick={() => setCustomValue('requestType', 'deny')}
                        selected={requestType === 'deny'}
                        label="Deny request"
                        icon={CircleX}
                    />
                </div>

                <div className="col-span-1">
                    <ChoiceSelector
                        onClick={() => setCustomValue('requestType', 'approve')}
                        selected={requestType === 'approve'}
                        label="Approve request"
                        icon={CheckCheck}
                    />
                </div>
                {requestType === 'deny' && (
                    <div className="w-full col-span-2">
                        <Textarea
                            rows={10}
                            placeholder="Enter the reason for denying the request"
                            onChange={(value) => setCustomValue('reason', value)}
                        />
                    </div>
                )}
            </div>
            <small className="text-xs text-slate-900">
                Select the type that best describes your meeting.
            </small>
        </div>
    );

    const footerContent = (
        <div className="text-sm text-center">
            Please be aware that submitting this form will notify the owner of your approval or
            rejection of the request.
        </div>
    );

    return (
        <Modal
            isOpen={manageReservation.isOpen}
            onClose={manageReservation.onClose}
            onSubmit={handleSubmit(onSubmit)}
            footer={footerContent}
            title="Approve/deny request"
            description="Approve or deny the request to use this boardroom"
            disabled={isLoading}
            secondaryActionLabel="Cancel"
            secondaryAction={manageReservation.onClose}
            isLoading={isLoading}
            actionLabel="Submit"
            body={bodyContent}
            error={error}
            stick
        />
    );
};

export default ManageReservationModal;
