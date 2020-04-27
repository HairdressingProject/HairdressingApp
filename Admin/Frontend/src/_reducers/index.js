import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users,
  alert
});

export default rootReducer;