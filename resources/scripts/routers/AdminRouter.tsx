import React from 'react';
import TransitionRouter from '@/TransitionRouter';
import Overview from '@/components/admin/Overview';
import { Redirect, useLocation } from 'react-router';
import { NotFound } from '@/components/elements/ScreenBlock';
import SidePanel from '@/components/admin/elements/SidePanel';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import SettingsContainer from '@/components/admin/settings/SettingsContainer';

export default () => {
    const location = useLocation();
    const { path } = useRouteMatch<{ id: string }>();

    return (
        <>
            <SidePanel />
            <TransitionRouter>
                <Switch location={location}>
                    <Route path={`${path}/overview`}>
                        <Overview />
                    </Route>
                    <Route path={`${path}/settings`}>
                        <SettingsContainer />
                    </Route>
                    <Route path={path} exact>
                        <Redirect to={`${path}/overview`} />
                    </Route>
                    <Route path={'*'}>
                        <NotFound />
                    </Route>
                </Switch>
            </TransitionRouter>
        </>
    );
};
