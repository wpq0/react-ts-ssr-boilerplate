import * as React from 'react';

export default class DefaultErrorBoundary extends React.Component<{
    children: any;
}> {
    public static getDerivedStateFromError() {
        return { isError: true };
    }

    public state = {
        isError: false,
    };

    public render() {
        const { isError } = this.state;
        const { children } = this.props;
        return isError ? <div>ERROR</div> : children;
    }
}
