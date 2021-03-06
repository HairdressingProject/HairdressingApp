import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication.reducer';
import { usersReducer } from './users.reducer';
import { alertReducer } from './alert.reducer';
import { resourcesReducer } from './resource.reducer';

/**
 * A combined reducer that maps the state of all elements to each reducer
 * @type {Object}
 */
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
  alert: alertReducer,
  resources: resourcesReducer
});

export default rootReducer;