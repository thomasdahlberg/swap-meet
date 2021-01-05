import React from 'react';
import { Link } from 'react-router-dom';
import FormButtons from '../FormButtons/FormButtons';

const MeetOffer = ({
  id,
  myOffer,
  counterOffer,
  meetAccepted,
  handleMeetDecision,
  handleMeetEditView,
}) => {
  if (myOffer) {
    return counterOffer && !meetAccepted ? (
      <FormButtons
        submitId={id}
        submitTitle="Agree to Swap-Meet"
        cancelId={id}
        cancelTitle="Decline Offer"
        submitFunction={handleMeetDecision}
        cancelFunction={handleMeetDecision}
      />
    ) : meetAccepted ? (
      <div>
        <h3>Meet Accepted!</h3>
        <FormButtons
          cancelId={id}
          cancelTitle="Cancel Swap-Meet"
          cancelFunction={handleMeetDecision}
        />
      </div>
    ) : (
      <h3>Awaiting Response</h3>
    );
  } else {
    return meetAccepted ? (
      <div>
        <h3>Meet Accepted!</h3>
        <FormButtons
          cancelId={id}
          cancelTitle="Cancel Swap-Meet"
          cancelFunction={handleMeetDecision}
        />
      </div>
    ) : counterOffer ? (
      <div>
        <h3>Awaiting Response</h3>
      </div>
    ) : (
      <div>
        <Link to="" onClick={this.delayRedirect}>
          <button
            id={id}
            name="counter-offer"
            onClick={handleMeetEditView}
          >
            Change Date/Time
          </button>
        </Link>
        <FormButtons
          submitId={id}
          submitTitle="Agree to Swap-Meet"
          cancelId={id}
          cancelTitle="Decline Offer"
          submitFunction={handleMeetDecision}
          cancelFunction={handleMeetDecision}
        />
      </div>
    );
  }
};

export default MeetOffer;
