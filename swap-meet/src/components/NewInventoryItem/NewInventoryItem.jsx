import React, { Component } from 'react';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import styles from './NewInventoryItem.module.css';


class NewInventoryItem extends Component {
    state = this.getInitialState();

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
                <input
                    className={styles.description} 
                    id="description" 
                    name="description" 
                    type="text" 
                    value={this.state.description} 
                    onChange={this.handleChange}
                />
                
                <label htmlFor="itemType">Select Item Type</label>
                <select 
                    id="itemType" 
                    name="itemType"  
                    value={this.state.itemType}
                    onChange={this.handleChange}
                >
                <option name="itemType" value="1">One</option>
                <option name="itemType" value="2">Two</option>
                <option name="itemType" value="3">Three</option>
                </select>

                <label htmlFor="swapPref">Select Item Type</label>
                <select 
                    id="swapPref" 
                    name="swapPref"  
                    value={this.state.swapPref}
                    onChange={this.handleChange}
                >
                <option name="swapPref" value="1">One</option>
                <option name="swapPref" value="2">Two</option>
                <option name="swapPref" value="3">Three</option>
                </select>

                <button disabled={!this.isFormValid()} type="submit">Add Item</button>
            </fieldset>
        </form>
        );
    }
}

export default NewInventoryItem
