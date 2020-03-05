import React from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';
import AddSwapsitesPage from '../AddSwapsitesPage/AddSwapsitesPage';
import { Link } from 'react-router-dom';



const SwapsitesPage = (props) => {

    return(
        <div>
            <h1>My SwapSites</h1>
            <Swapsites sites={props.sites} />
            <AddSwapsitesPage handleGetSites={props.handleGetSites} />
        </div>
    )
}

export default SwapsitesPage;
