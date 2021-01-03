import React, { Component } from 'react';
import styles from './Meet.module.css';
import MeetOffer from '../MeetOffer/MeetOffer';
import swapmeetService from '../../utils/swapmeetService';

class Meet extends Component {
  handleMeetDecision = async (e) => {
    try {
      swapmeetService.updateOne(e.target);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      idx,
      myOffer,
      meet: {
        site,
        offerItem,
        wantItem,
        _id: id,
        dateTime,
        meetAccepted,
        counterOffer,
      },
    } = this.props;
    return (
      <section key={idx} className={styles.meet}>
        <h1>
          {dateTime} at {site}
        </h1>
        <div className={styles.info}>
          <p>Your Item: {offerItem.name}</p>
          <p>Their Item: {wantItem.name}</p>
        </div>
        <MeetOffer
          myOffer={myOffer}
          meetAccepted={meetAccepted}
          counterOffer={counterOffer}
          id={id}
          handleMeetDecision={this.handleMeetDecision}
          handleMeetEditView={this.props.handleMeetEditView}
        />
      </section>
    );
  }
}

export default Meet;
