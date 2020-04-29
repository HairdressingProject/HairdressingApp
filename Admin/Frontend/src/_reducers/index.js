import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication.reducer';
import { usersReducer } from './users.reducer';
import { alertReducer } from './alert.reducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  alert: alertReducer
});

export default rootReducer;