import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = (props) => {
    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <h1>SWAP-MEET</h1>
            </Link>
            <ul>
                <li>
                    <Link to="/inventory">Your Items</Link>
                </li>
                <li>
                    <Link to="/connections">Your Connections</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
            
        </nav>
    );
}

export default Navbar;