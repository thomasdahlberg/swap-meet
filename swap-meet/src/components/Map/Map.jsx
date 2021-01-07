import React, { Component, createRef } from 'react';
import geolocationService from '../../utils/geolocationService';

let GOOGLE_MAP_API_KEY;
let prevInfoWindow = false;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.googleMapRef = createRef();
  }
  componentDidMount() {
    this.getAPI();
    this.handleMapStyle();
  }

  buttonRef = React.createRef();
  scrimRef = React.createRef();

  handleShowMap = async () => {
    await this.props.handleGetSites();
    await this.props.handleGetItems();
    await this.props.handleFormToggle({
      target: { id: 'toggleMap' },
    });
    this.handleMapStyle();
  };

  handleMapStyle = () => {
    const buttonNode = this.buttonRef.current;
    const scrimNode = this.scrimRef.current;
    if (this.props.mapActive === false) {
      buttonNode.style.opacity = 1;
      scrimNode.style.opacity = 0.5;
    } else {
      buttonNode.style.opacity = 0;
      scrimNode.style.opacity = 0;
      scrimNode.style.height = 0;
    }
  };

  isMapActive = () => {
    return this.props.mapActive;
  };

  getAPI = async () => {
    GOOGLE_MAP_API_KEY = await geolocationService.getGoogleMapAPI();
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.initMap();
    });
  };

  initMap = async () => {
    await this.props.handleGetItems();
    await this.props.handleGetSites();
    await this.props.handleGetSwapmeets();

    let coords = {};
    this.props.lat
      ? (coords.lat = this.props.lat)
      : (coords.lat = 51.5074);
    this.props.lng
      ? (coords.lng = this.props.lng)
      : (coords.lng = 0.1278);

    let map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 12,
      center: {
        lat: coords.lat,
        lng: coords.lng,
      },
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        {
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#242f3e' }],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
    });
    this.setMarkers(map, this.props.sites, this.props.items);
  };
  setMarkers = (map, lib, lib2) => {
    let itemNames = [];
    for (let i = 0; i < lib.length; i++) {
      let place = lib[i];
      let infoWind = new window.google.maps.InfoWindow({
        content: '',
      });
      let marker = new window.google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: lib[i].siteName,
      });
      for (let l = 0; l < lib[i].items.length; l++) {
        for (let m = 0; m < lib2.length; m++) {
          if (lib2[m]._id === lib[i].items[l]) {
            itemNames.push(`<li>${lib2[m].name}</li>`);
          }
        }
      }
      let placeHTML = `<strong>${
        place.siteName
      }</strong><br><ul>${itemNames.join(
        '',
      )}</ul><a class="btn btn-flat btn-small" href="/swapsites/${
        place.id
      }">View</a>`;
      bindInfoWindow(marker, map, infoWind, placeHTML);
      itemNames = [];
    }
    function bindInfoWindow(marker, map, infoWind, html) {
      new window.google.maps.event.addListener(
        marker,
        'click',
        function () {
          if (prevInfoWindow) {
            prevInfoWindow.close();
          }
          prevInfoWindow = infoWind;
          infoWind.setContent(html);
          infoWind.open(map, marker);
        },
      );
    }
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          disabled={this.isMapActive()}
          ref={this.buttonRef}
          onClick={this.handleShowMap}
          style={{
            position: 'absolute',
            zIndex: '10',
            padding: '2rem',
            fontFamily: 'Permanent Marker',
            fontSize: '3rem',
            borderRadius: '1rem',
            boxShadow: '2px 2px 3px 2px black',
            opacity: '0',
          }}
        >
          Explore Swaps
        </button>
        <div
          id="scrim"
          ref={this.scrimRef}
          style={{
            position: 'absolute',
            zIndex: '9',
            backgroundColor: '#B2FFA8',
            width: '100vh',
            height: '100vh',
            opacity: '0',
          }}
        />
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{
            width: '100vh',
            height: '100vh',
          }}
        />
      </div>
    );
  }
}

export default GoogleMap;
