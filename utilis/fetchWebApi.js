export async function fetchWebApi(endpoint, method, body, accessToken) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(body)
    });
    return await res.json();
}
