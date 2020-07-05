import React, { Component } from 'react';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import styles from './NewInventoryItem.module.css';


class NewInventoryItem extends Component {
    state = this.getInitialState();

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
        console.log('submitting new item');
        const data = new FormData(); 
        data.append('file', this.state.image);
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('itemType', this.state.itemType);
        data.append('swapPref', this.state.swapPref);
        try {
            // const { image, name, description, itemType, swapPref } = this.state;
            await inventoryService.addItem(data);
            setTimeout(this.props.handleGetItems(), 1000);
            this.getInitialState();
            this.props.history.push('/inventory');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <form className={styles.form} onSubmit={this.handleSubmit} encType="multipart/form-data">
            <fieldset className={styles.container}>
                <legend>Add A New Item</legend>
                <label htmlFor="image">Select Item Image:</label>
                <input 
                        id="image" 
                        name="image" 
                        type="file" 
                        accept="image/*"
                        onChange={this.handleImageChange}
                    />
                <label htmlFor="name">Item Name</label>
                <input 
                    id="name" 
                    name="name" 
                    type="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                
                <label htmlFor="description">Description</label>
                <textarea
                    rows="4"
                    cols="50"
                    className={styles.description} 
                    id="description" 
                    name="description" 
                    value={this.state.description} 
                    onChange={this.handleChange}
                />
                
                <label htmlFor="itemType">Select an item type:</label>
                <select 
                    id="itemType" 
                    name="itemType"  
                    value={this.state.itemType}
                    onChange={this.handleChange}
                >
                    <option name="itemType" value="" disabled>Choose a Category</option>
                    {this.itemTypes.map((type) => <option name="itemType" value={type}>{type}</option>)}
                </select>

                <label htmlFor="swapPref">What are you looking for?</label>
                <select 
                    id="swapPref" 
                    name="swapPref"  
                    value={this.state.swapPref}
                    onChange={this.handleChange}
                >
                    <option name="swapPref" value="" disabled>Choose a Category</option>
                    {this.itemTypes.map((type) => <option name="swapPref" value={type}>{type}</option>)}
                </select>

                <button disabled={!this.isFormValid()} type="submit">Add Item</button>
            </fieldset>
        </form>
        );
    }
}

export default NewInventoryItem
