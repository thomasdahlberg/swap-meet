import React from 'react';
import InventoryItem from '../../components/InventoryItem/InventoryItem'

const Inventory = (props) => {

    return(
        <div>
            {props.items.map((item, idx) =>
            <InventoryItem 
            key={idx}
            name={item}
            value={item}
            />
            )}
        </div>
    )
}

export default Inventory;
