import React from 'react';
import Site from '../Site/Site';
import styles from './Swapsites.module.css';

const Swapsites = (props) => {
  return (
    <main className={styles.container}>
      {props.sites.map(
        ({ siteName, _id, items, address, city, state }) => (
          <Site
            siteName={siteName}
            id={_id}
            siteItems={items}
            address={address}
            city={city}
            state={state}
            items={props.items}
            myItems={props.myItems}
            listItems={props.myItems}
            handleGetMyWantItem={props.handleGetMyWantItem}
            handleGetItems={props.handleGetItems}
            handleGetSites={props.handleGetSites}
            handleSwapSiteView={props.handleSwapSiteView}
          />
        ),
      )}
    </main>
  );
};

export default Swapsites;
