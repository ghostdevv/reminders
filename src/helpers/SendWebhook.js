export const sendWebhook = async (url, payload) =>
    new Promise((resolve, reject) => {
        fetch(url + '?wait=true', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (res.ok) return res.json();
                throw res;
            })
            .then(resolve)
            .catch(reject);
    });
