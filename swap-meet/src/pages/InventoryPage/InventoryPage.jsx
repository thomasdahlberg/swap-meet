import React from 'react';
import Inventory from '../../components/Inventory/Inventory'

const InventoryPage = (props) => {

    return(
        <div>
            <h1>InventoryPage</h1>
            <Inventory {...props} />
        </div>
    )
}

export default InventoryPage;
