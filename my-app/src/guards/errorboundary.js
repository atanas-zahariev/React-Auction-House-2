import React from 'react';
import Spinner from '../components/common/Spiner';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, redirect: false };
    }

    static defaultProps = {
        fallback: <h1>Something went wrong.</h1>,
    };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true }), 2000);
        }
    }

    render() {
        if (this.state.redirect) {
            return window.location.reload();;
        }
        if (this.state.hasError) {
            localStorage.clear();
            return (
                <>
                    <h1>It seems to be a problem please waith 2 seconds and login again.</h1>
                    <Spinner />
                </>
            );
        }

        return this.props.children;
    }
}

