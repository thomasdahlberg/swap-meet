import React, { Component } from 'react';
import styles from './Swapmeets.module.css';
import { Link, withRouter } from 'react-router-dom';



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
                    this.props.mySwapmeets.map(({site, offerItem, wantItem, _id, dateTime, meetAccepted, counterOffer},i) => (
                    <section key={i} className={styles.meet}>
                        <h1>{dateTime} at {site}</h1>
                        <div className={styles.info}>
                            <p><strong>Your Item:</strong> {offerItem.name}</p>
                            <p><strong>Their Item:</strong> {wantItem.name}</p>
                        </div>
                        {meetAccepted ? 
                            <h3><strong>Meet Accepted!</strong></h3>
                            :
                            <h3><em >Awaiting response</em></h3>
                        }
                        <Link to="" onClick={this.delayRedirect}><button name="first" onClick={this.props.handleSwapMeetEditView} id={_id}>Change Date/Time</button></Link>
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
                    this.props.myOfferedMeets.map(({site, offerItem, wantItem, _id, dateTime, meetAccepted, counterOffer},i) => (
                        <section key={i} className={styles.meet}>
                            <h1>{dateTime} at {site}</h1>
                            <div className={styles.info}>
                                <p><strong>Your Item:</strong> {wantItem.name}</p>
                                <p><strong>Their Item:</strong> {offerItem.name}</p>
                            </div>
                            <div>
                            <Link to="" onClick={this.delayRedirect}><button id={_id} onClick={this.props.handleSwapMeetEditView}>Change Date/Time</button></Link>
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
