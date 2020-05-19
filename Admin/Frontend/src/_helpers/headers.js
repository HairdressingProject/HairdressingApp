/**
 * @function createRequestHeader - Creates request headers to be sent (with an optional Authorization header)
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method - The standard HTTP method to be used in the request
 * @param {Object | undefined} body - Optional request body* 
 * @param {string | undefined} URL - Optional URL (defaults to "https://localhost:5000")
 * @returns {Object} requestHeader
 */
export function createRequestHeader(method, body = {}) {
    const normalisedMethod = method ? method.trim().toUpperCase() : null;
    if (!normalisedMethod) {
        throw 'Invalid request method';
    }

    const baseOptions = {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Origin': process.env.REACT_APP_PUBLIC_URL || "https://localhost:3000"
        }
    };

    return normalisedMethod === 'GET' ?
        baseOptions :
        ({
            ...baseOptions,
            headers: {
                ...baseOptions.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
}