import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication.reducer';
import { usersReducer } from './users.reducer';
import { alertReducer } from './alert.reducer';
import { resourceReducer } from './resource.reducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  alert: alertReducer,
  resource: resourceReducer
});

export default rootReducer;