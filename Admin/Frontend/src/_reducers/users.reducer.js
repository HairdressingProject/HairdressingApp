import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * @var {Object} usersReducer - Creates a "root" reducer that handles fetching all users
 */
export const usersReducer = createReducer({}, {
  GETALL_REQUEST: (state, action) => {
    return ({
      loading: true
    })
  },
  GETALL_SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      items: action.users
    })
  },
  GETALL_FAILURE: (state, action) => {
    return ({
      ...cloneDeep(state),
      error: action.error
    })
  }
});