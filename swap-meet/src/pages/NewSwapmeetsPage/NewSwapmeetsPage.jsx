import React from 'react';
import NewSwapMeetOfferForm from '../../components/NewSwapMeetOfferForm/NewSwapMeetOfferForm';
import styles from './NewSwapmeetsPage.module.css'

const NewSwapmeetsPage = (props) => {

    return(
        <div className={styles.container}>
            <h1>Swap Meet Offer</h1>
            <NewSwapMeetOfferForm 
                handleGetItems={props.handleGetItems} 
                items={props.items} myItems={props.myItems}
                handleGetWantItemUser={props.handleGetWantItemUser}
                wantItem={props.wantItem}
                wantItemPlace={props.wantItemPlace}
                wantItemUser={props.wantItemUser}  
            />
        </div>
    )
}

export default NewSwapmeetsPage;
