import { userService } from '../_services';
import { history } from '../_helpers';
import { createAction } from '@reduxjs/toolkit';
import { errorMessageAction, successMessageAction, clearMessageAction } from './alerts.actions'

/**
 * This object lists users-related actions
 * @type {Object}
 */
export const userActions = {
    login,
    logout,
    changeUserRole,
    getAll
};

const loginRequest = createAction('LOGIN_REQUEST');
const loginSuccess = createAction('LOGIN_SUCCESS');
const loginFailure = createAction('LOGIN_FAILURE');

/**
 * Dispatches login-related actions asynchronously to trigger state changes. Redirects to "/" if login is successful.
 * @see {@link https://github.com/reduxjs/redux-thunk#motivation|Redux Thunk}
 * @function login
 * @param {string} username 
 * @param {string} password 
 * @param {string} URL - Optional request URL (defaults to "https://localhost:5000")
 * @returns {Function} dispatch 
 */
function login(usernameOrEmail, password, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(loginRequest({ usernameOrEmail }));

        userService.login(usernameOrEmail, password, URL)
            .then(
                user => {
                    dispatch(loginSuccess({ user }));
                    history.push('/');
                },
                error => {
                    dispatch(loginFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            );
    };
}

const logoutRequest = createAction('LOGOUT_REQUEST');
const logoutSuccess = createAction('LOGOUT_SUCCESS');
const logoutFailure = createAction('LOGOUT_FAILURE');

/**
 * Issues a logout action
 * @function logout
 * @param {string} URL - Request URL
 * @returns {ActionCreatorWithPayload} logoutAction
 */
function logout(URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(logoutRequest());

        userService.logout(URL)
            .then(
                data => {
                    dispatch(logoutSuccess({ data }));
                },
                errors => {
                    dispatch(logoutFailure({ errors }));
                }
            )
    }
}

const changeUserRoleRequest = createAction("CHANGE_ROLE_REQUEST");
const changeUserRoleSuccess = createAction("CHANGE_ROLE_SUCCESS");
const changeUserRoleFailure = createAction("CHANGE_ROLE_FAILURE");

/**
 * Dispatches actions to handle changing a user's role
 * @function changeUserRole
 * @param {Object} updatedUser - User with all required fields and updated UserRole
 * @param {string} URL - Optional request URL (defaults to "https://localhost:5000")
 */
function changeUserRole(updatedUser, URL = `https://localhost:5000`) {

    return dispatch => {
        if (!updatedUser) {
            dispatch(errorMessageAction({ message: "Error: Invalid user" }));
            dispatch(changeUserRoleFailure({ error: "Invalid user to change role" }));
        }

        dispatch(clearMessageAction());
        dispatch(changeUserRoleRequest({ updatedUser }));

        userService.changeUserRole(updatedUser, URL)
            .then(
                data => {
                    dispatch(changeUserRoleSuccess({ updatedUser: data.updatedUser }));
                },
                errors => {
                    dispatch(changeUserRoleFailure({ errors }))
                }
            )
    }
}

const getAllRequest = createAction('GETALL_REQUEST');
const getAllSuccess = createAction('GETALL_SUCCESS');
const getAllFailure = createAction('GETALL_FAILURE');

/**
 * Dispatches and handles actions related to fetching all users from the backend
 * @function getAll
 * @param {string} URL - Request URL (defaults to "https://localhost:5000")
 * @returns {Function} dispatch
 */
function getAll(URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(getAllRequest());

        userService.getAll(URL)
            .then(
                users => dispatch(getAllSuccess({ users })),
                error => dispatch(getAllFailure({ error }))
            );
    };
}