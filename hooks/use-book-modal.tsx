import { create } from "zustand";

interface CreateBookModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBookModal = create<CreateBookModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBookModal;
