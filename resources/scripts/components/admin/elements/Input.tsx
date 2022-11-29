import React from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';

interface Props {
    icon?: IconProp;
    isLoading?: boolean;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
    button?: React.ReactNode;
}

export default ({ icon, title, className, isLoading, children, button }: Props) => (
    <div className={classNames(className, 'relative rounded shadow-md bg-neutral-800')}>
        <SpinnerOverlay visible={isLoading || false} />
        <div className={'flex flex-row bg-neutral-900 rounded-t px-4 xl:px-5 py-3 border-b border-black'}>
            {typeof title === 'string' ? (
                <p className={'text-sm uppercase'}>
                    {icon && <FontAwesomeIcon icon={icon} className={'mr-2 text-gray-300'} />}
                    {title}
                </p>
            ) : (
                title
            )}
            {button}
        </div>
        <div className={'px-4 xl:px-5 py-5'}>{children}</div>
    </div>
);
