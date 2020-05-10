/**
 * @function authHeader - Creates a request auth header with the user's token stored locally
 * @returns {Object} authHeader
 */
export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + user.token,
            'Origin': 'https://localhost:3000'
        };
    } else {
        return {};
    }
}