import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import InventoryPage from'../InventoryPage/InventoryPage';
import SwapmeetsPage from'../SwapmeetsPage/SwapmeetsPage';
import SwapsitesPage from'../SwapsitesPage/SwapsitesPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import userService from '../../utils/userService';
import inventoryService from '../../utils/inventoryService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      items: []
    }
  }

  handleGetItems = async () => {
    if(userService.getUser()) {
      const { items } = await inventoryService.index();
      this.setState({ items: items })
    }
  }

  componentDidMount() {
    this.handleGetItems();
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
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage />
          }/>
          <Route exact path='/inventory' render={() =>
            userService.getUser() ?
            <InventoryPage
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
            <SwapsitesPage />
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
