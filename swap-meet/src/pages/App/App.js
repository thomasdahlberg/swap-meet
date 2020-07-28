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
import EditSwapMeetPage from '../EditSwapMeetPage/EditSwapMeetPage';
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
      showMeet: null,
      mySwapmeets: null,
      myOfferedMeets: null,
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
    }
  }

  handleGetMyItems = () => {
    let myItems = [];
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
        this.setState({
          wantItem: item,
          wantItemUser: item.currentOwner
        })
      }
    })
  }

  handleGetMyOfferItem = async (e) => {
    const offerItemId = e.target.value;
    this.state.myItems.forEach((item)=> {
      if(offerItemId === item._id){
        this.setState({offerItem: item})
      }
    })
  }

  handleGetMySwapmeetsData = async (e) => {
    let myMeetsData = [];
    if(this.state.mySwapmeets){
      this.state.mySwapmeets.forEach((element) => {
        let sites = this.state.sites;
        let items = this.state.items;
        let swapmeet = {};
        for(let i = 0; i < sites.length; i++) {
          if(sites[i]._id === element.site) {
            swapmeet._id = element._id;
            swapmeet.site = sites[i].siteName;
            let dateTime = new Date(element.dateTime);
            swapmeet.dateTime = dateTime.toUTCString();
          }
       }
        for(let i = 0; i < items.length; i++) {
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
    
    let myOfferedMeetsData = [];
    if(this.state.myOfferedMeets){
      this.state.myOfferedMeets.forEach((element) => {
        let sites = this.state.sites;
        let items = this.state.items;
        let swapmeet = {};
        for(let i = 0; i < sites.length; i++) {
          if(sites[i]._id === element.site) {
            swapmeet.site = sites[i].siteName;
            let dateTime = new Date(element.dateTime);
            swapmeet.dateTime = dateTime.toUTCString();
          }
        }
        for(let i = 0; i < items.length; i++) {
          if(items[i]._id === element.transaction.offerItem){
            swapmeet.offerItem = items[i].name;
          }
          if(items[i]._id === element.transaction.wantItem){
            swapmeet.wantItem = items[i].name;
          }
        }
        if(swapmeet.site) myOfferedMeetsData.push(swapmeet);
      })
      this.setState({ myOfferedMeetsData: myOfferedMeetsData });
    }
  }

  handleGetMySwapmeets = async (e) => {
    let myMeets = [];
    let myOfferedMeets = [];
    for(let i = 0; i < this.state.swapmeets.length; i++){
      if(this.state.swapmeets[i].transaction.offerUser === this.state.user._id){
        myMeets.push(this.state.swapmeets[i]);
      }
      if(this.state.swapmeets[i].transaction.wantItemUser === this.state.user._id){
        myOfferedMeets.push(this.state.swapmeets[i]);
      }
    }
    await this.setState({
      mySwapmeets: myMeets,
      myOfferedMeets: myOfferedMeets
    });
    this.handleGetMySwapmeetsData();
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
    try {
      const { site } = await swapSiteService.showOne(e.target.id);
      this.setState({showSite: site});
    } catch (error) {
      console.log(error);
    }
  }

  handleSwapMeetEditView = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const { meet } = await swapmeetService.showOne(e.target.id);
      this.setState({showMeet: meet});
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
            handleGetSwapmeets={this.handleGetSwapmeets}
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
              handleSwapMeetEditView={this.handleSwapMeetEditView}
              sites={this.state.sites} 
              items={this.state.items} 
              myItems={this.state.myItems}
              mySwapmeets={this.state.mySwapmeetsData}
              myOfferedMeets={this.state.myOfferedMeetsData}
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
          <Route exact path='/swapmeets/edit' render={() =>
            userService.getUser() ?
            <EditSwapMeetPage 
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
