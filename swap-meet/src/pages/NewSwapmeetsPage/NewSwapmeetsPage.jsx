import React from 'react';
import { Redirect } from 'react-router-dom';
import SwapMeetOfferForm from '../../components/SwapMeetOfferForm/SwapMeetOfferForm';
import styles from './NewSwapmeetsPage.module.css';

const NewSwapmeetsPage = (props) => {
  return (
    <div className={styles.outer}>
      {props.wantItem ? (
        <div>
          <h1 className={styles.h1Style}>Offer a Swap-Meet</h1>
          <div className={styles.container}>
            <div className={styles.item}>
              <div className={styles.inner}>
                <img
                  src={props.wantItem.image}
                  alt={props.wantItem.name}
                />
                <div className={styles.info}>
                  <h1>{props.wantItem.name}</h1>
                  <h3>
                    <em>{props.wantItem.itemType}</em>
                  </h3>
                  <p>{props.wantItem.description}</p>
                  <h3>
                    Looking for: <em>{props.wantItem.swapPref}</em>
                  </h3>
                </div>
              </div>
            </div>
            <h1 className={styles.forStyle}>For</h1>
            <div className={styles.item}>
              {props.offerItem ? (
                <div className={styles.inner}>
                  <img
                    src={props.offerItem.image}
                    alt={props.offerItem.name}
                  />
                  <div className={styles.info}>
                    <h1>{props.offerItem.name}</h1>
                    <h3>
                      <em>{props.offerItem.itemType}</em>
                    </h3>
                    <p>{props.offerItem.description}</p>
                    <h3>
                      Looking for: <em>{props.offerItem.swapPref}</em>
                    </h3>
                  </div>
                </div>
              ) : (
                <h1>No Offer Item Selected</h1>
              )}
            </div>
          </div>
          <SwapMeetOfferForm
            handleGetItems={props.handleGetItems}
            items={props.items}
            myItems={props.myItems}
            handleGetWantItemUser={props.handleGetWantItemUser}
            offerItem={props.offerItem}
            showSite={props.showSite}
            handleGetMyOfferItem={props.handleGetMyOfferItem}
            wantItem={props.wantItem}
            handleGetSwapmeets={props.handleGetSwapmeets}
            wantItemPlace={props.wantItemPlace}
            wantItemUser={props.wantItemUser}
          />
        </div>
      ) : (
        <Redirect to="/swapsites" />
      )}
    </div>
  );
};

export default NewSwapmeetsPage;
