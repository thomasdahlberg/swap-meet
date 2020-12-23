import React, { Component } from 'react';
import swapSiteService from '../../utils/swapSiteService';
import userService from '../../utils/userService';
import styles from './ItemToSiteForm.module.css';

class ItemToSiteForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      user: userService.getUser(),
      item: null,
      site: this.props.siteId,
      myItems: this.props.myItems,
      siteItems: this.props.siteItems,
      listItems: this.props.listItems,
    };
  }

  editListItems = () => {
    let listItems = this.props.listItems;
    console.log(listItems);
    listItems.forEach(({ _id }, idx) => {
      this.props.siteItems.forEach((item) => {
        if (item === _id) {
          listItems.splice(idx, 1);
        }
      });
    });
    this.setState({ listItems: listItems });
  };

  isFormValid = () => {
    return this.state.name && this.state.user && this.state.site;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, item, site } = this.state;
      await swapSiteService.linkItem({ user, item, site });
      setTimeout(this.props.handleGetSites(), 1000);
      setTimeout(this.props.handleGetItems(), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.props.handleGetSites();
    this.props.handleGetItems();
    this.editListItems();
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit}>
        <div className={styles.select}>
          <label htmlFor="itemType">Select Item:</label>
          <select
            id="item"
            name="item"
            onChange={this.handleChange}
            defaultValue={'DEFAULT'}
          >
            <option disabled value="DEFAULT" name="item">
              Choose Item to List
            </option>
            {this.props.myItems.map(({ name, _id }) => (
              <option key={_id} name="item" value={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.button} type="submit">
          List Your Item Here
        </button>
      </form>
    );
  }
}

export default ItemToSiteForm;
