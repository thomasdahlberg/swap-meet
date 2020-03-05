import React from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';



const SwapsitesPage = (props) => {

    return(
        <div>
            <h1>My SwapSites</h1>
            <Swapsites swapSites={props.swapSites} />

        </div>
    )
}

export default SwapsitesPage;
