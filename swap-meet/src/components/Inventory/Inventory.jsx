import React , {Component} from 'react';
import InventoryItem from '../../components/InventoryItem/InventoryItem'
import { Link } from 'react-router-dom';

const Inventory = (props) => {
    return (
        <div>
            {props.items.map((item, idx) =>
            <InventoryItem 
            key={idx}
            name={item}
            value={item}
            />
            )}
            <div><Link to="/inventory/new">Add A New Item</Link></div>
        </div>
    )
}


export default Inventory;
