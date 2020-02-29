import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';
import styles from './Map.module.css';

class SwapMap extends Component {

    render() {
        return(
            <div>
                <Map
                    google={this.props.google}
                    zoom={8}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDBDG1GXL5fTNxIMCSbjQnfsDDDTwTpiIU'
  })(SwapMap);