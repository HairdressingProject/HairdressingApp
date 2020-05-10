/**
 * @function createRequestHeader - Creates request headers to be sent (with an optional Authorization header)
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method - The standard HTTP method to be used in the request
 * @param {Object | undefined} body - Optional request body* 
 * @param {string | undefined} URL - Optional URL (defaults to "https://localhost:5000")
 * @param {string | null} token - Optional JWT token (if authentication is required)
 * @returns {Object} requestHeader
 */
export function createRequestHeader(method, body = {}, token = null) {
    const normalisedMethod = method ? method.trim().toUpperCase() : null;
    if (!normalisedMethod) {
        throw 'Invalid request method';
    }

    const baseOptionsNoToken = {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Origin': process.env.REACT_APP_PUBLIC_URL || "https://localhost:3000"
        }
    };

    // Will be deprecated in the future, because tokens will not be accessible through javascript anymore
    const baseOptionsWithToken = {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Origin': baseOptionsNoToken.headers['Origin'],
            'Authorization': `Bearer ${token}`
        }
    };

    if (!token) {
        return normalisedMethod === 'GET' ?
            baseOptionsNoToken :
            ({
                ...baseOptionsNoToken,
                headers: {
                    ...baseOptionsNoToken.headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
    }

    return normalisedMethod === 'GET' ?
        baseOptionsWithToken :
        ({
            ...baseOptionsWithToken,
            headers: {
                ...baseOptionsWithToken.headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
}