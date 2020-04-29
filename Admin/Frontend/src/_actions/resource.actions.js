import { createAction } from '@reduxjs/toolkit';
import { resourceServices } from '../_services/resource.service';
import { errorMessageAction } from '../_actions'
import { resourceNames } from '../_constants';

export const resourceActions = {
    getAll,
    get,
    post,
    put,
    deleteResource
};

function getAllActionGenerator(resourceName) {
    return ({
        getAllRequest: createAction(`${resourceName}_GETALL_REQUEST`),
        getAllSuccess: createAction(`${resourceName}_GETALL_SUCCESS`),
        getAllFailure: createAction(`${resourceName}_GETALL_FAILURE`)
    });
};

/**
 * @function getAll
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName 
 */
function getAll(resourceName, URL = `https://localhost:5000`) {
    return dispatch => {
        const {
            getAllRequest,
            getAllSuccess,
            getAllFailure
        } = getAllActionGenerator(resourceName);

        dispatch(getAllRequest());

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

function getActionGenerator(resourceName) {
    return ({
        getRequest: createAction(`${resourceName}_GET_REQUEST`),
        getSuccess: createAction(`${resourceName}_GET_SUCCESS`),
        getFailure: createAction(`${resourceName}_GET_FAILURE`)
    });
};

/**
 * @function get
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 */
function get(resourceName, id, URL = `https://localhost:5000`) {
    return dispatch => {
        const {
            getRequest,
            getSuccess,
            getFailure
        } = getActionGenerator(resourceName);

        dispatch(getRequest());

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

function postActionGenerator(resourceName) {
    return ({
        postRequest: createAction(`${resourceName}_POST_REQUEST`),
        postSuccess: createAction(`${resourceName}_POST_SUCCESS`),
        postFailure: createAction(`${resourceName}_POST_FAILURE`)
    });
};

/**
 * @function post
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {Object} resource
 */
function post(resourceName, resource, URL = `https://localhost:5000`) {
    return dispatch => {
        const {
            postRequest,
            postSuccess,
            postFailure
        } = postActionGenerator(resourceName);

        dispatch(postRequest());

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

function putActionGenerator(resourceName) {
    return ({
        putRequest: createAction(`${resourceName}_PUT_REQUEST`),
        putSuccess: createAction(`${resourceName}_PUT_SUCCESS`),
        putFailure: createAction(`${resourceName}_PUT_FAILURE`)
    });
};

/**
 * @function put
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 * @param {Object} resource
 */
function put(resourceName, id, resource, URL = `https://localhost:5000`) {
    return dispatch => {
        const {
            putRequest,
            putSuccess,
            putFailure
        } = putActionGenerator(resourceName);

        dispatch(putRequest());

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

function deleteActionGenerator(resourceName) {
    return ({
        deleteRequest: createAction(`${resourceName}_DELETE_REQUEST`),
        deleteSuccess: createAction(`${resourceName}_DELETE_SUCCESS`),
        deleteFailure: createAction(`${resourceName}_DELETE_FAILURE`)
    });
}

/**
 * @function deleteResource
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id
 */
function deleteResource(resourceName, id, URL = `https://localhost:5000`) {
    return dispatch => {
        const {
            deleteRequest,
            deleteSuccess,
            deleteFailure
        } = deleteActionGenerator(resourceName);

        dispatch(deleteRequest());

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