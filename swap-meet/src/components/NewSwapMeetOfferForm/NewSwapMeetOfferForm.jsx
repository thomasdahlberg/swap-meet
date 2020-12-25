import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import userService from '../../utils/userService';
import swapmeetService from '../../utils/swapmeetService';
import styles from './NewSwapMeetOfferForm.module.css';

class NewSwapMeetOfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  delayRedirect = (e) => {
    e.preventDefault();
    setTimeout(() => {
      this.props.history.push('/swapmeets');
    }, 1000);
  };

  getInitialState() {
    return {
      offerUser: userService.getUser()._id,
      wantItemUser: this.props.wantItemUser,
      wantItemId: this.props.wantItem._id,
      offerItemId: null,
      swapSiteId: this.props.showSite._id,
      dateTime: null,
      items: [],
    };
  }

  isFormValid = () => {
    return (
      this.state.offerUser &&
      this.state.wantItemId &&
      this.state.offerItemId &&
      this.state.swapSiteId &&
      this.state.dateTime &&
      this.state.wantItemUser
    );
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleItemChange = (e) => {
    this.setState({
      offerItemId: e.target.value,
    });
    this.props.handleGetMyOfferItem(e);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        wantItemId,
        offerItemId,
        swapSiteId,
        dateTime,
        offerUser,
        wantItemUser,
      } = this.state;
      await swapmeetService.addOffer({
        wantItemId,
        offerItemId,
        swapSiteId,
        dateTime,
        offerUser,
        wantItemUser,
      });
      this.props.handleGetSwapmeets();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor="offerItemId">Select Item to Swap</label>
          <select
            name="offerItemId"
            onChange={this.handleItemChange}
            defaultValue={'DEFAULT'}
          >
            <option disabled value="DEFAULT" name="item">
              Choose Item to List
            </option>
            {this.props.myItems ? (
              this.props.myItems.map(({ name, _id }) => (
                <option key={_id} name="item" value={_id}>
                  {name}
                </option>
              ))
            ) : (
              <option disabled>No Items In Your Inventory</option>
            )}
          </select>
          <label htmlFor="dateTime">Swap-Meet Time?</label>
          <input
            type="datetime-local"
            name="dateTime"
            onChange={this.handleChange}
          />
          <Link
            to=""
            onClick={this.delayRedirect}
            disabled={!this.isFormValid()}
          >
            <button
              type="submit"
              onClick={this.handleSubmit}
              disabled={!this.isFormValid()}
            >
              Request Swap-Meet
            </button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(NewSwapMeetOfferForm);
