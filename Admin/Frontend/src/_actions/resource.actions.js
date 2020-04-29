import { createAction } from '@reduxjs/toolkit';
import { resourceServices } from '../_services/resource.service';
import { errorMessageAction } from '../_actions'

export const resourceActions = {
    getAll,
    get,
    post,
    put,
    deleteResource
};

const getAllRequest = createAction('GETALL_REQUEST');
const getAllSuccess = createAction('GETALL_SUCCESS');
const getAllFailure = createAction('GETALL_FAILURE');

/**
 * @function getAll
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName 
 */
function getAll(resourceName) {
    return dispatch => {
        dispatch(getAllRequest(resourceName));

        resourceServices.getAll(resourceName)
            .then(
                resource => {
                    dispatch(getAllSuccess({ resource }));
                },
                error => {
                    dispatch(getAllFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            )
    }
}

const getRequest = createAction('GET_REQUEST');
const getSuccess = createAction('GET_SUCCESS');
const getFailure = createAction('GET_FAILURE');

/**
 * @function get
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 */
function get(resourceName, id) {
    return dispatch => {
        dispatch(getRequest(resourceName));

        resourceServices.get(resourceName, id)
            .then(
                resource => {
                    dispatch(getSuccess({ resource }));
                },
                error => {
                    dispatch(getFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            )
    }
}

const postRequest = createAction('POST_REQUEST');
const postSuccess = createAction('POST_SUCCESS');
const postFailure = createAction('POST_FAILURE');

/**
 * @function post
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {Object} resource
 */
function post(resourceName, resource) {
    return dispatch => {
        dispatch(postRequest(resourceName));

        resourceServices.post(resourceName, resource)
            .then(
                resource => {
                    dispatch(postSuccess({ resource }));
                },
                error => {
                    dispatch(postFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            )
    }
}

const putRequest = createAction('PUT_REQUEST');
const putSuccess = createAction('PUT_SUCCESS');
const putFailure = createAction('PUT_FAILURE');

/**
 * @function put
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 * @param {Object} resource
 */
function put(resourceName, id, resource) {
    return dispatch => {
        dispatch(putRequest(resourceName));

        resourceServices.put(resourceName, id, resource)
            .then(
                resource => {
                    dispatch(putSuccess({ resource }));
                },
                error => {
                    dispatch(putFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            )
    }
}

const deleteRequest = createAction('DELETE_REQUEST');
const deleteSuccess = createAction('DELETE_SUCCESS');
const deleteFailure = createAction('DELETE_FAILURE');

/**
 * @function deleteResource
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 */
function deleteResource(resourceName, id) {
    return dispatch => {
        dispatch(deleteRequest(resourceName));

        resourceServices.deleteResource(resourceName, id)
            .then(
                resource => {
                    dispatch(deleteSuccess({ resource }));
                },
                error => {
                    dispatch(deleteFailure({ error }));
                    dispatch(errorMessageAction({ message: error }));
                }
            )
    }
}