import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Fragment } from 'react';

const Navbar = (props) => {
    let nav = props.user ?
    <Fragment>
        <li>
            <Link to="/inventory">My Items</Link>
        </li>
        <li>
            <Link to="/swapmeets">My SwapMeets</Link>
        </li>
        <li>
            <Link to="/swapsites">My SwapSites</Link>
        </li>
        <li>
            <Link to="" onClick={props.handleLogout}>Log Out</Link>
        </li>
    </Fragment>
    :
    <Fragment>
        <li>
            <Link to="/login">Log In</Link>
        </li>
        <li>
            <Link to="/signup">Sign Up</Link>
        </li>
    </Fragment>;

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <h1>SWAP-MEET</h1>
            </Link>
            <ul>
                {nav}
            </ul>
            
        </nav>
    );
}

export default Navbar;