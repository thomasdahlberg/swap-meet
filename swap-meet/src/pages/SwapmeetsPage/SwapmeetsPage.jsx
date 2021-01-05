import React, { Fragment } from 'react';
import MeetsContainer from '../../components/MeetsContainer/MeetsContainer';
import { Redirect } from 'react-router-dom';
import styles from './SwapmeetsPage.module.css';

const SwapmeetsPage = (props) => {
  return (
    <div className={styles.container}>
      {props.mySwapmeets || props.myOfferedMeets ? (
        props.mySwapmeets.length > 0 ||
        props.myOfferedMeets.length > 0 ? (
          <Fragment>
            <h1 className={styles.header}>My Swap-Meets</h1>
            <MeetsContainer
              handleSwapMeetEditView={props.handleSwapMeetEditView}
              sites={props.sites}
              mySwapmeets={props.mySwapmeets}
              myOfferedMeets={props.myOfferedMeets}
              items={props.items}
              myItems={props.myItems}
            />
          </Fragment>
        ) : (
          <h1 className={styles.header}>No Current Swap-Meets</h1>
        )
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default SwapmeetsPage;
