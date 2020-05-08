import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { userActions } from '../../_actions';

export const PrivateRoute = ({ children, ...props }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const dispatch = useDispatch();
    const authentication = useSelector(state => state.authentication);

    useEffect(() => {
        let user = localStorage.getItem("user");

        if (user) {
            user = JSON.parse(user);

            if (user.token) {
                const { token } = user;
                return dispatch(userActions.authenticate(token));
            }
        }
        setAuthenticated(false);
    }, []);

    useEffect(() => {
        if (authentication.token && !authentication.errors) {
            setAuthenticated(true);
        }
    }, [authentication]);

    return (
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

}