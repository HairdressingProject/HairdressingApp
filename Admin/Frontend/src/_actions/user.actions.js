import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { createAction } from '@reduxjs/toolkit';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, GETALL_SUCCESS, GETALL_FAILURE, GETALL_REQUEST } = userConstants;

/**
 * This object lists users-related actions
 * @var {Object} userActions
 */
export const userActions = {
    login,
    logout,
    getAll
};

const loginRequest = createAction(LOGIN_REQUEST);
const loginSuccess = createAction(LOGIN_SUCCESS);
const loginFailure = createAction(LOGIN_FAILURE);
const logoutAction = createAction(LOGOUT);

/**
 * Dispatches login-related actions asynchronously to trigger state changes. Redirects to "/" if login is successful.
 * @see {@link https://github.com/reduxjs/redux-thunk#motivation|Redux Thunk}
 * @function login
 * @param {string} username 
 * @param {string} password 
 * @returns {Function} dispatch 
 */
function login(username, password) {
    return dispatch => {
        dispatch(loginRequest({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(loginSuccess({ user }));
                    history.push('/');
                },
                error => {
                    dispatch(loginFailure({ error }));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

/**
 * Issues a logout action
 * @function logout
 * @returns {ActionCreatorWithPayload} logoutAction
 */
function logout() {
    userService.logout();
    return logoutAction();
}

const getAllRequest = createAction(GETALL_REQUEST);
const getAllSuccess = createAction(GETALL_SUCCESS);
const getAllFailure = createAction(GETALL_FAILURE);

/**
 * Dispatches and handles actions related to fetching all users from the backend
 * @function getAll
 * @returns {Function} dispatch
 */
function getAll() {
    return dispatch => {
        dispatch(getAllRequest());

        userService.getAll()
            .then(
                users => dispatch(getAllSuccess({ users })),
                error => dispatch(getAllFailure({ error }))
            );
    };
}