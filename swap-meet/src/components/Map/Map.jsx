import React from 'react';
import mapStyle from './map-style';

class Map extends React.Component {
  mapDiv = React.createRef();
  
  setMap() {
    if (this.props.lat && this.props.lng) {
      const location = {lat: this.props.lat, lng: this.props.lng};
      const map = new window.google.maps.Map(
        this.mapDiv.current, {
          zoom: this.props.zoom || 12,
          center: location,
          disableDefaultUI: true,
          styles: mapStyle
        }
      );
      new window.google.maps.Marker({position: location, map: map});
    }
  }

  // Called after the first render
  componentDidMount() {
    this.setMap();
  }

  // Called when props or state change
  componentDidUpdate() {
    this.setMap();
  }

  render() {
    const baseStyle = {
        width: 500,
        height: 500,
      };
    
    return (
      <div ref={this.mapDiv} style={baseStyle}></div>
    );
  }
}
export default Map;