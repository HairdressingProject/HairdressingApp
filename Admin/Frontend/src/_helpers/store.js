import { createStore, applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

/**
 * Entry point of the application's store. This function configures it with an optional preloadedState
 * @function configureAppStore
 * @param {Object} preloadedState - Initial state to feed into the store
 * @returns {Object} store
 * 
 */
export function configureAppStore(preloadedState = {}) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: [thunkMiddleware, loggerMiddleware, ...getDefaultMiddleware()]
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../_reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
}