import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Swapsites.module.css';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';


    
const Swapsites = (props) => {   
    return (
        <main className={styles.container}>
            {props.sites.map(({ siteName, _id, items, address, city, state}) => (
                <section className={styles.section} key={_id}>
                    <div className={styles.info}>
                        <div className={styles.title}>
                            <h1>{siteName}</h1>
                            <button className={styles.button} id={_id}>View</button>
                        </div>
                        <hr/>
                        <h3><em>{address}</em></h3>
                    </div>
                    <div id={_id}>
                    {items.map((siteItem, idx) => {
                        return (
                            <ul key={idx}>
                                {props.items.map(({_id, name}) => {
                                    if(siteItem === _id){
                                        return (
                                            <Link key={_id} to="/swapmeets/new"><li onClick={props.handleGetMyWantItem} key={_id} id={_id}>{name}</li><input type="hidden" name="swapSite" value={_id}/></Link>
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
                    <ItemToSiteForm handleGetItems={props.handleGetItems} handleGetSites={props.handleGetSites} myItems={props.myItems} siteId={_id} siteItems={items} listItems={props.myItems} key={_id}/>
                </section>
                ))
            }

                
        </main>
    )
}



export default Swapsites;
