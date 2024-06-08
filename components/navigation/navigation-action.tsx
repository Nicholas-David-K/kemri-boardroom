'use client';

import ActionTooltip from '../action-tooltip';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {};

const NavigationAction = (props: Props) => {
    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a boardroom">
                <button className="group flex items-center">
                    <div className="flex mx-6 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-primary-500">
                        <Plus
                            className="group-hover:text-white transition text-primary-500"
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};

export default NavigationAction;
