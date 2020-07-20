import tokenService from './tokenService';
const BASE_URL = '/api/inventory/';

function updateItem(item) {
    let id;
    for(let pair of item.entries()){
        if(pair[0] === 'id'){
            id = pair[1];
        }}
    return fetch(BASE_URL + id, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: item
    })
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            throw new Error('Invalid Request, Try Again');
        }
    })
}

function showOne(item) {
    return fetch(BASE_URL + item, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }),
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Request, Try Again');
        }
    })
}

function addItem(item) {
    
    return fetch(BASE_URL + 'new', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: item
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Item, Try Again');
        }
    })
}

function deleteItem(item) {
    return fetch(BASE_URL + item, {
        method: 'DELETE',
        headers: new Headers({
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }),
    })
    .then(response => {
        if(response.ok) {   
            return response.json();
        } else {
            throw new Error('Invalid Request, Try Again');
        }
    })
}

function index(items) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'Application/json',
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
    updateItem,
    showOne,
    addItem,
    deleteItem,
    index
}

