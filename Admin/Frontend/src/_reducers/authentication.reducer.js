import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * The user information stored in the browser through localStorage, if available
 * @var {Object || null} user
 */
let user = JSON.parse(localStorage.getItem('user'));

/**
 * The initial state provided for authentication reducers
 * @var {Object} initialState
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
      loggingIn: true,
      user: action.user
    })
  },

  LOGIN_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      loggingIn: true,
      user: action.user
    })
  },

  LOGIN_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      error: action.payload.error
    });
  },

  LOGOUT: (state, action) => {
    return ({});
  }
});