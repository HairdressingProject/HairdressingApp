export function createRequestHeader(method, body = {}, token = null, URL = 'https://localhost:5000') {
    const normalisedMethod = method ? method.trim().toUpperCase() : null;
    if (!normalisedMethod) throw 'Invalid request method';

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