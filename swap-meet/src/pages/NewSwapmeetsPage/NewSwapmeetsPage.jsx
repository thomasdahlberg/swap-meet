import React from 'react';
import NewSwapMeetOfferForm from '../../components/NewSwapMeetOfferForm/NewSwapMeetOfferForm';
import styles from './NewSwapmeetsPage.module.css'

const NewSwapmeetsPage = (props) => {

    return(
        <div className={styles.container}>
            <h1>Swap Meet Offer</h1>
            <div className={styles.item}>
                <div className={styles.inner}>
                    <img src={props.wantItem.image} alt={props.wantItem.name}/>
                    <div className={styles.info}>
                        <h1>{props.wantItem.name}</h1>
                        <h3><em>{props.wantItem.itemType}</em></h3>
                        <p>{props.wantItem.description}</p>
                        <h3>Looking for: <em>{props.wantItem.swapPref}</em></h3>
                    </div>
                </div>
            </div>
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
