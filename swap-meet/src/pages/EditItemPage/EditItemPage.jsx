import React, { Component } from 'react';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import styles from './EditItemPage.module.css';

class EditItemPage extends Component {
    constructor(props){
        super(props)
        this.state = this.getInitialState();
    }

    itemTypes = [
        'Antiques',
        'Art',
        'Art & Craft Supplies',
        'Baby Essentials',
        'Books',
        'Business & Industrial',
        'Cameras & Photo',
        'Cell Phones, Smart Watches & Accessories',
        'Clothing, Shoes & Accessories',
        'Coins & Paper Money',
        'Computers, Tablets & Network Hardware',
        'Consumer Electronics',
        'Dolls & Teddy Bears',
        'DVDs & Movies',
        'Entertainment Memorabilia',
        'Gift Cards & Coupons',
        'Health & Beauty',
        'Home & Garden',
        'Jewelry & Watches',
        'Music',
        'Musical Instruments & Gear',
        'Pet Supplies',
        'Pottery & Glass',
        'Real Estate',
        'Specialty Services',
        'Sporting Goods',
        'Sports Memorabilia, Fan Shop & Sports Cards',
        'Stamps',
        'Tickets & Experiences',
        'Toys & Hobbies',
        'Travel',
        'Video Games & Consoles',
    ]

    getInitialState() {
        return {
            user: userService.getUser(),
            image: null,
            name: '',
            description: '',
            itemType: '',
            swapPref: ''
        };
    }

    isFormValid = () => {
        return (
            this.state.name && 
            this.state.description && 
            this.state.itemType
        );
    }

    handleImageChange = e => {
        this.setState({
            image: e.target.files[0],
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(!this.isFormValid()) return;
        const data = new FormData(); 
        data.append('file', this.state.image);
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('itemType', this.state.itemType);
        data.append('swapPref', this.state.swapPref);
        try {
            inventoryService.updateItem(data);
            console.log('got the items?');
            this.setState({
                user: userService.getUser(),
                image: null,
                name: '',
                description: '',
                itemType: '',
                swapPref: ''
            });
            this.addItemFormToggle();
        } catch (error) {
            console.log(error);
        }
    }

    delayedHandleGetItems = () => {
        setTimeout(this.props.handleGetItems, 3000);
    }

    render() {
        return(
            <div>
                <img src={this.props.showItem.image} alt={this.props.showItem.name}/>                    
                <h1>{this.props.showItem.name}</h1>
                <h3><em>{this.props.showItem.itemType}</em></h3>
                <form className={styles.form} onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className={styles.container}>

                        <label htmlFor="image">Select New Item Image:</label>
                        <input 
                                id="image" 
                                name="image" 
                                type="file" 
                                accept="image/*"
                                onChange={this.handleImageChange}
                            />

                        <label htmlFor="name">Item Name:</label>
                        <input 
                            id="name" 
                            name="name" 
                            type="name"
                            value={this.props.showItem.name}
                            onChange={this.handleChange}
                        />
                        
                        <label htmlFor="description">Description:</label>
                        <textarea
                            rows="4"
                            cols="50"
                            maxLength="200"
                            className={styles.description} 
                            id="description" 
                            name="description" 
                            value={this.props.showItem.description} 
                            onChange={this.handleChange}
                        />
                        
                        <label htmlFor="itemType">Select an item type:</label>
                        <select 
                            id="itemType" 
                            name="itemType"  
                            value={this.props.showItem.itemType}
                            onChange={this.handleChange}
                        >
                            <option name="itemType" value="" disabled>Choose a Category</option>
                            {this.itemTypes.map((type, idx) => <option name="itemType" value={type} key={idx}>{type}</option>)}
                        </select>

                        <label htmlFor="swapPref">What are you looking for?</label>
                        <select 
                            id="swapPref" 
                            name="swapPref"  
                            value={this.props.showItem.swapPref}
                            onChange={this.handleChange}
                        >
                            <option name="swapPref" value="" disabled>Choose a Category</option>
                            {this.itemTypes.map((type, idx) => <option name="swapPref" value={type} key={idx}>{type}</option>)}
                        </select>

                        <button disabled={!this.isFormValid()} type="submit" onClick={this.delayedHandleGetItems}>Add Item</button>
                    
                    </div>
                </form>
            </div>
        )
    }
}

export default EditItemPage;