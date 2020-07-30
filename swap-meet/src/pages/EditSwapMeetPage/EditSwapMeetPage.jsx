import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './EditSwapMeetPage.module.css';

class EditSwapMeetPage extends Component {
    constructor(props){
        super(props)
        this.state = {};
    }
    
    render() {
        return(
            <div className={styles.outer}>
            {this.props.showMeet ?
                <div>
                    <h1 className={styles.h1Style}>Update Swap-Meet Time</h1>
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
                        <h1>For</h1>
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

export default EditSwapMeetPage;