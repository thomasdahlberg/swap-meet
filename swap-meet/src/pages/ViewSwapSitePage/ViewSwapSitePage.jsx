import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ViewSwapSitePage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div>
                {this.props.showSite ? 
                    <section>
                        <h1>{this.props.showSite.siteName}</h1>
                    </section> :
                    <Redirect to="/swapsites" />
                }
            </div>
        )
    }
}

export default ViewSwapSitePage