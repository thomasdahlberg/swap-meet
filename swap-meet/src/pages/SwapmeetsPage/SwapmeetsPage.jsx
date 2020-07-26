import React, { Component } from 'react';
import Swapmeets from '../../components/Swapmeets/Swapmeets';


class SwapmeetsPage extends Component {
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

    render() {
        return(
            <div style={this.containerStyle}>
                {this.props.mySwapmeets || this.props.myOfferedMeets ? 
                <h1 style={this.h1Style}>My Swap-Meets</h1>
                :
                <h1 style={this.h1Style}>No Current Swap-Meets</h1>}
                <Swapmeets
                    handleSwapMeetEditView={this.props.handleSwapMeetEditView}
                    sites={this.props.sites}
                    mySwapmeets={this.props.mySwapmeets}
                    myOfferedMeets={this.props.myOfferedMeets}
                    items={this.props.items} 
                    myItems={this.props.myItems}
                />
            </div>
        )
    }
}

export default SwapmeetsPage;
