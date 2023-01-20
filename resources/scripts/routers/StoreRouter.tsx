import React from 'react';
import * as Icon from 'react-feather';
import SidePanel from '@/components/elements/SidePanel';
import { NavLink, Route, Routes } from 'react-router-dom';
import { NotFound } from '@/components/elements/ScreenBlock';
import SubNavigation from '@/components/elements/SubNavigation';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import CreateContainer from '@/components/store/CreateContainer';
import PurchaseContainer from '@/components/store/PurchaseContainer';
import OverviewContainer from '@/components/store/OverviewContainer';
import MobileNavigation from '@/components/elements/MobileNavigation';
import ResourcesContainer from '@/components/store/ResourcesContainer';

export default () => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            <SubNavigation className={'j-down'}>
                <div>
                    <NavLink to={`/store`}>
                        <div className={'flex items-center justify-between'}>
                            Store <Icon.ShoppingCart className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to={`/store/resources`}>
                        <div className={'flex items-center justify-between'}>
                            Resources <Icon.Cpu className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to={`/store/credits`}>
                        <div className={'flex items-center justify-between'}>
                            Balance <Icon.DollarSign className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                    <NavLink to={`/store/create`}>
                        <div className={'flex items-center justify-between'}>
                            Create Server <Icon.Server className={'ml-1'} size={18} />
                        </div>
                    </NavLink>
                </div>
            </SubNavigation>
            <Routes>
                <Route path={`/store`}>
                    <OverviewContainer />
                </Route>
                <Route path={`/store/credits`}>
                    <PurchaseContainer />
                </Route>
                <Route path={`/store/resources`}>
                    <ResourcesContainer />
                </Route>
                <Route path={`/store/create`}>
                    <CreateContainer />
                </Route>
                <Route path={'*'}>
                    <NotFound />
                </Route>
            </Routes>
        </>
    );
};
