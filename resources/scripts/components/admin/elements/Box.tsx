import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    title: string;
    icon: IconProp;
    children: React.ReactNode;
}

export default ({ title, icon, children }: Props) => (
    <div className={'flex flex-col w-full rounded-lg shadow-md bg-neutral-700'}>
        <div className={'rounded shadow-md bg-neutral-700'}>
            <div className={'bg-gray-800 rounded-t border-b border-black px-4 py-3'}>
                <p className={'text-sm uppercase'}>
                    <FontAwesomeIcon icon={icon} size={'1x'} className={'mr-2'} fixedWidth />
                    {title}
                </p>
            </div>
            <div className={'p-4'}>{children}</div>
        </div>
    </div>
);
