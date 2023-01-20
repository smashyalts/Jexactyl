import React from 'react';
import { Route, Routes } from 'react-router';
import { useStoreState } from '@/state/hooks';
import { ServerContext } from '@/state/server';
import StoreRouter from '@/routers/StoreRouter';
import { BrowserRouter } from 'react-router-dom';
import TicketRouter from '@/routers/TicketRouter';
import ServerRouter from '@/routers/ServerRouter';
import Spinner from '@/components/elements/Spinner';
import DashboardRouter from '@/routers/DashboardRouter';
import AuthenticationRouter from '@/routers/AuthenticationRouter';
import { NotApproved, NotFound } from '@/components/elements/ScreenBlock';
import AuthenticatedRoute from '@/components/elements/AuthenticatedRoute';

export default () => {
    const authenticated = useStoreState((state) => state.user?.data);
    const approved = useStoreState((state) => state.user.data?.approved);
    const store = useStoreState((state) => state.storefront.data!.enabled);
    const tickets = useStoreState((state) => state.settings.data!.tickets);
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
        <BrowserRouter>
            <Routes>
                <Route
                    path={'/auth/*'}
                    element={
                        <Spinner.Suspense>
                            <AuthenticationRouter />
                        </Spinner.Suspense>
                    }
                />
                <Route
                    path={'/server/:id'}
                    element={
                        <AuthenticatedRoute>
                            <Spinner.Suspense>
                                <ServerContext.Provider>
                                    <ServerRouter />
                                </ServerContext.Provider>
                            </Spinner.Suspense>
                        </AuthenticatedRoute>
                    }
                />
                {store && (
                    <Route
                        path={'/store/*'}
                        element={
                            <AuthenticatedRoute>
                                <Spinner.Suspense>
                                    <StoreRouter />
                                </Spinner.Suspense>
                            </AuthenticatedRoute>
                        }
                    />
                )}
                {tickets && (
                    <Route
                        path={'/tickets/*'}
                        element={
                            <AuthenticatedRoute>
                                <Spinner.Suspense>
                                    <TicketRouter />
                                </Spinner.Suspense>
                            </AuthenticatedRoute>
                        }
                    />
                )}
                <Route
                    path={'/*'}
                    element={
                        <AuthenticatedRoute>
                            <Spinner.Suspense>
                                <DashboardRouter />
                            </Spinner.Suspense>
                        </AuthenticatedRoute>
                    }
                />
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
