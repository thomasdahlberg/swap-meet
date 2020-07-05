import React from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../../components/NewInventoryItem/NewInventoryItem';

const InventoryPage = (props) => {
    const h1Style = {
        fontFamily: 'Permanent Marker',
        fontSize: '4rem'
    };

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    return(
        <div style={containerStyle}>
            <h1 style={h1Style}>My Swap-Items</h1>
            <NewInventoryItem handleGetItems={props.handleGetItems}/>
            <Inventory items={props.items} myItems={props.myItems}/>
        </div>
    )
}

export default InventoryPage;
