import React, { Component, createRef } from 'react'

const GOOGLE_MAP_API_KEY = process.env.API_KEY;
let prevInfoWindow = false;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.googleMapRef = createRef()
  }
  componentDidMount() {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA8JacrsSr71qIf9zHzR_6__AbObv3hci8&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load',() => {
      this.googleMap = this.initMap()
    })
  }
  

  initMap = () => {
    let map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 12,
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
    })
    this.setMarkers(map, this.props.sites, this.props.items)
  }
  setMarkers = (map, lib, lib2) => {
    let itemNames = [];
    for (let i = 0; i < lib.length; i++) {
      let place = lib[i];
      let infoWind = new window.google.maps.InfoWindow({ content: '' });
      let marker = new window.google.maps.Marker({
        position: {lat: place.latitude, lng: place.longitude},
        map: map,
        title: lib[i].siteName
      })
      for (let l = 0; l < lib[i].items.length; l++) {
        for (let m = 0; m < lib2.length; m++) {
          if (lib2[m]._id === lib[i].items[l]) {
            itemNames.push(`<li>${lib2[m].name}</li>`);
          }
        }
      }
      let placeHTML = `<strong>${place.siteName}</strong><br><ul>${itemNames.join('')}</ul><a class="btn btn-flat btn-small" href="/swapsites/${place.id}">View</a>`;
      bindInfoWindow(marker, map, infoWind, placeHTML);
      itemNames = [];
    }
    function bindInfoWindow(marker, map, infoWind, html) {
        new window.google.maps.event.addListener(marker, 'click', function() {
        if(prevInfoWindow){
            prevInfoWindow.close();
        }
        prevInfoWindow = infoWind;
        infoWind.setContent(html);
        infoWind.open(map, marker);
        });
    } 
  }

  render() {
    return(
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '750px', height: '750px' }}
      />
    )
  }
}

export default GoogleMap