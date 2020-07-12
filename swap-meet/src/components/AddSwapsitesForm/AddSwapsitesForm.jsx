import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location';
import swapSiteService from '../../utils/swapSiteService';
import styles from './AddSwapsitesForm.module.css';


const API_KEY = 'AIzaSyDBDG1GXL5fTNxIMCSbjQnfsDDDTwTpiIU';

class AddSwapsitesForm extends Component {
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
            // this.props.history.push('/swapsites');
        } catch (error) {
            console.log(error);
        }
    }


    render() {
      return (
        <div className={styles.addsite}>
          <button className={styles.button}>Create New Swap-Site</button>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.container}>
              {/* <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                placeholder={'Start typing location'}
                locationBoxStyle={'custom-style'}
                locationListStyle={'custom-style-list'}
                onChange={(e) => { this.setState({ siteName: e.place, latitude: e.coordinates.lat, longitude: e.coordinates.lng }) }} /> */}
              <button type="submit">Add New Swap-Site</button>
            </div>
          </form>
        </div>
  
      )
    } 
  }

  export default AddSwapsitesForm;