import { createRequestHeader } from '../_helpers/';

export const resourceServices = {
    getAll,
    get,
    post,
    put,
    deleteResource
};

async function getAll(resourceName, URL) {
    const requestOptions = createRequestHeader('GET');

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}`, requestOptions);
    return handleResponse(response);
}

async function get(resourceName, id, URL) {
    const requestOptions = createRequestHeader('GET');

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

async function post(resourceName, resource, URL) {
    const requestOptions = createRequestHeader('POST', resource);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}`, requestOptions);
    return handleResponse(response);
}

async function put(resourceName, id, resource, URL) {
    const requestOptions = createRequestHeader('PUT', resource);

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

async function deleteResource(resourceName, id, URL) {
    const requestOptions = createRequestHeader('DELETE');

    const normalisedResourceName = resourceName.trim().toLowerCase();

    const response = await fetch(`${URL}/api/${normalisedResourceName}/${id}`, requestOptions);
    return handleResponse(response);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // user isn't authenticated
            if (response.status === 401) {
            }

            // bad request
            if (response.status === 400) {
            }

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}