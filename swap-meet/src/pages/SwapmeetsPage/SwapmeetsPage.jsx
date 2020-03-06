import React from 'react';
import Swapmeets from '../../components/Swapmeets/Swapmeets';


const SwapmeetsPage = (props) => {

    return(
        <div>
            <h1>My SwapMeets</h1>
            <Swapmeets swapMeets={props.swapMeets} items={props.items} myItems={props.myItems}/>
        </div>
    )
}

export default SwapmeetsPage;
