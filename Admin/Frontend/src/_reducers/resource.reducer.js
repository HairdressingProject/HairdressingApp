import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { resourceNames } from '../_constants';
const cloneDeep = require('lodash.clonedeep');

/**
 * @function generateReducer
 */

function generateReducer(resourceName) {
    return createReducer({}, {
        // GETALL
        [`${resourceName}_GETALL_REQUEST`]: (state, action) => {
            return ({
                loading: true
            })
        },
        [`${resourceName}_GETALL_SUCCESS`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                items: action.payload.resource
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
                item: action.payload.resource
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
                item: action.payload.resource
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
                item: action.payload.resource
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
                item: action.payload.resource
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
};

export const resourcesReducer = combineReducers({
    colours: generateReducer(resourceNames.COLOURS),
    faceShapes: generateReducer(resourceNames.FACE_SHAPES),
    faceShapeLinks: generateReducer(resourceNames.FACE_SHAPE_LINKS),
    hairLengths: generateReducer(resourceNames.HAIR_LENGTHS),
    hairLengthLinks: generateReducer(resourceNames.HAIR_LENGTH_LINKS),
    hairStyles: generateReducer(resourceNames.HAIR_STYLES),
    hairStyleLinks: generateReducer(resourceNames.HAIR_STYLE_LINKS),
    skinTones: generateReducer(resourceNames.SKIN_TONE_LINKS),
    userFeatures: generateReducer(resourceNames.USER_FEATURES)
});