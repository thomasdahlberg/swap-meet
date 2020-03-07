import React from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';
import AddSwapsitesForm from '../../components/AddSwapsitesForm/AddSwapsitesForm';
import styles from './SwapsitesPage.module.css';



const SwapsitesPage = (props) => {

    return(
        <div className={styles.container}>
            <h1>SwapSites</h1>
            <AddSwapsitesForm 
                handleGetSites={props.handleGetSites} 
            className={styles.section}/>
            <Swapsites 
                sites={props.sites}
                items={props.items}     
                handleGetSites={props.handleGetSites}
                myItems={props.myItems}
                handleGetMyWantItem={props.handleGetMyWantItem}
            />
        </div>
    )
}

export default SwapsitesPage;
