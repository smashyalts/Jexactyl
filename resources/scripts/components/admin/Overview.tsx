import React from 'react';
import PageContentBlock from '@/components/admin/elements/PageContentBlock';
import Box from './elements/Box';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

export default () => (
    <PageContentBlock title={'Overview'} description={'A quick glance at your system.'}>
        <Box title={'System Information'} icon={faDesktop}>
            You are running the latest version of Jexactyl.
        </Box>
    </PageContentBlock>
);
