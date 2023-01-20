import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SidePanel from '@/components/elements/SidePanel';
import { NotFound } from '@/components/elements/ScreenBlock';
import ViewContainer from '@/components/tickets/ViewContainer';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import MobileNavigation from '@/components/elements/MobileNavigation';
import OverviewContainer from '@/components/tickets/OverviewContainer';

export default () => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            <Routes>
                <Route path={`/tickets`}>
                    <OverviewContainer />
                </Route>
                <Route path={`/tickets/:id`}>
                    <ViewContainer />
                </Route>
                <Route path={'*'}>
                    <NotFound />
                </Route>
            </Routes>
        </>
    );
};
