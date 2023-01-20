import React from 'react';

import * as Icon from 'react-feather';
import { ServerContext } from '@/state/server';
import TitledGreyBox from '@/components/elements/TitledGreyBox';

const ServerConfigurationBlock = () => {
    const server = ServerContext.useStoreState((state) => state.server.data!);

    return (
        <TitledGreyBox className={`break-words mt-4`} title={'Server Information'}>
            <p className={`text-xs mt-2`}>
                <div className={`flex flex-row`}>
                    <Icon.List className={`mr-1`} size={16} />
                    {server.id}
                </div>
            </p>
            <p className={`text-xs mt-2`}>
                <div className={`flex flex-row truncate`}>
                    <Icon.Layers className={`mr-1`} size={16} />
                    {server.node}
                </div>
            </p>
            <p className={`text-xs mt-2`}>
                <div className={`flex flex-row truncate`}>
                    <Icon.Disc className={`mr-1`} size={16} />
                    {server.dockerImage}
                </div>
            </p>
        </TitledGreyBox>
    );
};

export default ServerConfigurationBlock;
