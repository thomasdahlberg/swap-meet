import React, { Component } from 'react';
import styles from './Swapmeets.module.css';
import { Link, withRouter } from 'react-router-dom';
import swapmeetService from '../../utils/swapmeetService';



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

    handleSwapmeetDecision = async (e) => {
        try {
          swapmeetService.updateOne(e.target);
        } catch (error) {
          console.log(error);
        }
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
                        {counterOffer && !meetAccepted ? 
                            <div>
                                <h3><strong>Updated Time for Swapmeet</strong></h3>
                                <button id={_id} name="agree" onClick={this.handleSwapmeetDecision} >Agree to Swap-Meet</button>
                                <button id={_id} name="decline" onClick={this.handleSwapmeetDecision} >Decline Offer</button>
                            </div>
                            :
                            meetAccepted ? 
                            <div>
                                <h3><strong>Meet Accepted!</strong></h3>
                                <button className={styles.cancel} id={_id} name="cancel" onClick={this.handleSwapmeetDecision}>Cancel Swapmeet</button>
                            </div>
                            :
                            <h3><strong>Awaiting Response</strong></h3>
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
                            {meetAccepted ? 
                                <div>
                                    <h3><strong>Meet Accepted!</strong></h3>
                                    <button className={styles.cancel} id={_id} name="cancel" onClick={this.handleSwapmeetDecision}>Cancel Swapmeet</button>
                                </div>
                                :
                                counterOffer ?
                                <div>
                                    <h3><strong>Awaiting Response</strong></h3>
                                </div>
                                :
                                <div>
                                    <Link to="" onClick={this.delayRedirect}><button id={_id} name="counter-offer" onClick={this.props.handleSwapMeetEditView}>Change Date/Time</button></Link>
                                    <button id={_id} name="agree" onClick={this.handleSwapmeetDecision} >Agree to Swap-Meet</button>
                                    <button id={_id} name="decline" onClick={this.handleSwapmeetDecision} >Decline Offer</button>
                                </div>
                            }
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
