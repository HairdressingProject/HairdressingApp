import { createRequestHeader } from '../_helpers';

/**
 * @var {Object} userService - This object contains functions responsible for handling user-submitted actions, i.e. login, logout and get all users
 */
export const userService = {
    login,
    logout,
    authenticate,
    changeUserRole,
    getAll
};

/**
 * @function login - Handles user login (submitted in the sign in form)
 * @param {string} usernameOrEmail - Username or email submitted in the form
 * @param {string} password - Password submitted in the form
 * @param {string} URL - Request URL
 * @returns {Object} user - This represents the JSON response from the server, containing user info and token to be saved in local storage
 */
async function login(usernameOrEmail, password, URL) {
    const options = createRequestHeader("POST", {
        UserNameOrEmail: usernameOrEmail,
        UserPassword: password
    });

    const response = await fetch(`${URL}/api/users/sign_in`, options);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

/**
 * @function logout - Deletes user info stored in local storage (including token)
 * @param {string} URL - Request URL
 * @returns {void}
 */
async function logout(URL) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');

    // send logout request
    const options = createRequestHeader("GET");
    const response = await fetch(`${URL}/api/users/logout`, options);
    return handleResponse(response);
}

/**
 * Validates a token to authenticate a user
 * @function authenticate
 * @param {string} token - Token to be validated in the backend
 * @param {string} URL - Request URL
 */
async function authenticate(token, URL) {
    const options = createRequestHeader("POST", {
        UserToken: token
    });

    const response = await fetch(`${URL}/api/users/authenticate`, options);
    return handleResponse(response);
}

/**
 * Sends a PUT request to change a user's role
 * @function changeUserRole
 * @param {object} updatedUser - Updated user with new role
 * @param {string} token - Token used in the Authorization HTTP header 
 * @param {string} URL - Request URL
 */
async function changeUserRole(updatedUser, token, URL) {
    if (!token) {
        throw new Error('Invalid token passed to changeUserRole');
    }

    const options = createRequestHeader("PUT", updatedUser, token);

    const response = await fetch(`${URL}/api/users/${updatedUser.Id}/change_role`, options);

    return handleResponse(response);
}

/**
 * @function getAll - Fetches all users from the backend (currently not being used)
 * @param {string} URL - Request URL
 */
async function getAll(URL) {
    const options = createRequestHeader("GET");

    const response = await fetch(`${URL}/api/users`, options);
    return handleResponse(response);
}

/**
 * @function handleResponse - Handles responses from API calls
 * @param {Object} response - Response received from the backend
 * @returns {Promise} data - JSON response
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // login details are wrong
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // window.location.reload();
            }

            // one or more fields are invalid (e.g. did not meet minimum length requirements)
            if (response.status === 400) {
                // TODO: handle this case
                logout();
            }

            const errors = ((data && data.error) || (data && data.errors)) || response.statusText;
            return Promise.reject(errors);
        }

        return data;
    });
}