import React from 'react';
import * as Icon from 'react-feather';
import { useStoreState } from 'easy-peasy';
import Spinner from '@/components/elements/Spinner';
import SidePanel from '@/components/elements/SidePanel';
import { NotFound } from '@/components/elements/ScreenBlock';
import SubNavigation from '@/components/elements/SubNavigation';
import useWindowDimensions from '@/plugins/useWindowDimensions';
import CouponContainer from '@/components/dashboard/CouponContainer';
import MobileNavigation from '@/components/elements/MobileNavigation';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import ReferralContainer from '@/components/dashboard/ReferralContainer';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import InformationContainer from '@/components/elements/InformationContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountSecurityContainer from '@/components/dashboard/AccountSecurityContainer';

export default () => {
    const location = useLocation();
    const { width } = useWindowDimensions();
    const coupons = useStoreState((state) => state.settings.data!.coupons);
    const referrals = useStoreState((state) => state.storefront.data!.referrals.enabled);

    return (
        <>
            {width >= 1280 ? <SidePanel /> : <MobileNavigation />}
            {location.pathname.startsWith('/account') ? (
                <SubNavigation className={'j-down'}>
                    <div>
                        <NavLink to={'/account'}>
                            <div className={`flex items-center justify-between`}>
                                Account <Icon.User className={`ml-1`} size={18} />
                            </div>
                        </NavLink>
                        <NavLink to={'/account/security'}>
                            <div className={`flex items-center justify-between`}>
                                Security <Icon.Key className={`ml-1`} size={18} />
                            </div>
                        </NavLink>
                        {referrals && (
                            <NavLink to={'/account/referrals'}>
                                <div className={`flex items-center justify-between`}>
                                    Referrals <Icon.DollarSign className={`ml-1`} size={18} />
                                </div>
                            </NavLink>
                        )}
                        <NavLink to={'/account/api'}>
                            <div className={`flex items-center justify-between`}>
                                API <Icon.Code className={`ml-1`} size={18} />
                            </div>
                        </NavLink>
                        <NavLink to={'/account/ssh'}>
                            <div className={`flex items-center justify-between`}>
                                SSH Keys <Icon.Terminal className={`ml-1`} size={18} />
                            </div>
                        </NavLink>
                        {coupons && (
                            <NavLink to={'/account/coupons'}>
                                <div className={'flex items-center justify-between'}>
                                    Coupons <Icon.DollarSign className={'ml-1'} size={18} />
                                </div>
                            </NavLink>
                        )}
                    </div>
                </SubNavigation>
            ) : (
                <SubNavigation className={'j-down lg:visible invisible'}>
                    <div>
                        <InformationContainer />
                    </div>
                </SubNavigation>
            )}
            <React.Suspense fallback={<Spinner centered />}>
                <Routes>
                    <Route path={'/'}>
                        <DashboardContainer />
                    </Route>
                    <Route path={'/account'}>
                        <AccountOverviewContainer />
                    </Route>
                    <Route path={'/account/security'}>
                        <AccountSecurityContainer />
                    </Route>
                    {referrals && (
                        <Route path={`/account/referrals`}>
                            <ReferralContainer />
                        </Route>
                    )}
                    <Route path={'/account/api'}>
                        <AccountApiContainer />
                    </Route>
                    <Route path={'/account/ssh'}>
                        <AccountSSHContainer />
                    </Route>
                    {coupons && (
                        <Route path={'/account/coupons'}>
                            <CouponContainer />
                        </Route>
                    )}
                    <Route path={'*'}>
                        <NotFound />
                    </Route>
                </Routes>
            </React.Suspense>
        </>
    );
};
