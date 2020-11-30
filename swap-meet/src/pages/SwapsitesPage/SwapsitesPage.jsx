import React, { Component } from 'react';
import Swapsites from '../../components/Swapsites/Swapsites';
import AddSwapsitesForm from '../../components/AddSwapsitesForm/AddSwapsitesForm';
import styles from './SwapsitesPage.module.css';


class SwapsitesPage extends Component {
    
    componentDidMount(){
        this.props.handleGetSites();
        this.props.handleGetItems();
    }

    render(){
        return(
            <div className={styles.container}>
                { this.props.sites.length === 0 ? 
                    <h1 className={styles.header}>No Swap-Sites Created</h1> 
                    : <h1 className={styles.header}>Swap-Sites</h1>
                }
                { this.props.addSiteForm ? 
                    <AddSwapsitesForm
                        mapKey={this.props.mapKey} 
                        handleGetSites={this.props.handleGetSites} 
                    />
                    : 
                    <button 
                        className={styles.button} 
                        onClick={this.props.handleAddSiteFormToggle}
                    >
                        Create New Swap-Site
                    </button>
                }
                <Swapsites
                    handleGetItems={this.props.handleGetItems} 
                    sites={this.props.sites}
                    items={this.props.items}     
                    handleGetSites={this.props.handleGetSites}
                    myItems={this.props.myItems}
                    handleGetMyWantItem={this.props.handleGetMyWantItem}
                    handleSwapSiteView={this.props.handleSwapSiteView}
                />
            </div>
        )
    }
}

export default SwapsitesPage;
