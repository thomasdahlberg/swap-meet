import React from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../NewInventoryItem/NewInventoryItem';

const InventoryPage = (props) => {

    return(
        <div>
            <h1>Inventory</h1>
            <Inventory items={props.items} />
            <NewInventoryItem/>
        </div>
    )
}

export default InventoryPage;
