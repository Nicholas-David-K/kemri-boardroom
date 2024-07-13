'use client';

import { CircleAlert, Search } from 'lucide-react';

import React from 'react';

const NoResults = () => {
    return (
        <div className="flex h-[50vh] flex-col items-center justify-center font-medium text-sm text-slate-700">
            <CircleAlert size={45} className="h-16 w-16 text-red-500 mb-5" />
            Oops, we couldn&apos;t find what you&apos;re looking for!
        </div>
    );
};

export default NoResults;
