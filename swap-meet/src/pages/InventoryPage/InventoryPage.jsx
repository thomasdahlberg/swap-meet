import React, { Component } from 'react';
import Inventory from '../../components/Inventory/Inventory';
import ItemForm from '../../components/ItemForm/ItemForm';
import styles from './InventoryPage.module.css';

class InventoryPage extends Component {
  componentDidMount() {
    this.props.handleGetItems();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this.props.myItems.length === 0 ? (
            <h1 className={styles.header}>
              No Swap-Items in Inventory
            </h1>
          ) : (
            <h1 className={styles.header}>My Swap-Items</h1>
          )}
          {this.props.addItemForm ? (
            <ItemForm
              handleGetItems={this.props.handleGetItems}
              handleFormToggle={this.props.handleFormToggle}
              addItemForm={this.props.addItemForm}
            />
          ) : (
            <button
              className={styles.button}
              onClick={this.props.handleFormToggle}
              id="toggleAddItemForm"
            >
              Add an Item
            </button>
          )}
        </div>
        <Inventory
          showItem={this.props.showItem}
          items={this.props.items}
          myItems={this.props.myItems}
          handleGetItems={this.props.handleGetItems}
          handleFormToggle={this.props.handleFormToggle}
          handleToggleEditItem={this.props.handleToggleEditItem}
          handleItemDelete={this.props.handleItemDelete}
        />
      </div>
    );
  }
}

export default InventoryPage;
