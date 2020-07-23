import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './ViewSwapSite.module.css'

class ViewSwapSitePage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div className={styles.container}>
                {this.props.showSite ? 
                    <section>
                        <div className={styles.header}>
                            <h1>{this.props.showSite.siteName}</h1>
                            <h2><em>{this.props.showSite.address}</em></h2>
                        </div>
                        <div>
                            {this.props.showSite.items.map(id => (
                                <div>{id}</div>
                             ))
                            }
                        </div>
                    </section>
                    :
                    <Redirect to="/swapsites" />
                }
            </div>
        )
    }
}

export default ViewSwapSitePage