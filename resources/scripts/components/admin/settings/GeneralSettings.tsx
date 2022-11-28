import React from 'react';
import Box from '@/components/admin/elements/Box';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import PageContentBlock from '@/components/admin/elements/PageContentBlock';

export default () => (
    <PageContentBlock title={'Settings - General'} description={'Configure basic Jexactyl settings.'}>
        <Box title={'General Configuration'} icon={faToolbox}>
            App name:
        </Box>
    </PageContentBlock>
);
