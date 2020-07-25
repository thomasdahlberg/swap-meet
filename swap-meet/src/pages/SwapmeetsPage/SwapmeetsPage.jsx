import React from 'react';
import Swapmeets from '../../components/Swapmeets/Swapmeets';


const SwapmeetsPage = (props) => {

    return(
        <div>
            <h1>My SwapMeets</h1>
            <Swapmeets
                sites={props.sites}
                mySwapmeets={props.mySwapmeets}
                items={props.items} 
                myItems={props.myItems}
            />
        </div>
    )
}

export default SwapmeetsPage;
