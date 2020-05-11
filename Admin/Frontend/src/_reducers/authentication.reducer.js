import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * The user information stored in the browser through localStorage, if available
 * @type {Object | null}
 */
let user = JSON.parse(localStorage.getItem('user'));

/**
 * The initial state provided for authentication reducers
 * @type {Object}
 */
const initialState = user ? { loggedIn: true, user } : {};

/**
 * This function is the entry point of all reducers related to authentication, i.e. those that are triggered by actions such as LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE and LOGOUT
 * @see {@link https://redux-toolkit.js.org/usage/usage-guide#simplifying-reducers-with-createreducer|Redux Toolkit Docs}
 * @function authenticationReducer
 * @param {Object} initialState - The initial state to feed into each reducer
 * @returns {function} authenticationRootReducer
 */
export const authenticationReducer = createReducer(initialState, {
  LOGIN_REQUEST: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: null,
      signInError: null,
      loggingIn: true,
      loggedIn: false,
      user: null
    })
  },

  LOGIN_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: action.payload.user.token,
      signInError: null,
      loggingIn: false,
      loggedIn: true,
      user: action.payload.user
    })
  },

  LOGIN_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: null,
      signInError: action.payload.error,
      loggingIn: false,
      loggedIn: false
    });
  },

  AUTHENTICATE_REQUEST: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: null,
      loggingIn: true,
      loggedIn: false,
      errors: null,
    });
  },

  AUTHENTICATE_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: action.payload.token,
      loggingIn: false,
      loggedIn: true,
      errors: null
    });
  },

  AUTHENTICATE_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: null,
      loggedIn: false,
      loggingIn: false,
      errors: action.payload.errors
    });
  },

  LOGOUT: (state, action) => {
    return ({
      ...cloneDeep(state),
      token: null,
      user: null,
      errors: null,
      signInError: null,
      loggedIn: false,
      loggingIn: false
    });
  }
});