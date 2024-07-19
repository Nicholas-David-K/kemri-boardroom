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
import { Loader2 } from 'lucide-react';
import { Separator } from '../ui/separator';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    description?: string;
    actionLabel?: string;
    disabled?: boolean;
    showLogo?: boolean;
    isLoading?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    isDelete?: boolean;
};

const Modal = ({
    isOpen,
    onClose,
    showLogo,
    isLoading,
    onSubmit,
    title,
    body,
    footer,
    disabled,
    description,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
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
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Separator />

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
                                    className="w-full rounded-sm"
                                    onClick={handleSubmit}
                                >
                                    {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
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
