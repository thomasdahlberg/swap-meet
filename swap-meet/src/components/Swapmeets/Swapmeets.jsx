import React, { Component } from 'react';
import styles from './Swapmeets.module.css';
import { Link, withRouter } from 'react-router-dom';
// import inventoryService from '../../utils/inventoryService';



class Swapmeets extends Component {
    constructor(props) {
        super(props) 
        this.state = {};
    }
    
    delayRedirect = e => {
        e.preventDefault();
        setTimeout(()=> {
            this.props.history.push('/swapmeets/edit')
            }, 1000)
    }

    render() {
        return (
            <main>
                {this.props.mySwapmeets ? 
                    this.props.mySwapmeets.map(({site, offerItem, wantItem, _id, dateTime, meetAccepted, counterOffer}) => (
                    <section key={_id} className={styles.meet}>
                        <h1 key={_id}>{dateTime} at {site}</h1>
                        <div className={styles.info}>
                            <p key={_id}><strong>Your Item:</strong> {offerItem}</p>
                            <p key={_id}><strong>Their Item:</strong> {wantItem}</p>
                        </div>
                        {meetAccepted ? 
                            <h3><strong>Meet Accepted!</strong></h3>
                            :
                            <h3><em>Awaiting response</em></h3>
                        }
                        <Link to="" onClick={this.delayRedirect}><button onClick={this.props.handleSwapmeetEditView} id={_id}>Change Date/Time</button></Link>
                        {counterOffer ? 
                            <div>
                                <button>Agree to Swap-Meet</button>
                                <button>Decline Offer</button>
                            </div>
                            :
                            null
                        }
                    </section>
                    ))
                    :
                    <div>no swapmeets</div>
                }
                {this.props.myOfferedMeets ?
                    this.props.myOfferedMeets.map(({site, offerItem, wantItem, _id, dateTime, meetAccepted, counterOffer}) => (
                        <section key={_id} className={styles.meet}>
                            <h1 key={_id}>{dateTime} at {site}</h1>
                            <div className={styles.info}>
                                <p key={_id}><strong>Your Item:</strong> {wantItem}</p>
                                <p key={_id}><strong>Their Item:</strong> {offerItem}</p>
                            </div>
                            <div>
                                <button>Change Date/Time</button>
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
}


export default withRouter(Swapmeets);
