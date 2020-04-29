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
function getAll(resourceName, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(getAllRequest(resourceName));

        resourceServices.getAll(resourceName, URL)
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
function get(resourceName, id, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(getRequest(resourceName));

        resourceServices.get(resourceName, id, URL)
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
function post(resourceName, resource, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(postRequest(resourceName));

        resourceServices.post(resourceName, resource, URL)
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
function put(resourceName, id, resource, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(putRequest(resourceName));

        resourceServices.put(resourceName, id, resource, URL)
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
function deleteResource(resourceName, id, URL = `https://localhost:5000`) {
    return dispatch => {
        dispatch(deleteRequest(resourceName));

        resourceServices.deleteResource(resourceName, id, URL)
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