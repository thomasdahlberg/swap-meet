import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <div className={styles.appOuterContainer}>
            <Navbar 
                user={props.user} 
                handleLogout={props.handleLogout} 
                handleGetItems={props.handleGetItems}
            />
            <div className={styles.appInnerContainer}>
                {props.children}
            </div>
            <Footer />
        </div>

    )
}

export default Layout