'use client';

import { Check, SlidersHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useSuccessModal from '@/hooks/reservations/use-success-modal';

export function SuccessModal() {
    const successModal = useSuccessModal();

    return (
        <Dialog open={successModal.isOpen}>
            <DialogContent className="xs:w-[400px] md:w-full rounded-lg">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl flex flex-col justify-center items-center">
                        <div className="h-14 w-14 rounded-full mb-2 flex items-center justify-center bg-green-500">
                            <Check className="text-white h-7 w-7" />
                        </div>
                        <p className="text-3xl font-extrabold">Success</p>
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center font-medium text-sm">
                    Your reservation request was successful! <br />
                    <br />
                    The boardroom has been reserved for your selected date and time and is pending
                    approval. You will receive a confirmation email once your reservation is
                    approved.
                </div>
                <DialogFooter className="flex flex-col items-center text-center justify-center mx-20">
                    <Button onClick={successModal.onClose} className="w-full">
                        OK
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
