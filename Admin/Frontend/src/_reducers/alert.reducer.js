import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * @var {Object} usersReducer - Creates a "root" reducer that logs messages sent from the backend
 */
export const alertReducer = createReducer({}, {
  SUCCESS: (state, action) => {
    return ({
      ...cloneDeep(state),
      type: 'alert-success',
      message: action.message
    })
  },
  ERROR: (state, action) => {
    return ({
      ...cloneDeep(state),
      type: 'alert-danger',
      message: action.message
    })
  },
  CLEAR: (state, action) => {
    return ({});
  }
});