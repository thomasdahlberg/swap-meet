import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import InventoryPage from'../InventoryPage/InventoryPage';
import ConnectionsPage from'../ConnectionsPage/ConnectionsPage';


class App extends Component {
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <h1>SwapMeet</h1>
          <navbar>Navbar</navbar>
        </header>
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

        </Switch>
        <footer className="">Footer</footer>
      </div>
    );
  }
}

export default App;
