const BASE_URL = '/api/invetory/';

function addItem(item) {
    return fetch(BASE_URL + 'new', {
        method: 'POST',
        headers: new Headers({'Content-type': 'Application/json'}),
        body: JSON.stringify(item)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Item, Try Again');
        }
    })
}

export default {
    addItem
}
