import React, { Component } from 'react';
import { GoogleComponent } from 'react-google-location';
import swapSiteService from '../../utils/swapSiteService';
import styles from './AddSwapsitesForm.module.css';
import geolocationService from '../../utils/geolocationService';
import FormButtons from '../FormButtons/FormButtons';



class AddSwapsitesForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteName: null,
      latitude: null,
      longitude: null,
      address: null,
      city: null,
      usState: null,
      mapKey: null
    };
  }

  googleRef = React.createRef();
  siteNameRef = React.createRef();
  siteAddressRef = React.createRef();
  siteCityRef = React.createRef();
  siteStateRef = React.createRef();
  siteLatRef = React.createRef();
  siteLngRef= React.createRef();

  componentDidMount(){
    this.getAPI_KEY();
  }

  getAPI_KEY = async () => {
    const API_KEY = await geolocationService.getGoogleMapAPI();
    this.setState({mapKey: API_KEY})
  }

  handleSubmit = async e => {
    e.preventDefault();
    const siteNameNode = this.siteNameRef.current;
    const siteAddressNode = this.siteAddressRef.current;
    const siteCityNode = this.siteCityRef.current;
    const siteStateNode = this.siteStateRef.current;
    const siteLatNode = this.siteLatRef.current;
    const siteLngNode = this.siteLngRef.current;
      try {
          await this.setState({
            siteName: siteNameNode.value,
            address: siteAddressNode.value,
            city: siteCityNode.value,
            usState: siteStateNode.value,
            latitude: siteLatNode.value,
            longitude: siteLngNode.value
          });
          const { siteName, latitude, longitude, address, city, usState } = this.state;
          await swapSiteService.addSite({ siteName, latitude, longitude, address, city, usState });
          this.resetAddSiteForm();
          this.resetState();
      } catch (error) {
          console.log(error);
      }
  }

  resetAddSiteForm = () => {
    const siteNameNode = this.siteNameRef.current;
    const siteAddressNode = this.siteAddressRef.current;
    const siteCityNode = this.siteCityRef.current;
    const siteStateNode = this.siteStateRef.current;
    const siteLatNode = this.siteLatRef.current;
    const siteLngNode = this.siteLngRef.current;
    siteNameNode.value = '';
    siteAddressNode.value = '';
    siteCityNode.value = '';
    siteStateNode.value = '';
    siteLatNode.value = '';
    siteLngNode.value = '';
    this.addSiteFormToggle();
  }

  resetState = () => {
    this.setState({
      siteName: null,
      latitude: null,
      longitude: null,
      address: null,
      city: null,
      usState: null,
    })
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handlePlacesData = e => {
    console.log(e);
    const siteNameNode = this.siteNameRef.current;
    const siteAddressNode = this.siteAddressRef.current;
    const siteCityNode = this.siteCityRef.current;
    const siteStateNode = this.siteStateRef.current;
    const siteLatNode = this.siteLatRef.current;
    const siteLngNode = this.siteLngRef.current;
    let placeData = e.place;
    let formData = [];
    placeData = placeData.split(',');
    placeData.forEach(elem => {
      let mutatedElem = elem.trim();
      formData.push(mutatedElem);
    });
    console.log(formData[0]);
    siteNameNode.value = formData[0];
    siteAddressNode.value = `${formData[1]}, ${formData[2]}, ${formData[3]}`;
    siteCityNode.value = formData[2];
    siteStateNode.value = formData[3];
    siteLatNode.value = e.coordinates.lat;
    siteLngNode.value = e.coordinates.lng;
  }
  
  delayedHandleGetSites = () => {
    setTimeout(this.props.handleGetSites, 3000);
  }


    render() {
      return (
        <div
          ref={this.formRef}
          className={styles.form}
          // onSubmit={this.handleSubmit}
        >
          <GoogleComponent
            ref={this.googleRef}
            apiKey={this.state.mapKey}
            language={'en'}
            country={'country:us'}
            coordinates={true}
            placeholder={'Start typing location'}
            locationBoxStyle={'custom-style'}
            locationListStyle={'custom-style-list'}
            onChange={(e) => {this.handlePlacesData(e)}} 
          />
            <label htmlFor="siteName">Swap-Site Name:</label>
            <input
              ref={this.siteNameRef} 
              type="text" 
              name="siteName"
              onChange={this.handleChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              ref={this.siteAddressRef}
              name="address" 
              id="address" 
              onChange={this.handleChange}  
            />
            <label htmlFor="city">City:</label>
            <input
              ref={this.siteCityRef}
              name="city" 
              id="city" 
              onChange={this.handleChange}  
            />
            <label htmlFor="usState">State:</label>
            <input
              ref={this.siteStateRef}
              name="usState" 
              id="usState" 
              onChange={this.handleChange}  
            />
            <input
              ref={this.siteLatRef}
              name="latitude"
              type="text"
              onChange={this.handleChange}
            />
            <input 
              ref={this.siteLngRef}
              name="longitude"
              type="text"
              onChange={this.handleChange}  
            />
            <FormButtons
              submitTitle="Add Site"
              cancelTitle="Cancel"
              submitFunction={this.handleSubmit}
              cancelFunction={this.props.handleFormToggle}
              cancelId="toggleAddSiteForm"
            />
        </div>
      )
    } 
  }

  export default AddSwapsitesForm;