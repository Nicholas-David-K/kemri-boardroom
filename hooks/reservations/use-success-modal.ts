import { create } from 'zustand';

interface SuccessModalModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSuccessModal = create<SuccessModalModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSuccessModal;
