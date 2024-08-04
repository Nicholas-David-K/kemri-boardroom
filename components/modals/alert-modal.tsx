'use client';

import React, { useEffect, useState } from 'react';

import Modal from '@/components/modals/modal';

interface AlertModalProps {
    isOpen: boolean;
    title: string;
    subtitle: string;
    onClose: () => void;
    onConfirm: () => void;
    isDelete?: boolean;
    loading: boolean;
    body: string;
}
export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    subtitle,
    loading,
    isDelete,
    body,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const bodyContent = <div className="text-muted-foreground text-sm">{body}</div>;

    return (
        <Modal
            title={title}
            description={subtitle}
            isOpen={isOpen}
            onClose={onClose}
            body={bodyContent}
            disabled={loading}
            secondaryActionLabel="Cancel"
            secondaryAction={onClose}
            actionLabel="Confirm"
            isDelete={isDelete}
            onSubmit={onConfirm}
            stick
        />
    );
};
