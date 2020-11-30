import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Site.module.css';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';

const Site = (props) => {
    return (
        <section className={styles.section}>
            <div className={styles.info}>
                <div className={styles.title}>
                    <Link 
                        to="" 
                        onClick={props.delayRedirect}
                        key={props.id} 
                        id={props.id}
                    >
                        <h1 
                            onClick={props.handleSwapSiteView}
                            id={props.id}
                        >
                            {props.siteName}
                        </h1>
                    </Link>
                </div>
                <hr/>
                <h3><em>{props.address}</em></h3>
            </div>
            <div>
                <ul>
                    { props.siteItems.map((siteItem, idx) => 
                        { props.items.map(({_id, name}) => 
                            siteItem === _id ?
                                <Link 
                                    key={siteItem} 
                                    to="/swapmeets/new"
                                >
                                    <li 
                                        onClick={props.handleGetMyWantItem}
                                        key={siteItem}
                                        id={siteItem}
                                    >
                                    {name}
                                    </li>
                                    <input
                                        type="hidden"
                                        name="swapSite"
                                        value={siteItem}
                                    />
                                </Link>
                                : null
                        )}
                    )}
                </ul>
            </div>
            <ItemToSiteForm 
                myItems={props.myItems} 
                siteId={props.id}
                siteItems={props.siteItems}
                listItems={props.myItems}
                key={props.id}
                handleGetItems={props.handleGetItems}
                handleGetSites={props.handleGetSites}
            />
        </section>
    )
}

export default Site