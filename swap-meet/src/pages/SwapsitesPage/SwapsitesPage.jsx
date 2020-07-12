import React, { Component } from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';
import AddSwapsitesForm from '../../components/AddSwapsitesForm/AddSwapsitesForm';
import styles from './SwapsitesPage.module.css';



class SwapsitesPage extends Component {
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
        this.props.handleGetSites();
        this.props.handleGetItems();
    }
    render(){
        return(
            <div style={this.containerStyle}>
                {this.props.sites.length === 0? <h1 style={this.h1Style}>No Swap-Sites Created</h1> : <h1 style={this.h1Style}>Swap-Sites</h1>}
                <AddSwapsitesForm 
                    handleGetSites={this.props.handleGetSites} 
                className={styles.section}/>
                <Swapsites 
                    sites={this.props.sites}
                    items={this.props.items}     
                    handleGetSites={this.props.handleGetSites}
                    myItems={this.props.myItems}
                    handleGetMyWantItem={this.props.handleGetMyWantItem}
                />
            </div>
        )
    }
}

export default SwapsitesPage;
