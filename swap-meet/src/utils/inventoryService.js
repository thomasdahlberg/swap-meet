import tokenService from './tokenService';
const BASE_URL = '/api/inventory/';

function addItem(item) {
    return fetch(BASE_URL + 'new', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
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


function index(items) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify(items)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Request, Try Again');
        }
    })
}

function myItems(items) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify(items)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Request, Try Again');
        }
    })
}

export default {
    myItems,
    addItem,
    index
}

