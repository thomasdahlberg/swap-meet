import React, { Component } from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../../components/NewInventoryItem/NewInventoryItem';
import styles from './InventoryPage.module.css';

class InventoryPage extends Component {
    
    delayRedirect = e => {
        e.preventDefault();
        setTimeout(()=> {
            this.props.history.push('/inventory/edit')
        }, 1000)
    }

    componentDidMount(){
        this.props.handleGetItems();
    }
    
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    { this.props.myItems.length === 0 ? 
                        <h1 className={styles.header}>No Swap-Items in Inventory</h1>
                        : <h1 className={styles.header}>My Swap-Items</h1>
                    }
                    { this.props.addItemForm ? 
                        <NewInventoryItem 
                            handleGetItems={this.props.handleGetItems}
                            handleAddItemFormToggle={this.props.handleAddItemFormToggle}
                        />
                        :
                        <button 
                            className={styles.button} 
                            onClick={this.props.handleAddItemFormToggle}
                        >
                            Add an Item
                        </button>
                    }
                </div>
                <Inventory 
                    items={this.props.items}
                    myItems={this.props.myItems}
                    handleGetItems={this.props.handleGetItems}
                    handleItemEditView={this.props.handleItemEditView}
                    handleItemDelete={this.props.handleItemDelete}
                    delayRedirect={this.delayRedirect}
                />
            </div>
        )
    }
}

export default InventoryPage;
