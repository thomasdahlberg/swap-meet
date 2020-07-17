import React from 'react';
import Swapmeets from '../../components/Swapmeets/Swapmeets';


const SwapmeetsPage = (props) => {

    return(
        <div>
            <h1>My SwapMeets</h1>
            <Swapmeets
                sites={props.sites}
                swapmeets={props.swapmeets}
                items={props.items} 
                myItems={props.myItems}
            />
        </div>
    )
}

export default SwapmeetsPage;
