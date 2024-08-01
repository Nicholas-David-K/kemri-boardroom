'use client';

import React, { useEffect, useState } from 'react';

import Modal from '@/components/modals/modal';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    body: string;
}
export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    body,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const bodyContent = <div className="text-center text-muted-foreground text-sm">{body}</div>;

    return (
        <>
            <Modal
                title="Are you sure?"
                description="This action cannot be undone"
                isOpen={isOpen}
                onClose={onClose}
                body={bodyContent}
                disabled={loading}
                secondaryActionLabel="Cancel"
                secondaryAction={onClose}
                actionLabel="Continue"
                onSubmit={onConfirm}
                isDelete
            />
        </>
    );
};
