import React, { Component, createRef } from 'react'

const GOOGLE_MAP_API_KEY = process.env.API_KEY;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.props.sites[0]);
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA8JacrsSr71qIf9zHzR_6__AbObv3hci8&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load',() => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }
  

  createGoogleMap = () => 
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      disableDefaultUI: true,
    })  

    createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: this.props.sites[0].latitude, lng: this.props.sites[0].longitude },
      map: this.googleMap,
    })

  render() {
    return(
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '400px', height: '300px' }}
      />
    )
  }
}

export default GoogleMap