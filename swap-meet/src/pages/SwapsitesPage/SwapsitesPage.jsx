import React from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';
import AddSwapsitesForm from '../../components/AddSwapsitesForm/AddSwapsitesForm';



const SwapsitesPage = (props) => {

    return(
        <div>
            <h1>My SwapSites</h1>
            <Swapsites sites={props.sites} items={props.items} handleGetSites={props.handleGetSites}/>
            <AddSwapsitesForm handleGetSites={props.handleGetSites} />
        </div>
    )
}

export default SwapsitesPage;
