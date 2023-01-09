import {Component, useEffect, useState} from "react";
import c from './ErrorBoundary.module.css';
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router";

function ErrorBoundaryFunc({children}) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [location.key]);
    return (
        /**
         * NEW: The class component error boundary is now
         *      a child of the functional component.
         */
        <ErrorBoundary
            hasError={hasError}
            setHasError={setHasError}
        >
            {children}
        </ErrorBoundary>
    );
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidUpdate(prevProps, _previousState) {
        if(!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(error, errorInfo) {
        this.props.setHasError(true);
        console.log(error, errorInfo);
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className={c.errorBoundary}>
                    <div className={c.errorMessage}>Something went wrong...</div>
                    <NavLink className={c.homeLink} to="/home" >&lt; Go back home</NavLink>
                </div>
            )
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundaryFunc