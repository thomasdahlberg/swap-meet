import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import inventoryService from '../../utils/inventoryService';
import userService from '../../utils/userService';
import FormButtons from '../FormButtons/FormButtons';
import styles from './EditItem.module.css';

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

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    if (this.props.showItem) {
      return {
        user: userService.getUser(),
        id: this.props.showItem._id,
        name: this.props.showItem.name,
        description: this.props.showItem.description,
        itemType: this.props.showItem.itemType,
        swapPref: this.props.showItem.swapPref,
        redirect: false,
      };
    } else {
      return {};
    }
  }

  renderRedirect() {
    if (this.state.redirect) {
      setTimeout(console.log('waiting game'), 3000);
      return <Redirect to="/inventory/" />;
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
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.isFormValid()) return;
    const data = new FormData();
    data.append('id', this.state.id);
    data.append('file', this.state.image);
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('itemType', this.state.itemType);
    data.append('swapPref', this.state.swapPref);
    try {
      inventoryService.updateItem(data);
      this.delayedHandleGetItems();
      this.setState({
        user: userService.getUser(),
        id: '',
        image: null,
        name: '',
        description: '',
        itemType: '',
        swapPref: '',
        redirect: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  delayedHandleGetItems = async () => {
    setTimeout(this.props.handleGetItems, 3000);
  };

  render() {
    return (
      <div className={styles.edit}>
        {this.props.showItem ? (
          <div
            className={styles.form}
            // onSubmit={this.handleSubmit}
            // encType="multipart/form-data"
          >
            <div className={styles.header}>
              <h1>{this.props.showItem.name}</h1>
              <h2>
                <em>{this.props.showItem.itemType}</em>
              </h2>
              <img
                src={this.props.showItem.image}
                alt={this.props.showItem.name}
              />
            </div>
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
                defaultValue={this.props.showItem.name}
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
                defaultValue={this.props.showItem.description}
                onChange={this.handleChange}
              />
              <label htmlFor="itemType">Select an item type:</label>
              <select
                id="itemType"
                name="itemType"
                defaultValue={this.props.showItem.itemType}
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
                defaultValue={this.props.showItem.swapPref}
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
                cancelId="toggleEditItemForm"
              />
            </div>
          </div>
        ) : (
          <Redirect to="/inventory" />
        )}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default EditItem;
