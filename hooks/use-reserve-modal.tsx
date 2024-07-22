import { Boardroom } from '@prisma/client';
import { create } from 'zustand';

interface CreateBookModalProps {
    isOpen: boolean;
    data?: Boardroom;
    onOpen: (data?: Boardroom) => void;
    onClose: () => void;
}

const useReserveModal = create<CreateBookModalProps>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data?: Boardroom) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default useReserveModal;
