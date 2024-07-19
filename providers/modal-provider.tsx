'use client';

import { useEffect, useState } from 'react';

import ReserveModal from '@/components/modals/reserve-modal';

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ReserveModal />
        </>
    );
};
