import React, { Component } from 'react';

class EditSwapMeetPage extends Component {
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
            <h1>Edit Swap-Meet Page</h1>
        )
    }
}

export default EditSwapMeetPage;