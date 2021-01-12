import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Site.module.css';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';
import SiteItem from '../SiteItem/SiteItem';

const Site = (props) => {
  return (
    <section className={styles.section}>
      <div className={styles.info}>
        <div className={styles.title}>
          <button
            onClick={(e) => {
              props.handleSwapSiteView(e);
              return <Redirect to="/swapsites/view/" />;
            }}
            key={props.id}
            id={props.id}
          >
            {props.siteName}
          </button>
        </div>
        <hr />
        <h3>
          <em>{props.address}</em>
        </h3>
      </div>
      <div>
        <ul>
          {props.siteItems.map((siteItem, idx) => {
            props.items.map(({ _id, name }) =>
              siteItem === _id ? (
                <SiteItem id={_id} name={name} key={idx} />
              ) : null,
            );
            return null;
          })}
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
  );
};

export default Site;
