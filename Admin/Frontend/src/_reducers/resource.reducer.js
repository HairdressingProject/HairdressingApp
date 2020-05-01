import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { resourceNames } from '../_constants';
const cloneDeep = require('lodash.clonedeep');

/**
 * @function generateReducer - Creates a custom reducer containing all API actions based on a resourceName
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName - Name of the resource to be adopted in the actions
 * @returns {Reducer} reducer
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
        [`${resourceName}_GETALL_FAILURE`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                error: action.payload.error
            })
        },

        // GET
        [`${resourceName}_GET_REQUEST`]: (state, action) => {
            return ({
                loading: true
            })
        },
        [`${resourceName}_GET_SUCCESS`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                item: action.payload.resource
            })
        },
        [`${resourceName}_GET_FAILURE`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                error: action.payload.error
            })
        },

        // POST
        [`${resourceName}_POST_REQUEST`]: (state, action) => {
            return ({
                loading: true
            })
        },
        [`${resourceName}_POST_SUCCESS`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                item: action.payload.resource
            })
        },
        [`${resourceName}_POST_FAILURE`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                error: action.payload.error
            })
        },

        // PUT
        [`${resourceName}_PUT_REQUEST`]: (state, action) => {
            return ({
                loading: true
            })
        },
        [`${resourceName}_PUT_SUCCESS`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                item: action.payload.resource
            })
        },
        [`${resourceName}_PUT_FAILURE`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                error: action.payload.error
            })
        },

        // DELETE
        [`${resourceName}_DELETE_REQUEST`]: (state, action) => {
            return ({
                loading: true
            })
        },
        [`${resourceName}_DELETE_SUCCESS`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                item: action.payload.resource
            })
        },
        [`${resourceName}_DELETE_FAILURE`]: (state, action) => {
            return ({
                ...cloneDeep(state),
                loading: false,
                error: action.payload.error
            })
        }
    });
};

export const resourcesReducer = combineReducers({
    users: generateReducer(resourceNames.USERS),
    colours: generateReducer(resourceNames.COLOURS),
    faceShapes: generateReducer(resourceNames.FACE_SHAPES),
    faceShapeLinks: generateReducer(resourceNames.FACE_SHAPE_LINKS),
    hairLengths: generateReducer(resourceNames.HAIR_LENGTHS),
    hairLengthLinks: generateReducer(resourceNames.HAIR_LENGTH_LINKS),
    hairStyles: generateReducer(resourceNames.HAIR_STYLES),
    hairStyleLinks: generateReducer(resourceNames.HAIR_STYLE_LINKS),
    skinTones: generateReducer(resourceNames.SKIN_TONES),
    skinToneLinks: generateReducer(resourceNames.SKIN_TONE_LINKS),
    userFeatures: generateReducer(resourceNames.USER_FEATURES)
});