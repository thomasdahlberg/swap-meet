import React from 'react';
import InventoryItem from '../InventoryItem/InventoryItem';

const Inventory = (props) => {
  return (
    <div>
      {props.myItems.map(
        ({ name, _id, description, image, itemType, swapPref }) => (
          <InventoryItem
            name={name}
            id={_id}
            description={description}
            image={image}
            itemType={itemType}
            swapPref={swapPref}
            showItem={props.showItem}
            handleItemDelete={props.handleItemDelete}
            handleFormToggle={props.handleFormToggle}
            handleToggleEditItem={props.handleToggleEditItem}
          />
        ),
      )}
    </div>
  );
};

export default Inventory;
