import React, { Component } from 'react';
import userService from '../../utils/userService';
import swapmeetService from '../../utils/swapmeetService';
import styles from './NewSwapMeetOfferForm.module.css';

class NewSwapMeetOfferForm extends Component {
    constructor(props) {
        super(props) 
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {
            offerUser: userService.getUser()._id,
            wantItemId: this.props.wantItem._id,
            offerItemId: null,
            swapSiteId: this.props.showSite._id,
            dateTime: null,
            items:[]
        };
    }
    
       

    // getSwapItem() {
    //     this.setState({
    //         wantItemId: this.props.wantItem,
    //         swapSiteId: this.props.wantItemPlace,
    //         items: this.props.items
    //     })
    // }
    
    async componentDidMount(){
        // await this.getSwapItem();
    }

    isFormValid = () => {
        return (
            this.state.user && 
            this.state.wantItemId && 
            this.state.offerItemId &&
            this.state.swapSiteId &&
            this.state.dateTime
        );
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleItemChange = e => {
        this.setState({
            offerItemId: e.target.value
        })
        this.props.handleGetMyOfferItem(e);
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('submitting swapmeet offer');
        try {
            const { wantItemId, offerItemId, swapSiteId, dateTime, offerUser } = this.state;
            await swapmeetService.addOffer({ wantItemId, offerItemId, swapSiteId, dateTime, offerUser });
            // this.props.handleGetItems();
            // this.props.history.push('/inventory');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <form className={styles.container} onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="offerItemId">Select Item to Swap</label>
                    <select  
                        name="offerItemId"  
                        onChange={this.handleItemChange}
                        defaultValue={'DEFAULT'}
                    >
                        <option disabled value="DEFAULT" name="item">Choose Item to List</option>
                    {this.props.myItems ?
                        this.props.myItems.map(({ name, _id}) => (
                        <option key={_id} name="item" value={_id}>{name}</option>
                        )) : 
                        <option disabled>No Items In Your Inventory</option>
                    }
                    </select>
                    <label htmlFor="dateTime">Swap-Meet Time?</label>
                    <input type="datetime-local" name="dateTime" onChange={this.handleChange}/>
                    <button type="submit">Request Swap-Meet</button>
                </fieldset>
            </form>
        );
    }
}


    

export default NewSwapMeetOfferForm
