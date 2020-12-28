import tokenService from './tokenService';
const BASE_URL = '/api/swapmeets/';

function updateOne(swapMeet) {
	let body;
	if(swapMeet.dateTime){
		body = swapMeet
	} else {
		body = {name: swapMeet.name};
	}
	return fetch(BASE_URL + swapMeet.id, {
		method: 'PUT',
		headers: new Headers({
			'Content-type': 'Application/json',
			'Authorization': 'Bearer ' + tokenService.getToken()
		}),
		body: JSON.stringify(body)
	})
	.then(response => {
		if(response.ok) {
			return response.json();
		} else {
			throw new Error('Invalid Offer, Try Again');
		}
	})
}

function showOne(meet) {
	return fetch(BASE_URL + meet, {
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

function addOffer(swapMeet) {
    return fetch(BASE_URL + 'new', {
			method: 'POST',
			headers: {
				'Content-type': 'Application/json',
				'Authorization': 'Bearer ' + tokenService.getToken()
			},
			body: JSON.stringify(swapMeet)
    })
    .then(response => {
			if(response.ok) {
				return response.json();
			} else {
				throw new Error('Invalid Offer, Try Again');
			}
    })
}


function index(swapMeets) {
    return fetch(BASE_URL, {
			method: 'GET',
			headers: new Headers({
				'Content-type': 'Application/json',
				'Authorization': 'Bearer ' + tokenService.getToken()
			}),
			body: JSON.stringify(swapMeets)
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
    updateOne,
    showOne,
    addOffer,
    index
}