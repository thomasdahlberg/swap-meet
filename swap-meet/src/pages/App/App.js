import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import InventoryPage from'../InventoryPage/InventoryPage';
import ConnectionsPage from'../ConnectionsPage/ConnectionsPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import userService from '../../utils/userService';
import NewInventoryItem from '../../pages/NewInventoryItem/NewInventoryItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      items: ['ipod', 'baseball', 'dancebelt']
    }
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
            <InventoryPage {...this.state}/>
              :
            <Redirect to='/login' />
          }/>
          <Route exact path='/inventory/new' render={() =>
            userService.getUser() ?
            <NewInventoryItem/>
              :
            <Redirect to='/login' />           
          }/>
          <Route exact path='/connections' render={() =>
            userService.getUser() ?
            <ConnectionsPage />
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
