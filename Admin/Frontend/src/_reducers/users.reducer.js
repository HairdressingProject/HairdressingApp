import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * Creates a "root" reducer that handles fetching all users
 * @type {Object}
 */
export const usersReducer = createReducer({}, {
  CHANGE_ROLE_REQUEST: (state, action) => {
    return ({
      ...cloneDeep(state),
      updatedUser: action.payload.updatedUser
    })
  },

  CHANGE_ROLE_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      updatedUser: action.payload.updatedUser
    })
  },

  CHANGE_ROLE_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      errors: action.payload.errors
    })
  },

  GETALL_REQUEST: (state, action) => {
    return ({
      loading: true
    })
  },
  GETALL_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      items: action.payload.users
    })
  },
  GETALL_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      error: action.payload.error
    })
  },

  FORGOT_PASSWORD_REQUEST: (state, action) => {
    return ({
      ...cloneDeep(state),
      forgotPasswordData: null,
      forgotPasswordErrors: null,
      requestingRecoverPassword: true,
      processedRecoverPassword: false
    })
  },

  FORGOT_PASSWORD_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      forgotPasswordData: action.payload.forgotPasswordData,
      forgotPasswordErrors: null,
      requestingRecoverPassword: false,
      processedRecoverPassword: true
    })
  },

  FORGOT_PASSWORD_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      forgotPasswordData: null,
      forgotPasswordErrors: action.payload.forgotPasswordErrors,
      requestingRecoverPassword: false,
      processedRecoverPassword: true
    })
  },
});