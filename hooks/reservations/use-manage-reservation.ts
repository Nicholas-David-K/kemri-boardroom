import { Boardroom } from '@prisma/client';
import { ReservationColumn } from '@/app/(frontend)/(routes)/[boardroomId]/components/columns';
import { create } from 'zustand';

interface ManageReservationProps {
    isOpen: boolean;
    data?: ReservationColumn;
    onOpen: (data?: ReservationColumn) => void;
    onClose: () => void;
}

const useManageReservation = create<ManageReservationProps>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data?: ReservationColumn) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default useManageReservation;
