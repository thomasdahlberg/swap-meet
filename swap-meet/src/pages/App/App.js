import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages and Components
import InventoryPage from'../InventoryPage/InventoryPage';
import SwapmeetsPage from'../SwapmeetsPage/SwapmeetsPage';
import SwapsitesPage from'../SwapsitesPage/SwapsitesPage';
import Map from'../../components/Map/Map';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// Services
import userService from '../../utils/userService';
import inventoryService from '../../utils/inventoryService';
import { getCurrentLatLng } from '../../utils/geolocationService';
import swapSiteService from '../../utils/swapSiteService';



class App extends Component {
  state = this.getInitialState();
      
  getInitialState() {
    return {
        user: userService.getUser(),
        myItems: [],
        items: [],
        sites: [],
        lat: null,
        lng: null,
    };
}

  handleGetMyItems = () => {
    let myItems = [];
    console.log('getmyitems')
    for(let i = 1; i < this.state.items.length; i++){
      if(this.state.items[i].currentOwner === this.state.user._id){
        myItems.push(this.state.items[i]);
      }
    }
    this.setState({ myItems: myItems});
  }

  handleGetItems = async () => {
    if(userService.getUser()) {
      const { items } = await inventoryService.index();
      this.setState({ items: items })
      this.handleGetMyItems();
    }
  }

  handleGetSites = async () => {
    if(userService.getUser()) {
      const { sites } = await swapSiteService.index();
      this.setState({ sites: sites })
    }
  }


  async componentDidMount() {
    this.handleGetItems();
    this.handleGetSites();
    const {lat, lng} = await getCurrentLatLng();
    this.setState({
      lat,
      lng
    })
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render(){
    return(
      <div className="App-outer-container">
        <Navbar user={this.state.user} handleLogout={this.handleLogout}/>
        <div className="App-inner-container">
        <Map lat={this.state.lat} lng={this.state.lng} />
        <Switch>
          <Route exact path='/' render={() =>
          <div>Welcome!</div>
          }/>
          <Route exact path='/inventory' render={() =>
            userService.getUser() ?
            <InventoryPage
            myItems={this.state.myItems}
            handleGetItems={this.handleGetItems} 
            items={this.state.items}
            />
              :
            <Redirect to='/login' />
          }/>
          <Route exact path='/swapmeets' render={() =>
            userService.getUser() ?
            <SwapmeetsPage />
              :
            <Redirect to='/login' />    
          }/>
          <Route exact path='/swapsites' render={() =>
            userService.getUser() ?
            <SwapsitesPage 
              myItems={this.state.myItems}
              sites={this.state.sites} 
              handleGetSites={this.handleGetSites} 
              items={this.state.items}
            />
              :
            <Redirect to='/login' />    
          }/>
          <Route exact path="/login" render={({ history }) =>
            <Login handleSignupOrLogin={this.handleSignupOrLogin} history={history}/>
          }/>
          <Route exact path="/signup" render={({ history }) =>
            <Signup handleSignupOrLogin={this.handleSignupOrLogin} history={history}/>
          }/>
        </Switch>
        </div>
        <Footer />  
      </div>
    );
  }
}

export default App;
