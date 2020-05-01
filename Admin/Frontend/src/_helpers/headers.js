/**
 * @function createRequestHeader - Creates request headers to be sent (with an optional Authorization header)
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method - The standard HTTP method to be used in the request
 * @param {Object | undefined} body - Optional request body* 
 * @param {string | undefined} URL - Optional URL (defaults to "https://localhost:5000")
 * @param {string | null} token - Optional JWT token (if authentication is required)
 * @returns {Object} requestHeader
 */
export function createRequestHeader(method, body = {}, URL = 'https://localhost:5000', token = null) {
    const normalisedMethod = method ? method.trim().toUpperCase() : null;
    if (!normalisedMethod) {
        throw 'Invalid request method';
    }

    if (!token) {
        return normalisedMethod === 'GET' ?
            ({
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': URL
                }
            }) :
            ({
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': URL
                },
                body: JSON.stringify(body)
            })
    }

    return normalisedMethod === 'GET' ?
        ({
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': URL
            }
        }) :
        ({
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': URL
            },
            body: JSON.stringify(body)
        })
}