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
                    this.props.mySwapmeets.map(({site, offerItem, wantItem, _id, dateTime, meetAccepted, counterOffer}) => (
                    <section key={_id} className={styles.meet}>
                        <h1 key={_id}>{dateTime} at {site}</h1>
                        <div key={_id} className={styles.info}>
                            <p key={_id}><strong key={_id}>Your Item:</strong> {offerItem}</p>
                            <p key={_id}><strong key={_id}>Their Item:</strong> {wantItem}</p>
                        </div>
                        {meetAccepted ? 
                            <h3 key={_id}><strong key={_id}>Meet Accepted!</strong></h3>
                            :
                            <h3 key={_id}><em key={_id}>Awaiting response</em></h3>
                        }
                        <Link to="" onClick={this.delayRedirect}><button key={_id} onClick={this.props.handleSwapMeetEditView} id={_id}>Change Date/Time</button></Link>
                        {counterOffer ? 
                            <div key={_id}>
                                <button key={_id}>Agree to Swap-Meet</button>
                                <button key={_id}>Decline Offer</button>
                            </div>
                            :
                            <div key={_id} value={null}></div>
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
                            <div key={_id} className={styles.info}>
                                <p key={_id}><strong key={_id}>Your Item:</strong> {wantItem}</p>
                                <p key={_id}><strong key={_id}>Their Item:</strong> {offerItem}</p>
                            </div>
                            <div key={_id}>
                                <button key={_id}>Change Date/Time</button>
                                <button key={_id}>Agree to Swap-Meet</button>
                                <button key={_id}>Decline Offer</button>
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
