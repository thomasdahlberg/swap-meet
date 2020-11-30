import React from 'react';
import InventoryItem from '../InventoryItem/InventoryItem';

const Inventory = (props) => {
    return (
        <main>
            { props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                <InventoryItem
                    name={name}
                    id={_id}
                    description={description}
                    image={image}
                    itemType={itemType}
                    swapPref={swapPref}
                    handleItemDelete={props.handleItemDelete}
                    handleItemEditView={props.handleItemEditView}
                    delayRedirect={props.delayRedirect}
                />
                ))
            }
        </main>
    )
}


export default Inventory;
