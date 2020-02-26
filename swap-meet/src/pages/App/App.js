import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import InventoryPage from'../InventoryPage/InventoryPage';
import ConnectionsPage from'../ConnectionsPage/ConnectionsPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';


class App extends Component {
  render(){
    return(
      <div className="App-outer-container">
        <Navbar />
        <div className="App-inner-container">
        <Switch>
          <Route exact path='/' render={() =>
            <HomePage />
          }/>
          <Route exact path='/inventory' render={() =>
            <InventoryPage />
          }/>
          <Route exact path='/connections' render={() =>
            <ConnectionsPage />
          }/>
          <Route exact path="/login" render={props =>
            <Login />
          }/>
          <Route exact path="/signup" render={props =>
            <Signup />
          }/>
        </Switch>
        </div>
        <Footer />  
      </div>
    );
  }
}

export default App;
