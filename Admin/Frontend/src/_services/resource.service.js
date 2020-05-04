import { createRequestHeader } from '../_helpers/';
import { resourceNames } from '../_constants';

export const resourceServices = {
    getAll,
    get,
    post,
    put,
    deleteResource
};

/**
 * @function getAll - Gets all resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 * @param {string} URL - URL of the request
 * @param {string | undefined} token - JWT token used for authentication 
 */
async function getAll(resourceName, URL, token) {
    const requestOptions = createRequestHeader('GET', null, URL, token);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}`, requestOptions);
    return handleResponse(response);
}

/**
 * @function get - GET a resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 * @param {string | number} id - The ID of the resource 
 * @param {string} URL - URL of the request
 * @param {string | undefined} token - JWT token used for authentication
 */
async function get(resourceName, id, URL, token) {
    const requestOptions = createRequestHeader('GET', null, URL, token);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

/**
 * @function post - POST a resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 * @param {Object} resource - The resource object to be sent in the request body
 * @param {string} URL - URL of the request
 * @param {string | undefined} token - JWT token used for authentication
 */
async function post(resourceName, resource, URL, token) {
    const requestOptions = createRequestHeader('POST', resource, URL, token);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}`, requestOptions);



    return handleResponse(response);
}

/**
 * @function put - PUT a resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 * @param {string | number} id - The ID of the resource
 * @param {Object} resource - The resource object to be sent in the request body
 * @param {string} URL - URL of the request
 * @param {string | undefined} token - JWT token used for authentication
 */
async function put(resourceName, id, resource, URL, token) {
    const requestOptions = createRequestHeader('PUT', resource, URL, token);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

/**
 * @function delete - DELETE a resource of type resourceName
 * @see {@link resourceName}
 * @param {"USERS" | "COLOURS" | "FACE_SHAPES" | "FACE_SHAPE_LINKS" | "HAIR_LENGTHS" | "HAIR_LENGTH_LINKS" | "HAIR_STYLE" | "HAIR_STYLE_LINKS" | "SKIN_TONES" | "SKIN_TONE_LINKS" | "USER_FEATURES"} resourceName
 * @param {string | number} id - The ID of the resource
 * @param {string} URL - URL of the request
 * @param {string | undefined} token - JWT token used for authentication
 */
async function deleteResource(resourceName, id, URL, token) {
    const requestOptions = createRequestHeader('DELETE', null, URL, token);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

/**
 * @function handleResponse - Handles all kinds of responses sent from the backend. Can be used to handle errors as well.
 * @param {Response} response 
 */
async function handleResponse(response) {
    const text = await response.text();
    const data = text && JSON.parse(text);
    if (!response.ok) {
        // user isn't authenticated/authorised
        if (response.status === 401) {
        }
        // bad request
        if (response.status === 400) {
        }
        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}