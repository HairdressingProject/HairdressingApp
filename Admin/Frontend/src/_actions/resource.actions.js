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

/**
 * @function getActionGenerator - Creates all GETALL (get all resources of a kind) actions for a given resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 */
function getAllActionGenerator(resourceName) {
    return ({
        getAllRequest: createAction(`${resourceName}_GETALL_REQUEST`),
        getAllSuccess: createAction(`${resourceName}_GETALL_SUCCESS`),
        getAllFailure: createAction(`${resourceName}_GETALL_FAILURE`)
    });
};

/**
 * @function getAll - Dispatches actions to get all resources of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName 
 * @param {string | undefined} URL - An optional URL to be used in the request (defaults to "https://localhost:5000")
 * @param {string | undefined} token - Optional JWT token used for authentication (if not passed to the function, it will be searched in localStorage)
 */
function getAll(resourceName, URL = `https://localhost:5000`, token) {
    return dispatch => {
        const {
            getAllRequest,
            getAllSuccess,
            getAllFailure
        } = getAllActionGenerator(resourceName);

        if (!token) {
            // If no token was passed to the action, try to retrieve from localStorage
            const storedUserInfo = JSON.parse(localStorage.getItem('user'));

            if (!storedUserInfo || !storedUserInfo.token) {
                dispatch(errorMessageAction({ message: "Error: Invalid token" }));
                dispatch(getAllFailure({ error: "Invalid token" }));

                return;
            }

            token = storedUserInfo.token;
        }

        dispatch(getAllRequest());

        resourceServices.getAll(resourceName, URL, token)
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

/**
 * @function getActionGenerator - Creates all GET actions for a given resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 */
function getActionGenerator(resourceName) {
    return ({
        getRequest: createAction(`${resourceName}_GET_REQUEST`),
        getSuccess: createAction(`${resourceName}_GET_SUCCESS`),
        getFailure: createAction(`${resourceName}_GET_FAILURE`)
    });
};

/**
 * @function get - Dispatches actions to GET a single resource of type resourceName with a given id 
 * @see {@link resourceName}
 * @see {@link id}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id - The ID of the resource to be used in the request
 * @param {string | undefined} URL - An optional URL to be used in the request (defaults to "https://localhost:5000")
 * @param {string | undefined} token - Optional JWT token used for authentication (if not passed to the function, it will be searched in localStorage)
 */
function get(resourceName, id, URL = `https://localhost:5000`, token) {
    return dispatch => {
        const {
            getRequest,
            getSuccess,
            getFailure
        } = getActionGenerator(resourceName);

        if (!token) {
            // If no token was passed to the action, try to retrieve from localStorage
            const storedUserInfo = JSON.parse(localStorage.getItem('user'));

            if (!storedUserInfo || !storedUserInfo.token) {
                dispatch(errorMessageAction({ message: "Error: Invalid token" }));
                dispatch(getFailure({ error: "Invalid token" }));

                return;
            }

            token = storedUserInfo.token;
        }

        dispatch(getRequest());

        resourceServices.get(resourceName, id, URL, token)
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

/**
 * @function getActionGenerator - Creates all POST actions for a given resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 */
function postActionGenerator(resourceName) {
    return ({
        postRequest: createAction(`${resourceName}_POST_REQUEST`),
        postSuccess: createAction(`${resourceName}_POST_SUCCESS`),
        postFailure: createAction(`${resourceName}_POST_FAILURE`)
    });
};

/**
 * @function post - Dispatches actions to POST a resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {Object} resource - The resource object to be sent in the request body (IMPORTANT: property names must be in PascalCase, as established in the backend)
 * @param {string | undefined} URL - An optional URL to be used in the request (defaults to "https://localhost:5000")
 * @param {string | undefined} token - Optional JWT token used for authentication (if not passed to the function, it will be searched in localStorage)
 */
function post(resourceName, resource, URL = `https://localhost:5000`, token) {
    return dispatch => {
        const {
            postRequest,
            postSuccess,
            postFailure
        } = postActionGenerator(resourceName);

        if (!token) {
            // If no token was passed to the action, try to retrieve from localStorage
            const storedUserInfo = JSON.parse(localStorage.getItem('user'));

            if (!storedUserInfo || !storedUserInfo.token) {
                dispatch(errorMessageAction({ message: "Error: Invalid token" }));
                dispatch(postFailure({ error: "Invalid token" }));

                return;
            }

            token = storedUserInfo.token;
        }

        dispatch(postRequest());

        resourceServices.post(resourceName, resource, URL, token)
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

/**
 * @function getActionGenerator - Creates all PUT actions for a given resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 */
function putActionGenerator(resourceName) {
    return ({
        putRequest: createAction(`${resourceName}_PUT_REQUEST`),
        putSuccess: createAction(`${resourceName}_PUT_SUCCESS`),
        putFailure: createAction(`${resourceName}_PUT_FAILURE`)
    });
};

/**
 * @function put - Dispatches actions to PUT a resource of type resourceName with a given id
 * @see {@link resourceName}  
 * @see {@link id}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id - The ID of the resource to be used in the request
 * @param {Object} resource - The resource object to be sent in the request body (IMPORTANT: property names must be in PascalCase, as established in the backend)
 * @param {string | undefined} URL - An optional URL to be used in the request (defaults to "https://localhost:5000")
 * @param {string | undefined} token - Optional JWT token used for authentication (if not passed to the function, it will be searched in localStorage)
 */
function put(resourceName, id, resource, URL = `https://localhost:5000`, token) {
    return dispatch => {
        const {
            putRequest,
            putSuccess,
            putFailure
        } = putActionGenerator(resourceName);

        if (!token) {
            // If no token was passed to the action, try to retrieve from localStorage
            const storedUserInfo = JSON.parse(localStorage.getItem('user'));

            if (!storedUserInfo || !storedUserInfo.token) {
                dispatch(errorMessageAction({ message: "Error: Invalid token" }));
                dispatch(putFailure({ error: "Invalid token" }));

                return;
            }

            token = storedUserInfo.token;
        }

        dispatch(putRequest());

        resourceServices.put(resourceName, id, resource, URL, token)
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

/**
 * @function getActionGenerator - Creates all DELETE actions for a given resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 */
function deleteActionGenerator(resourceName) {
    return ({
        deleteRequest: createAction(`${resourceName}_DELETE_REQUEST`),
        deleteSuccess: createAction(`${resourceName}_DELETE_SUCCESS`),
        deleteFailure: createAction(`${resourceName}_DELETE_FAILURE`)
    });
}

/**
 * @function deleteResource - Dispatches actions to DELETE a resource of type resourceName with a given id
 * @see {@link resourceName}
 * @see {@link id}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"}  resourceName
 * @param {string | number} id - The ID of the resource to be used in the request
 * @param {string | undefined} URL - An optional URL to be used in the request (defaults to "https://localhost:5000")
 * @param {string | undefined} token - Optional JWT token used for authentication (if not passed to the function, it will be searched in localStorage)
 */
function deleteResource(resourceName, id, URL = `https://localhost:5000`, token) {
    return dispatch => {
        const {
            deleteRequest,
            deleteSuccess,
            deleteFailure
        } = deleteActionGenerator(resourceName);

        if (!token) {
            // If no token was passed to the action, try to retrieve from localStorage
            const storedUserInfo = JSON.parse(localStorage.getItem('user'));

            if (!storedUserInfo || !storedUserInfo.token) {
                dispatch(errorMessageAction({ message: "Error: Invalid token" }));
                dispatch(deleteFailure({ error: "Invalid token" }));

                return;
            }

            token = storedUserInfo.token;
        }

        dispatch(deleteRequest());

        resourceServices.deleteResource(resourceName, id, URL, token)
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