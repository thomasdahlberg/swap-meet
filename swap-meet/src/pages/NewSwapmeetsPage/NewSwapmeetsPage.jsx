import React from 'react';
import NewSwapMeetOfferForm from '../../components/NewSwapMeetOfferForm/NewSwapMeetOfferForm';

const NewSwapmeetsPage = (props) => {

    return(
        <div>
            <h1>Swap Meet Offer</h1>
            <NewSwapMeetOfferForm handleGetItems={props.handleGetItems} items={props.items} myItems={props.myItems}/>
        </div>
    )
}

export default NewSwapmeetsPage;
