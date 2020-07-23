import tokenService from './tokenService';
const BASE_URL = '/api/swapsites/';

function showOne(site) {
    return fetch(BASE_URL + site, {
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

function linkItem(site) {
    return fetch(BASE_URL + `${site.site}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(site)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Site, Try Again');
        }
    })
}


function addSite(site) {
    return fetch(BASE_URL + 'new', {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify(site)
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Site, Try Again');
        }
    })
}


function index(sites) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'Application/json',
            // 'Authorization': 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify(sites)
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
    showOne,
    linkItem,
    addSite,
    index
}

