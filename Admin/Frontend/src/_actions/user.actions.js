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
    signUp,
    changeUserRole,
    getAll,
    forgotPassword,
    setNewPassword
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
                    // dispatch(errorMessageAction({ message: error }));
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

const signUpRequest = createAction('SIGNUP_REQUEST');
const signUpSuccess = createAction('SIGNUP_SUCCESS');
const signUpFailure = createAction('SIGNUP_FAILURE');

/**
 * Dispatches actions to register a new user
 * @function signUp
 * @param {Object} user - User object to be send in the request body
 * @param {string} URL - URL of the request
 */
function signUp(user, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(signUpRequest());

        // basic checks to avoid submitting HTTP requests unnecessarily
        if (!user || !user.FirstName || !user.UserEmail || !user.UserPassword) {
            return dispatch(signUpFailure({ errors: ['Invalid user'] }));
        }

        userService.signUp(user, URL)
            .then(
                newUser => {
                    dispatch(signUpSuccess({ newUser }));
                    history.push('/');
                },
                errors => {
                    dispatch(signUpFailure({ errors }));
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

const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUEST');
const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS');
const forgotPasswordFailure = createAction('FORGOT_PASSWORD_FAILURE');

/**
 * Dispatches actions to begin the process of recovering a user's password
 * @function forgotPassword
 * @param {string} usernameOrEmail - Registered username/email
 * @param {string} URL - Request URL (defaults to "https://localhost:5000")
 */
function forgotPassword(usernameOrEmail, URL = `https://localhost:5000`) {
    return dispatch => {
        if (!usernameOrEmail || !usernameOrEmail.trim()) {
            return dispatch(forgotPasswordFailure(
                {
                    forgotPasswordErrors: {
                        UsernameOrEmail: ['Please enter a valid username/email']
                    }
                }));
        }
        dispatch(forgotPasswordRequest({ usernameOrEmail }));

        userService.forgotPassword(usernameOrEmail, URL)
            .then(
                data => dispatch(forgotPasswordSuccess({ forgotPasswordData: data })),
                forgotPasswordErrors => dispatch(forgotPasswordFailure({ forgotPasswordErrors }))
            );
    }
}

const setNewPasswordRequest = createAction('SET_NEW_PASSWORD_REQUEST');
const setNewPasswordSuccess = createAction('SET_NEW_PASSWORD_SUCCESS');
const setNewPasswordFailure = createAction('SET_NEW_PASSWORD_FAILURE');

function setNewPassword(userNameOrEmail, password, token, URL = `https://localhost:5000`) {
    return dispatch => {
        if (
            !userNameOrEmail ||
            !userNameOrEmail.trim() ||
            !password ||
            !password.trim()
        ) {
            return dispatch(setNewPasswordFailure({
                setNewPasswordErrors: {
                    Fields: ['Invalid username, email or password']
                }
            }));
        }

        if (
            !token ||
            !token.trim() ||
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(token)
        ) {
            return dispatch(setNewPasswordFailure({
                setNewPasswordErrors: {
                    Token: ['Invalid token format']
                }
            }));
        }

        dispatch(setNewPasswordRequest());

        userService.setNewPassword(userNameOrEmail, password, token, URL)
            .then(
                () => dispatch(setNewPasswordSuccess()),
                setNewPasswordErrors => dispatch(setNewPasswordFailure({ setNewPasswordErrors }))
            );
    }
}