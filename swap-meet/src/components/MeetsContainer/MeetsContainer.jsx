import React from 'react';
import Meet from '../Meet/Meet';

const MeetsContainer = (props) => {
  return (
    <div>
      {props.mySwapmeets ? (
        <section>
          {props.mySwapmeets.map((meet, idx) => (
            <Meet idx={idx} myOffer={false} meet={meet} />
          ))}
        </section>
      ) : null}
      {props.myOfferedMeets ? (
        <section>
          {props.myOfferedMeets.map((meet, idx) => (
            <Meet idx={idx} myOffer={true} meet={meet} />
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default MeetsContainer;
