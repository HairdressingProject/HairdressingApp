import { authHeader } from '../_helpers';

/**
 * @var {Object} userService - This object contains functions responsible for handling user-submitted actions, i.e. login, logout and get all users
 */
export const userService = {
    login,
    logout,
    getAll
};

/**
 * @function login - Handles user login (submitted in the sign in form)
 * @param {string} usernameOrEmail - User or email submitted in the form
 * @param {string} password - Password submitted in the form
 * @returns {Object} user - This represents the JSON response from the server, containing user info and token to be saved in local storage
 */
async function login(usernameOrEmail, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:5000'
        },
        body: JSON.stringify({ UserName: usernameOrEmail, UserPassword: password })
    };

    const response = await fetch(`https://localhost:5000/api/users/sign_in`, requestOptions);
    const user = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

/**
 * @function logout - Deletes user info stored in local storage (including token)
 * @returns {void}
 */
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/**
 * @function getAll - Fetches all users from the backend (currently not being used)
 */
async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const response = await fetch(`https://localhost:5000/api/users`, requestOptions);
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

            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}