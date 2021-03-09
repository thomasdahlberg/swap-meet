import React, { Component } from 'react';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import FormButtons from '../FormButtons/FormButtons';
import styles from './ItemForm.module.css';

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

class ItemForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    if (this.props.showItem) {
      return {
        user: userService.getUser(),
        id: this.props.showItem._id,
        name: this.props.showItem.name,
        description: this.props.showItem.description,
        itemType: this.props.showItem.itemType,
        swapPref: this.props.showItem.swapPref,
        image: this.props.showItem.image,
      };
    } else {
      return {
        user: userService.getUser(),
        image: null,
        name: '',
        description: '',
        itemType: '',
        swapPref: '',
      };
    }
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

  buildFormData = async () => {
    let data = new FormData();
    data.append('id', this.state.id);
    data.append('file', this.state.image);
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('itemType', this.state.itemType);
    data.append('swapPref', this.state.swapPref);
    return data;
  };

  addItem = async () => {
    let data = {
      name: this.state.name,
      description: this.state.description,
      itemType: this.state.itemType,
      swapPref: this.state.swapPref,
    };
    await inventoryService.addItem(data);
  };

  updateItem = async () => {
    let data = await this.buildFormData();
    inventoryService.updateItem(data);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.isFormValid()) return;
    try {
      this.props.addItemForm
        ? await this.addItem()
        : await this.updateItem();
    } catch (error) {
      console.log(error);
    } finally {
      const toggleEvent = {
        target: {
          id: this.props.showItem
            ? 'toggleEditItemForm'
            : 'toggleAddItemForm',
        },
      };
      this.props.handleGetItems();
      this.getInitialState();
      this.props.handleFormToggle(toggleEvent);
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.showItem ? (
          <div className={styles.header}>
            <h1>{this.state.name}</h1>
            <h2>{this.state.itemType}</h2>
            <img src={this.state.image} alt={this.state.name} />
          </div>
        ) : (
          <h1>Add A New Item</h1>
        )}
        <div className={styles.form}>
          <div className={styles.container}>
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
              defaultValue={this.state.name}
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
              defaultValue={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="itemType">Select an item type:</label>
            <select
              id="itemType"
              name="itemType"
              defaultValue={this.state.itemType}
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
            <label htmlFor="swapPref">
              What are you looking for?
            </label>
            <select
              id="swapPref"
              name="swapPref"
              defaultValue={this.state.swapPref}
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
              submitTitle={
                this.props.showItem ? 'Update Item' : 'Add Item'
              }
              cancelTitle="Cancel"
              submitFunction={this.handleSubmit}
              cancelFunction={this.props.handleFormToggle}
              cancelId={
                this.props.showItem
                  ? 'toggleEditItemForm'
                  : 'toggleAddItemForm'
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ItemForm;
