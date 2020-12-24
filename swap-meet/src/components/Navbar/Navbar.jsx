import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Fragment } from 'react';

const Navbar = (props) => {
  let nav = props.user ? (
    <Fragment>
      <li>
        <NavLink
          to="/inventory"
          className="navbar__link"
          activeClassName="navbar__link--active"
          onClick={props.handleGetItems}
        >
          My Swap-Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/swapmeets"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          My Swap-Meets
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/swapsites"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          My Swap-Sites
        </NavLink>
      </li>
      <li>
        <NavLink
          to=""
          onClick={props.handleLogout}
          className="navbar__link"
        >
          Log Out
        </NavLink>
      </li>
    </Fragment>
  ) : (
    <Fragment>
      <li>
        <NavLink
          to="/login"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Log In
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signup"
          className="navbar__link"
          activeClassName="navbar__link--active"
        >
          Sign Up
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar">
      <NavLink exact to="/">
        <h1>SWAP-MEET</h1>
      </NavLink>
      <ul>{nav}</ul>
    </nav>
  );
};

export default Navbar;
