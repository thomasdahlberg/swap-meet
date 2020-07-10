import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages
import InventoryPage from '../InventoryPage/InventoryPage';
import SwapmeetsPage from '../SwapmeetsPage/SwapmeetsPage';
import SwapsitesPage from '../SwapsitesPage/SwapsitesPage';
import NewSwapmeetsPage from '../NewSwapmeetsPage/NewSwapmeetsPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

// Components
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import GoogleMap from '../../components/Map/Map';

// Services
import userService from '../../utils/userService';
import inventoryService from '../../utils/inventoryService';
import geolocationService from '../../utils/geolocationService';
import swapSiteService from '../../utils/swapSiteService';
import swapmeetService from '../../utils/swapmeetService';



class App extends Component {
  state = this.getInitialState();
  
  getInitialState () {
    return {
      user: userService.getUser(),
      myItems: [],
      mySwapmeets:[],
      myOffers: [],
      swapmeets: [],
      swapmeetsData: [],
      items: [],
      sites: [],
      lat: null,
      lng: null,
      wantItem: null,
      wantItemPlace: null,
      wantItemUser: null,
      wantItems: null,
    };
  }
  
  handleGetItems = async () => {
    if(userService.getUser()) {
      console.log('Get ITEMs!');
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

  handleGetSwapmeets = async () => {
    if(userService.getUser()) {
      const { meets } = await swapmeetService.index();
      this.setState({ swapmeets: meets })
      this.handleGetWantItems();
      this.handleGetSwapmeetsData();
    }
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

  handleGetWantItems = () => {
    // const myWantItems = [];
    this.state.swapmeets.forEach((element) => {
      // console.log(inventoryService.showOne(element.wantItem));
    })
  }

  
  
  handleGetMyWantItem = async (e) => {
    const wantItemPlace = e.target.parentNode.parentNode.id;
    const wantItem = e.target.id
    await this.setState({ 
      wantItem: wantItem,
      wantItemPlace: wantItemPlace
     })
  }

  handleGetSwapmeetsData = async (e) => {
    let swapmeets = [];
    this.state.swapmeets.forEach((element) => {
      let sites = this.state.sites;
      let items = this.state.items;
      let swapmeet = {};
      for(let i = 1; i < sites.length; i++) {
        if(sites[i]._id === element.site) {
          swapmeet.site = sites[i].siteName;
        }
      }
      for(let i = 1; i < items.length; i++) {
        if(items[i]._id === element.transaction.offerItem){
          swapmeet.offerItem = items[i].name;
        }
        if(items[i]._id === element.transaction.wantItem){
          swapmeet.wantItem = items[i].name;
        }
      }
      if(swapmeet.site) swapmeets.push(swapmeet);
    })
    this.setState({ swapmeetsData: swapmeets });
  }

  handleItemEditView = async (e) => {
    e.preventDefault();
    console.log('Item Edit View');
    console.log(e.target.id);
    try {
        await inventoryService.showOne(e.target.id);
    } catch (error) {
        console.log(error);
    }
  }

  handleItemDelete = async (e) => {
    e.preventDefault();
    console.log('Delete Item');
    console.log(e.target.id);
    try {
        inventoryService.deleteItem(e.target.id);
        console.log('FIRE!');
        this.handleGetItems();
    } catch (error) {
        console.log(error);
    }
  }

  async componentDidMount() {
    // this.handleGetItems();
    // this.handleGetSites();
    // this.handleGetSwapmeets();
    // this.handleGetWantItems();
    const {lat, lng} = await geolocationService.getCurrentLatLng();
    this.setState({
      lat,
      lng
    })
  }


//Log In and Log Out Functions

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ 
      user: null,
      myItems: [],
    });
  }

  render(){
    return(
      <div className="App-outer-container">
        <Navbar user={this.state.user} handleLogout={this.handleLogout} handleGetItems={this.handleGetItems}/>
        <div className="App-inner-container">
        <Switch>
          <Route exact path='/' render={() =>
          <GoogleMap
            items={this.state.items}
            sites={this.state.sites}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          }/>
          <Route exact path='/inventory' render={() =>
            userService.getUser() ?
            <InventoryPage
            myItems={this.state.myItems.reverse()}
            handleGetItems={this.handleGetItems} 
            items={this.state.items}
            handleItemEditView={this.handleItemEditView}
            handleItemDelete={this.handleItemDelete}
            />
              :
            <Redirect to='/login' />
          }/>
          <Route exact path='/swapmeets' render={() =>
            userService.getUser() ?
            <SwapmeetsPage
              sites={this.state.sites} 
              swapmeets={this.state.swapmeetsData}
              items={this.state.items} 
              myItems={this.state.myItems}
              mySwapmeets={this.state.mySwapmeets}
            />
              :
            <Redirect to='/login' />    
          }/>
          <Route exact path='/swapmeets/new' render={() =>
            userService.getUser() ?
            <NewSwapmeetsPage 
              items={this.state.items} 
              myItems={this.state.myItems}
              wantItem={this.state.wantItem}
              wantItemPlace={this.state.wantItemPlace}
              wantItemUser={this.state.wantItemUser}
              handleGetWantItemUser={this.handleGetWantItemUser}
            />
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
              handleGetMyWantItem={this.handleGetMyWantItem}
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
