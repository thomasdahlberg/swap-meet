import React, { Component } from 'react';
import Inventory from '../../components/Inventory/Inventory'
import NewInventoryItem from '../../components/NewInventoryItem/NewInventoryItem';

class InventoryPage extends Component {
    constructor(props){
        super(props)
        this.state = {};
    }
    h1Style = {
        fontFamily: 'Permanent Marker',
        fontSize: '4rem'
    };

    containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    componentDidMount(){
        this.props.handleGetItems();
    }
    
    render(){
        return(
            <div style={this.containerStyle}>
                <h1 style={this.h1Style}>My Swap-Items</h1>
                <NewInventoryItem handleGetItems={this.props.handleGetItems}/>
                <Inventory 
                    items={this.props.items}
                    myItems={this.props.myItems}
                    handleGetItems={this.props.handleGetItems}
                    handleItemEditView={this.props.handleItemEditView}
                    handleItemDelete={this.props.handleItemDelete}
                    />
            </div>
        )
    }
}

export default InventoryPage;
