import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Swapsites.module.css';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';


    
class Swapsites extends Component {
    constructor(props){
        super(props)
        this.state = {};
    }
    
    delayRedirect = e => {
        e.preventDefault();
        setTimeout(()=> {
            this.props.history.push('/swapsites/view')
            }, 1000)
    }
    render() {
        return (
            <main className={styles.container}>
                {this.props.sites.map(({ siteName, _id, items, address, city, state}) => (
                    <section className={styles.section} key={_id}>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                <Link to="" onClick={this.delayRedirect} key={_id} id={_id}><h1 onClick={this.props.handleSwapSiteView} id={_id}>{siteName}</h1></Link>
                            </div>
                            <hr/>
                            <h3><em>{address}</em></h3>
                        </div>
                        <div id={_id}>
                        {items.map((siteItem, idx) => {
                            return (
                                <ul key={idx}>
                                    {this.props.items.map(({_id, name}) => {
                                        if(siteItem === _id){
                                            return (
                                                <Link key={_id} to="/swapmeets/new"><li onClick={this.props.handleGetMyWantItem} key={_id} id={_id}>{name}</li><input type="hidden" name="swapSite" value={_id}/></Link>
                                            )
                                        } else {
                                            return null;
                                        }
                                    })
                                    }
                                </ul>
                            )
                        })
                        }
                        </div>
                        <ItemToSiteForm 
                            handleGetItems={this.props.handleGetItems}
                            handleGetSites={this.props.handleGetSites}
                            myItems={this.props.myItems} siteId={_id}
                            siteItems={items} listItems={this.props.myItems} key={_id}/>
                    </section>
                    ))
                }            
            </main>
        )
    }
}



export default withRouter(Swapsites);
