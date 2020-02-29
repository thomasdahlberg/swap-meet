import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';
import styles from './Map.module.css';



class SwapMap extends Component {
    constructor() {
        super();
        this.state = {
        };
      } 
    
    componentWillMount() {
        this.getUserLocation();
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(this.showPosition)
    }

    showPosition = position => {
        this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
        })
    }


    render() {
        return(
            <div onLoad={this.getUserLocation}>
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{ lat: this.state.lat, lng: this.state.long }}
                    centerAroundCurrentLocation={true}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBDG1GXL5fTNxIMCSbjQnfsDDDTwTpiIU'
  })(SwapMap);