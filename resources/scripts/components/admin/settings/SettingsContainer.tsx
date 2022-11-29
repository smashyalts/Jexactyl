import React from 'react';
import * as Icon from 'react-feather';
import { Switch } from 'react-router-dom';
import { Route, useLocation } from 'react-router';
import GeneralSettings from '@/components/admin/settings/GeneralSettings';
import PageContentBlock from '@/components/admin/elements/PageContentBlock';
import { SubNavigation, SubNavigationLink } from '@/components/admin/elements/SubNavigation';

export default () => {
    const location = useLocation();

    return (
        <PageContentBlock title={'Settings'} description={'Manage Jexactyl settings.'}>
            <SubNavigation>
                <SubNavigationLink to={'/admin/settings'} name={'General'}>
                    <Icon.Box />
                </SubNavigationLink>
                <SubNavigationLink to={'/admin/settings/appearance'} name={'Appearance'}>
                    <Icon.Eye />
                </SubNavigationLink>
                <SubNavigationLink to={'/admin/settings/security'} name={'Security'}>
                    <Icon.Shield />
                </SubNavigationLink>
                <SubNavigationLink to={'/admin/settings/store'} name={'Storefront'}>
                    <Icon.ShoppingBag />
                </SubNavigationLink>
                <SubNavigationLink to={'/admin/settings/registration'} name={'Registration'}>
                    <Icon.UserPlus />
                </SubNavigationLink>
            </SubNavigation>
            <Switch location={location}>
                <Route path={'/admin/settings'} exact>
                    <GeneralSettings />
                </Route>
            </Switch>
        </PageContentBlock>
    );
};
