import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SiteItem.module.css';

const SiteItem = (props) => {
    return (
        <Link 
            key={props.id} 
            to="/swapmeets/new"
        >
            <li 
                onClick={props.handleGetMyWantItem}
                id={props.id}
            >
            {props.name}
            </li>
            <input
                type="hidden"
                name="swapSite"
                value={props.id}
            />
        </Link>
    )
}

export default SiteItem