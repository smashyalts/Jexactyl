import React, { lazy } from 'react';
import { useStoreState } from '@/state/hooks';
import { ServerContext } from '@/state/server';
import { history } from '@/components/history';
import Spinner from '@/components/elements/Spinner';
import { Router, Switch, Route } from 'react-router';
import AdminRoute from '@/components/elements/AdminRoute';
import { NotApproved, NotFound } from '@/components/elements/ScreenBlock';
import AuthenticatedRoute from '@/components/elements/AuthenticatedRoute';

const AdminRouter = lazy(() => import(/* webpackChunkName: "admin" */ '@/routers/AdminRouter'));
const StoreRouter = lazy(() => import(/* webpackChunkName: "store" */ '@/routers/StoreRouter'));
const TicketRouter = lazy(() => import(/* webpackChunkName: "ticket" */ '@/routers/TicketRouter'));
const ServerRouter = lazy(() => import(/* webpackChunkName: "server" */ '@/routers/ServerRouter'));
const DashboardRouter = lazy(() => import(/* webpackChunkName: "dashboard" */ '@/routers/DashboardRouter'));
const AuthenticationRouter = lazy(() => import(/* webpackChunkName: "auth" */ '@/routers/AuthenticationRouter'));

export default () => {
    const store = useStoreState((state) => state.storefront.data!);
    const authenticated = useStoreState((state) => state.user?.data);
    const approved = useStoreState((state) => state.user.data?.approved);
    const approvals = useStoreState((state) => state.settings.data!.approvals);

    if (approvals && !approved && authenticated) {
        return (
            <NotApproved
                title={'Awaiting Approval'}
                message={'Your account is currently pending approval from an administator.'}
            />
        );
    }

    return (
        <Router history={history}>
            <Switch>
                <Route path={'/auth'}>
                    <Spinner.Suspense>
                        <AuthenticationRouter />
                    </Spinner.Suspense>
                </Route>
                <AdminRoute path={'/admin'}>
                    <Spinner.Suspense>
                        <AdminRouter />
                    </Spinner.Suspense>
                </AdminRoute>
                <AuthenticatedRoute path={'/server/:id'}>
                    <Spinner.Suspense>
                        <ServerContext.Provider>
                            <ServerRouter />
                        </ServerContext.Provider>
                    </Spinner.Suspense>
                </AuthenticatedRoute>
                {store.enabled && (
                    <AuthenticatedRoute path={'/store'}>
                        <Spinner.Suspense>
                            <StoreRouter />
                        </Spinner.Suspense>
                    </AuthenticatedRoute>
                )}
                <AuthenticatedRoute path={'/tickets'}>
                    <Spinner.Suspense>
                        <TicketRouter />
                    </Spinner.Suspense>
                </AuthenticatedRoute>
                <AuthenticatedRoute path={'/'}>
                    <Spinner.Suspense>
                        <DashboardRouter />
                    </Spinner.Suspense>
                </AuthenticatedRoute>
                <Route path={'*'} component={NotFound} />
            </Switch>
        </Router>
    );
};
