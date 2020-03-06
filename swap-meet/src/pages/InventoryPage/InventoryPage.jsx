import React from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../../components/NewInventoryItem/NewInventoryItem';

const InventoryPage = (props) => {

    return(
        <div>
            <h1>Inventory</h1>
            <Inventory items={props.items} myItems={props.myItems}/>
            <NewInventoryItem handleGetItems={props.handleGetItems}/>
        </div>
    )
}

export default InventoryPage;
