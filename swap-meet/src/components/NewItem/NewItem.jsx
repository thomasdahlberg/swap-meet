import React, { Component } from 'react';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import FormButtons from '../FormButtons/FormButtons';
import styles from './NewItem.module.css';

const ITEM_TYPES = [
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
];

class NewItem extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      user: userService.getUser(),
      image: null,
      name: '',
      description: '',
      itemType: '',
      swapPref: '',
    };
  }

  isFormValid = () => {
    return (
      this.state.name && this.state.description && this.state.itemType
    );
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  buildFormData = () => {
    let data = new FormData();
    data.append('file', this.state.image);
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('itemType', this.state.itemType);
    data.append('swapPref', this.state.swapPref);
    return data;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const formData = this.buildFormData();
    try {
      inventoryService.addItem(formData);
    } catch (error) {
      console.log(error);
    } finally {
      this.props.handleGetItems();
      this.getInitialState();
      this.props.handleFormToggle(e);
    }
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.container}>
          <h1>Add A New Item</h1>
          <label htmlFor="image">Select Item Image:</label>
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
            value={this.state.name}
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
            <option name="itemType" value="" disabled>
              Choose a Category
            </option>
            {ITEM_TYPES.map((type, idx) => (
              <option name="itemType" value={type} key={idx}>
                {type}
              </option>
            ))}
          </select>
          <label htmlFor="swapPref">What are you looking for?</label>
          <select
            id="swapPref"
            name="swapPref"
            value={this.state.swapPref}
            onChange={this.handleChange}
          >
            <option name="swapPref" value="" disabled>
              Choose a Category
            </option>
            {ITEM_TYPES.map((type, idx) => (
              <option name="swapPref" value={type} key={idx}>
                {type}
              </option>
            ))}
          </select>
          <FormButtons
            submitTitle="Update Item"
            cancelTitle="Cancel"
            submitFunction={this.handleSubmit}
            cancelFunction={this.props.handleFormToggle}
            cancelId="toggleAddItemForm"
            submitId="toggleAddItemForm"
          />
        </div>
      </div>
    );
  }
}

export default NewItem;
