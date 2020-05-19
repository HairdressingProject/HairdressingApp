import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userActions, errorMessageAction } from '../../_actions';

export const PrivateRoute = ({ children, ...props }) => {
    const [authenticating, setAuthenticating] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const dispatch = useDispatch();
    const authentication = useSelector(state => state.authentication);

    useEffect(() => {
        let user = localStorage.getItem("user");

        if (!user) {
            setAuthenticated(false);
            setAuthenticating(false);

            // Invalidate user
            dispatch(userActions.logout());
            return;
        }

        if (authentication.loggedIn) {
            setAuthenticated(true);
            setAuthenticating(false);
            return;
        }
    }, []);

    useEffect(() => {
        if (authentication.loggingIn) {
            setAuthenticating(true)
        }
        else {
            if (authentication.loggedIn) {
                setAuthenticated(true);
            }
            else {
                setAuthenticated(false);
            }
            setAuthenticating(false);
        }
    }, [authentication]);

    return (
        // TODO: Show loading spinner if authenticating
        authenticating ?
            <h1>Loading...</h1> :
            (
                <Route
                    {...props}
                    render={({ location }) =>
                        authenticated ? (
                            children
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: '/sign_in',
                                        state: { from: location }
                                    }}
                                />
                            )}
                />
            )
    )
}