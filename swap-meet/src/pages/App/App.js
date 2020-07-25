import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages
import InventoryPage from '../InventoryPage/InventoryPage';
import SwapmeetsPage from '../SwapmeetsPage/SwapmeetsPage';
import SwapsitesPage from '../SwapsitesPage/SwapsitesPage';
import EditItemPage from '../EditItemPage/EditItemPage';
import ViewSwapSitePage from '../ViewSwapSitePage/ViewSwapSitePage';
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
  
  getInitialState(){
    return {
      user: userService.getUser(),
      myItems: [],
      showItem: null,
      showSite: null,
      mySwapmeets:null,
      myOffers: [],
      swapmeets: null,
      mySwapmeetsData: null,
      items: [],
      sites: [],
      lat: null,
      lng: null,
      wantItem: null,
      wantItemPlace: null,
      wantItemUser: null,
      wantItems: null,
      offerItem: null,
      mapActive: false,
    };
  }
  
  //Data Handling Functions

  handleGetItems = async () => {
    console.log('Get ITEMs!');
    const { items } = await inventoryService.index();
    this.setState({ items: items })
    if(userService.getUser()) {
      this.handleGetMyItems();
    }
  }
  
  handleGetSites = async () => {
    const { sites } = await swapSiteService.index();
    this.setState({ sites: sites })
  }

  handleGetSwapmeets = async () => {
    if(userService.getUser()) {
      const { meets } = await swapmeetService.index();
      this.setState({ swapmeets: meets })
      this.handleGetMySwapmeets()
      this.handleGetMySwapmeetsData();
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

  
  handleGetMyWantItem = async (e) => {
    const wantItemId = e.target.id;
    this.state.items.forEach((item)=> {
      if(wantItemId === item._id){
        this.setState({wantItem: item})
      }
    })
  }

  handleGetMyOfferItem = async (e) => {
    console.log('get my offer item');
    const offerItemId = e.target.value;
    this.state.myItems.forEach((item)=> {
      if(offerItemId === item._id){
        this.setState({offerItem: item})
      }
    })
  }

  handleGetMySwapmeetsData = async (e) => {
    let myMeetsData = [];
    this.state.mySwapmeets.forEach((element) => {
      let sites = this.state.sites;
      let items = this.state.items;
      let swapmeet = {};
      for(let i = 1; i < sites.length; i++) {
        if(sites[i]._id === element.site) {
          swapmeet.site = sites[i].siteName;
          swapmeet.dateTime = element.dateTime;
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
      if(swapmeet.site) myMeetsData.push(swapmeet);
    })
    this.setState({ mySwapmeetsData: myMeetsData });
  }

  handleGetMySwapmeets = async (e) => {
    let myMeets = [];
    console.log('get my swapmeets')
    for(let i = 1; i < this.state.swapmeets.length; i++){
      if(this.state.swapmeets[i].transaction.offerUser === this.state.user._id){
        myMeets.push(this.state.swapmeets[i]);
      }
    }
    this.setState({ mySwapmeets: myMeets});

  }
  
  handleItemDelete = async (e) => {
    e.preventDefault();
    try {
        inventoryService.deleteItem(e.target.id);
        this.handleGetItems();
    } catch (error) {
        console.log(error);
    }
  }

  //View handling functions

  handleItemEditView = async (e) => {
    e.preventDefault();
    console.log('Item Edit View');
    console.log(e.target.id);
    try {
      const { item } = await inventoryService.showOne(e.target.id);
      this.setState({showItem: item});
    } catch (error) {
        console.log(error);
    }
  }

  handleSwapSiteView = async (e) => {
    e.preventDefault();
    console.log('Site View');
    console.log(e.target.id);
    try {
      const { site }= await swapSiteService.showOne(e.target.id);
      this.setState({showSite: site});
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const {lat, lng} = await geolocationService.getCurrentLatLng();
    this.setState({
      lat,
      lng
    })
  }

  handleToggleMap = () => {
    if(this.state.mapActive === false){
      this.setState({mapActive: true});
    } else {
      this.setState({mapActive: false});
    }
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
            handleToggleMap={this.handleToggleMap}
            handleGetItems={this.handleGetItems}
            handleGetSites={this.handleGetSites}
            mapKey={this.state.mapKey}
            mapActive={this.state.mapActive}
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
          <Route exact path='/inventory/edit' render={() =>
            userService.getUser() ?
            <EditItemPage
            showItem={this.state.showItem}
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
              handleGetSites={this.handleGetSites}
              handleGetItems={this.handleGetMyItems}
              sites={this.state.sites} 
              items={this.state.items} 
              myItems={this.state.myItems}
              mySwapmeets={this.state.mySwapmeetsData}

            />
              :
            <Redirect to='/login' />    
          }/>
          <Route exact path='/swapmeets/new' render={() =>
            userService.getUser() ?
            <NewSwapmeetsPage 
              items={this.state.items} 
              myItems={this.state.myItems}
              showItem={this.state.showItem}
              showSite={this.state.showSite}
              wantItem={this.state.wantItem}
              wantItemPlace={this.state.wantItemPlace}
              wantItemUser={this.state.wantItemUser}
              offerItem={this.state.offerItem}
              handleGetSwapmeets={this.handleGetSwapmeets}
              handleGetMyOfferItem={this.handleGetMyOfferItem}
            />
              :
            <Redirect to='/login' />    
          }/>
          <Route exact path='/swapsites' render={() =>
            userService.getUser() ?
            <SwapsitesPage
              mapKey={this.state.mapKey} 
              myItems={this.state.myItems}
              sites={this.state.sites} 
              handleGetSites={this.handleGetSites}
              handleGetItems={this.handleGetItems} 
              items={this.state.items}
              handleGetMyWantItem={this.handleGetMyWantItem}
              handleSwapSiteView={this.handleSwapSiteView}
            />
              :
            <Redirect to='/login' />    
          }/>

          <Route exact path='/swapsites/view' render={() =>
            userService.getUser() ?
            <ViewSwapSitePage
              mapKey={this.state.mapKey} 
              myItems={this.state.myItems}
              sites={this.state.sites}
              items={this.state.items}
              showSite={this.state.showSite}
              handleGetSites={this.handleGetSites}
              handleGetItems={this.handleGetItems} 
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
