import tokenService from './tokenService';
const BASE_URL = '/api/key/';

function getCurrentLatLng() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(pos => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }));
    });
  }

function getGoogleMapAPI(key) {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: new Headers({
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    // body: JSON.stringify(key)
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
  getCurrentLatLng,
  getGoogleMapAPI
}