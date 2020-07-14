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
      longitude: null,
      address: null
    };
  }

  formRef = React.createRef();
  buttonRef = React.createRef();

  handleSubmit = async e => {
      e.preventDefault();
      console.log('submitting swapsite');
      try {
          const { siteName, latitude, longitude, address } = this.state;
          await swapSiteService.addSite({ siteName, latitude, longitude, address });
          // this.props.handleGetSites();
          // this.props.history.push('/swapsites');
      } catch (error) {
          console.log(error);
      }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  addSiteFormToggle = async e => {
    const formNode = this.formRef.current;
    const buttonNode = this.buttonRef.current;

    if(buttonNode.innerText === 'Cancel'){
        formNode.style.opacity = 0;
        formNode.style.height = '0px';
        buttonNode.style.backgroundColor = '#86e7b8';
        buttonNode.innerText = 'Create New Swap-Site';
    } else {
        formNode.style.opacity = 1;
        formNode.style.height = '50rem';
        buttonNode.style.backgroundColor = '#ff8589';
        buttonNode.innerText = 'Cancel';    
    }
  }

  delayedHandleGetSites = () => {
    setTimeout(this.props.handleGetSites, 3000);
  }


    render() {
      return (
        <div className={styles.addsite}>
          <button ref={this.buttonRef} className={styles.button} onClick={this.addSiteFormToggle}>Create New Swap-Site</button>
          <form
            ref={this.formRef}
            className={styles.form}
            onSubmit={this.handleSubmit}
          >
            <div className={styles.container}>
              <GoogleComponent
                apiKey={API_KEY}
                language={'en'}
                country={'country:us'}
                coordinates={true}
                placeholder={'Start typing location'}
                locationBoxStyle={'custom-style'}
                locationListStyle={'custom-style-list'}
                // onChange={(e) => { this.setState({ siteName: e.place, latitude: e.coordinates.lat, longitude: e.coordinates.lng }) }} 
              />
              <form className={styles.container} action="">
                <label htmlFor="siteName">Swap-Site Name:</label>
                <input 
                  type="text" 
                  name="siteName"
                  onChange={this.handleChange}
                />
                <label htmlFor="address">Address:</label>
                <textarea
                  name="address" 
                  id="address" 
                  cols="40"
                  rows="5"
                  onChange={this.handleChange}  
                />
                <label htmlFor="latitude">Latitude:</label>
                <input
                  name="latitude"
                  disabled
                  type="text"
                  onChange={this.handleChange}
                />
                <label htmlFor="longitude">Longitude:</label>
                <input 
                  name="longitude"
                  disabled
                  type="text"
                  onChange={this.handleChange}  
                />
                <button type="submit" onClick={this.delayedHandleGetSites}>Add New Swap-Site</button>
              </form>
            </div>
          </form>
        </div>
  
      )
    } 
  }

  export default AddSwapsitesForm;