import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userActions } from '../../_actions';
import { useHistory } from 'react-router-dom';
import { TailSpin } from 'svg-loaders-react';

export const PrivateRoute = ({ children, ...props }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [authenticating, setAuthenticating] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const authentication = useSelector(state => state.authentication);

    useEffect(() => {
        console.log('authentication:');
        console.dir(authentication);

        let user = localStorage.getItem("user");

        if (!user) {
            setAuthenticated(false);
            setAuthenticating(false);

            // Invalidate user
            dispatch(userActions.logout());
            history.push('/sign_in');
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
        authentication.loggingIn ?
            <TailSpin /> :
            (
                <Route
                    {...props}
                    render={({ location }) =>
                        authentication.loggedIn ? (
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