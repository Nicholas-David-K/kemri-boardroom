'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { Separator } from '../ui/separator';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title?: string;
    error?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    description?: string;
    actionLabel?: string;
    disabled?: boolean;
    stick?: boolean;
    isLoading?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    isDelete?: boolean;
};

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    stick,
    body,
    footer,
    disabled,
    error,
    description,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
    isLoading,
    isDelete,
}: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 50);
    }, [onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        if (onSubmit) {
            onSubmit();
        }
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (!secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="sm:max-w-[600px]"
                onInteractOutside={(e) => {
                    if (stick) {
                        e.preventDefault();
                    }
                }}
            >
                <DialogHeader>
                    <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Separator />

                {error && (
                    <div className="p-3 rounded-sm text-sm bg-rose-500 text-white">{error}</div>
                )}
                <div className="grid gap-4 py-4">{body}</div>

                <DialogFooter className="w-full">
                    <div className="flex flex-col space-y-2 w-full">
                        <div className="flex items-center gap-4 w-full">
                            {secondaryAction && (
                                <Button
                                    disabled={disabled}
                                    className="w-full rounded-sm"
                                    onClick={handleSecondaryAction}
                                >
                                    {secondaryActionLabel}
                                </Button>
                            )}
                            {onSubmit && (
                                <Button
                                    variant={isDelete ? 'destructive' : 'primary'}
                                    type="submit"
                                    disabled={disabled}
                                    className="w-full"
                                    onClick={handleSubmit}
                                >
                                    {isLoading && (
                                        <Loader className="h-4 w-4 text-white animate-spin mr-2" />
                                    )}
                                    {actionLabel}
                                </Button>
                            )}
                        </div>
                        {footer}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
