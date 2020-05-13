import { createRequestHeader } from '../_helpers';

/**
 * This object contains functions responsible for handling user-submitted actions, i.e. login, logout and get all users
 * @type {Object}
 */
export const userService = {
    login,
    logout,
    signUp,
    changeUserRole,
    getAll
};

/**
 * @function login - Handles user login (submitted in the sign in form)
 * @param {string} usernameOrEmail - Username or email submitted in the form
 * @param {string} password - Password submitted in the form
 * @param {string} URL - Request URL
 * @returns {Object} user - This represents the JSON response from the server
 */
async function login(usernameOrEmail, password, URL) {
    const options = createRequestHeader("POST", {
        UserNameOrEmail: usernameOrEmail,
        UserPassword: password
    });

    const response = await fetch(`${URL}/api/users/sign_in`, options);
    if (response.ok) {
        localStorage.setItem("user", true);
    }
    return handleResponse(response);
}

/**
 * @function logout - Deletes user info stored in localStorage and requests cookie with token to be deleted
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
 * Sends a POST request to register a new user
 * @function signUp
 * @param {Object} user - User object passed to sign up request body
 * @param {string} URL - Request URL
 */
async function signUp(user, URL) {
    const options = createRequestHeader('POST', user);

    // send sign up request
    const response = await fetch(`${URL}/api/users/sign_up`, options);
    return handleResponse(response);
}

/**
 * Sends a PUT request to change a user's role
 * @function changeUserRole
 * @param {object} updatedUser - Updated user with new role
 * @param {string} URL - Request URL
 */
async function changeUserRole(updatedUser, URL) {
    const options = createRequestHeader("PUT", updatedUser);

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
        let data;

        try {
            data = JSON.parse(text);

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
        }
        catch (err) {
            data = {
                errors: {
                    exception: err.message
                }
            }
        }

        return data;
    });
}