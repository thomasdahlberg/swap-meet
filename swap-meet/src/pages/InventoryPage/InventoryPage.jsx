import React from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../../components/NewInventoryItem/NewInventoryItem';

const InventoryPage = (props) => {
    const h1Style = {
        paddingLeft: '15px',
        fontFamily: 'Open Sans',
        fontWeight: 500
    };
    return(
        <div>
            <h1 style={h1Style}>My Swap Inventory</h1>
            <NewInventoryItem handleGetItems={props.handleGetItems}/>
            <Inventory items={props.items} myItems={props.myItems}/>
        </div>
    )
}

export default InventoryPage;
