import React from 'react';
import Item from '../Item/Item';

const Inventory = (props) => {
  return (
    <div>
      {props.myItems.map(
        ({ name, _id, description, image, itemType, swapPref }) => (
          <Item
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
