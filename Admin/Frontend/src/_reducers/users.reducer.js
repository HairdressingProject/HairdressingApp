import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

const obj = {
  name: 'diego',
  address: {
    street: "23 fictional st.",
    postcode: 6001
  }
};

/**
 * @var {Object} usersReducer - Creates a "root" reducer that handles fetching all users
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
  }
});