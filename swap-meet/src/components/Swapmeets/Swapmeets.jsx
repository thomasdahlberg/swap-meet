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
                        <h1 key={_id}>{dateTime} at {site}</h1>
                        <div key={_id} className={styles.info}>
                            <p key={_id}><strong key={_id}>Your Item:</strong> {offerItem.name}</p>
                            <p key={i}><strong key={i}>Their Item:</strong> {wantItem.name}</p>
                        </div>
                        {meetAccepted ? 
                            <h3 key={_id}><strong key={_id}>Meet Accepted!</strong></h3>
                            :
                            <h3 key={i}><em key={i}>Awaiting response</em></h3>
                        }
                        <Link to="" onClick={this.delayRedirect}><button key={_id} data="1" onClick={this.props.handleSwapMeetEditView} id={_id}>Change Date/Time</button></Link>
                        {counterOffer ? 
                            <div key={i}>
                                <button key={_id}>Agree to Swap-Meet</button>
                                <button key={i}>Decline Offer</button>
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
                            <h1 key={_id}>{dateTime} at {site}</h1>
                            <div key={_id} className={styles.info}>
                                <p key={_id}><strong key={_id}>Your Item:</strong> {wantItem.name}</p>
                                <p key={i}><strong key={i}>Their Item:</strong> {offerItem.name}</p>
                            </div>
                            <div key={i}>
                                <button key={_id}>Change Date/Time</button>
                                <button key={i}>Agree to Swap-Meet</button>
                                <button key={i+_id}>Decline Offer</button>
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
