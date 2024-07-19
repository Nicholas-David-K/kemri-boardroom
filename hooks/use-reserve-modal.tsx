import { create } from 'zustand';

interface CreateBookModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useReserveModal = create<CreateBookModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useReserveModal;
