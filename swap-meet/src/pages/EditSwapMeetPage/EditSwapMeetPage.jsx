import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import styles from './EditSwapMeetPage.module.css';
import swapmeetService from '../../utils/swapmeetService';

class EditSwapMeetPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            showMeetOffer: null,
            dateTime: null,
            id: null
        };
    }

    isFormValid = () => {
        return this.state.dateTime;
    }

    delayRedirect = e => {
        e.preventDefault();
        setTimeout(()=> {
            this.props.history.push('/swapmeets')
            }, 1000)
    }
    
    handleChange = e => {
        this.setState({
            dateTime: e.target.value,
            id: e.target.previousSibling.value,
            showMeetOffer: e.target.previousSibling.previousSibling.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            const { id, dateTime, showMeetOffer } = this.state;
            await swapmeetService.updateOne({ id, dateTime, showMeetOffer });
            this.props.handleGetSwapmeets();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <div className={styles.outer}>
            {this.props.showMeet ?
                <div className={styles.outer}>
                    <h1 className={styles.h1}>Update Swap-Meet Time</h1>
                    <div className={styles.container}>
                        <h1>Meet at {this.props.showMeet.site} at:</h1>
                        <input type="hidden" name="showMeetOffer" value={this.props.showMeetOffer}/>
                        <input type="hidden" name="id" id="id" value={this.props.showMeet._id}/>
                        <input type="datetime-local" name="dateTime" id="dateTime" defaultValue={this.props.showMeet.dateTimeData} onChange={this.handleChange}/>
                        <Link to="" disabled={!this.isFormValid()} onClick={this.delayRedirect}><button onClick={this.handleSubmit} disabled={!this.isFormValid()}>Suggest New Time</button></Link>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.item}>
                            <div className={styles.inner}>
                                <img src={this.props.showMeet.wantItem.image} alt={this.props.showMeet.wantItem.name}/>
                                <div className={styles.info}>
                                    <h1>{this.props.showMeet.wantItem.name}</h1>
                                    <h3><em>{this.props.showMeet.wantItem.itemType}</em></h3>
                                    <p>{this.props.showMeet.wantItem.description}</p>
                                    <h3>Looking for: <em>{this.props.showMeet.wantItem.swapPref}</em></h3>
                                </div>
                            </div>
                        </div>
                        <h1 className={styles.spacer}>For</h1>
                        <div className={styles.item}>
                            <div className={styles.inner}>
                                <img src={this.props.showMeet.offerItem.image} alt={this.props.showMeet.offerItem.name}/>
                                <div className={styles.info}>
                                    <h1>{this.props.showMeet.offerItem.name}</h1>
                                    <h3><em>{this.props.showMeet.offerItem.itemType}</em></h3>
                                    <p>{this.props.showMeet.offerItem.description}</p>
                                    <h3>Looking for: <em>{this.props.showMeet.offerItem.swapPref}</em></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Redirect to="/swapmeets"/>
            }
        </div>
        )
    }
}

export default withRouter(EditSwapMeetPage);