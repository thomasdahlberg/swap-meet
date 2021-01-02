import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import ItemForm from '../ItemForm/ItemForm';
import ItemContent from '../ItemContent/ItemContent';

const InventoryItem = (props) => {
  return (
    <Fragment>
      {props.showItem ? (
        props.showItem.item._id === props.id ? (
          <ItemForm
            showItem={props.showItem.item}
            handleFormToggle={props.handleFormToggle}
          />
        ) : (
          <ItemContent
            name={props.name}
            id={props.id}
            description={props.description}
            image={props.image}
            itemType={props.itemType}
            swapPref={props.swapPref}
            showItem={props.showItem}
            handleItemDelete={props.handleItemDelete}
            handleToggleEditItem={props.handleToggleEditItem}
          />
        )
      ) : (
        <ItemContent
          name={props.name}
          id={props.id}
          description={props.description}
          image={props.image}
          itemType={props.itemType}
          swapPref={props.swapPref}
          showItem={props.showItem}
          handleItemDelete={props.handleItemDelete}
          handleToggleEditItem={props.handleToggleEditItem}
        />
      )}
    </Fragment>
  );
};

export default withRouter(InventoryItem);
