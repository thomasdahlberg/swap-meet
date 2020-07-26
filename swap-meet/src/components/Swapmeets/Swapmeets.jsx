import React from 'react';
import styles from './Swapmeets.module.css';
// import inventoryService from '../../utils/inventoryService';



const Swapmeets = (props) => {

    return (
        <main>
            {props.mySwapmeets ? 
                props.mySwapmeets.map(({site, offerItem, wantItem, _id, dateTime}) => (
                <section key={_id} className={styles.meet}>
                    <h1 key={_id}>{dateTime} at {site}</h1>
                    <div className={styles.info}>
                        <p key={_id}><strong>Your Item:</strong> {offerItem}</p>
                        <p key={_id}><strong>Their Item:</strong> {wantItem}</p>
                        <h3><em>Awaiting response</em></h3>
                    </div>
                </section>
                ))
                :
                <div>no swapmeets</div>
            }
            {props.myOfferedMeets ?
                props.myOfferedMeets.map(({site, offerItem, wantItem, _id, dateTime}) => (
                    <section key={_id} className={styles.meet}>
                        <h1 key={_id}>{dateTime} at {site}</h1>
                        <div className={styles.info}>
                            <p key={_id}><strong>Your Item:</strong> {wantItem}</p>
                            <p key={_id}><strong>Their Item:</strong> {offerItem}</p>
                        </div>
                        <div>
                            <button>Agree to Swap-Meet</button>
                            <button>Decline Offer</button>
                        </div>
                    </section>
                ))
                :
                <div>no offered swapmeets</div>
            }
        </main>
    )
}


export default Swapmeets;
