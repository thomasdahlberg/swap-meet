import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location';
import swapSiteService from '../../utils/swapSiteService';


const API_KEY = 'AIzaSyDBDG1GXL5fTNxIMCSbjQnfsDDDTwTpiIU';

class AddSwapsitesPage extends Component {
    constructor(props) {
      super(props)
      this.state = {
        siteName: null,
        latitude: null,
        longitude: null
      };
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('submitting swapsite');
        try {
            const { siteName, latitude, longitude } = this.state;
            await swapSiteService.addSite({ siteName, latitude, longitude });
            this.props.handleGetSites();
            this.props.history.push('/swapsites');
        } catch (error) {
            console.log(error);
        }
    }


    render() {
      return (
        <form onSubmit={this.handleSubmit}>
           <GoogleComponent
           
            apiKey={API_KEY}
            language={'en'}
            country={'country:us'}
            coordinates={true}
            placeholder={'Start typing location'}
            locationBoxStyle={'custom-style'}
            locationListStyle={'custom-style-list'}
            onChange={(e) => { this.setState({ siteName: e.place, latitude: e.coordinates.lat, longitude: e.coordinates.lng }) }} />
            <button type="submit">Add SwapSite</button>
        </form>
  
      )
    } 
  }

  export default AddSwapsitesPage;