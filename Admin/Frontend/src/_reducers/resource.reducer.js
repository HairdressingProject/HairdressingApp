import { createReducer } from '@reduxjs/toolkit';
const cloneDeep = require('lodash.clonedeep');

/**
 * @var {Object} usersReducer - Creates a "root" reducer that handles all API actions for all kinds of resources, like FACE_SHAPES and HAIR_STYLES
 */
export const resourceReducer = createReducer({}, {
    // GETALL
    GETALL_REQUEST: (state, action) => {
        return ({
            loading: true
        })
    },
    GETALL_SUCCESS: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            items: action.payload
        })
    },
    GETALL_FAILURE: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            error: action.payload.error
        })
    },

    // GET
    GET_REQUEST: (state, action) => {
        return ({
            loading: true
        })
    },
    GET_SUCCESS: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            items: action.payload
        })
    },
    GET_FAILURE: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            error: action.payload.error
        })
    },

    // POST
    POST_REQUEST: (state, action) => {
        return ({
            loading: true
        })
    },
    POST_SUCCESS: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            item: action.payload
        })
    },
    POST_FAILURE: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            error: action.payload.error
        })
    },

    // PUT
    PUT_REQUEST: (state, action) => {
        return ({
            loading: true
        })
    },
    PUT_SUCCESS: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            item: action.payload
        })
    },
    PUT_FAILURE: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            error: action.payload.error
        })
    },

    // DELETE
    DELETE_REQUEST: (state, action) => {
        return ({
            loading: true
        })
    },
    DELETE_SUCCESS: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            item: action.payload
        })
    },
    DELETE_FAILURE: (state, action) => {
        return ({
            ...cloneDeep(state),
            loading: false,
            error: action.payload.error
        })
    }
});