import React from 'react';

import * as Icon from 'react-feather';

interface State {
    hasError: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
class ErrorBoundary extends React.Component<{}, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error(error);
    }

    render() {
        return this.state.hasError ? (
            <div className={`flex items-center justify-center w-full my-4`}>
                <div className={`flex items-center bg-neutral-900 rounded p-3 text-red-500`}>
                    <Icon.AlertTriangle className={`h-4 w-auto mr-2`} />
                    <p className={`text-sm text-neutral-100`}>An error was encountered while rendering this page.</p>
                </div>
            </div>
        ) : (
            this.props.children
        );
    }
}

export default ErrorBoundary;
