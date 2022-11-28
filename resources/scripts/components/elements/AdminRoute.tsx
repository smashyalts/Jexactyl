import React from 'react';
import { useStoreState } from '@/state/hooks';
import { Redirect, Route, RouteProps } from 'react-router';

export default ({ children, ...props }: Omit<RouteProps, 'render'>) => {
    const isAdmin = useStoreState((state) => !!state.user.data?.rootAdmin);

    return (
        <Route
            {...props}
            render={({ location }) =>
                isAdmin ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
            }
        />
    );
};
