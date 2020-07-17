import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Swapsites.module.css';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';


    
const Swapsites = (props) => {   
    return (
        <main className={styles.container}>
            {props.sites.map(({ siteName, _id, items, address, city, state}) => (
                <section className={styles.section} key={_id}>
                    <h1>{siteName}</h1>
            <h3><em>{address}</em></h3>
                    <ul id={_id}>
                        {props.items.map(({ _id, name}) => 
                            { for( let i = 0; i < items.length; i++) {
                                if( items[i] === _id ) { return <Link key={_id} to="/swapmeets/new"><li onClick={props.handleGetMyWantItem} key={_id} id={_id}>{name}</li><input type="hidden" name="swapSite" value={_id}/></Link>
                                    } else {
                                        return <div key={_id}></div>;
                                    }
                                }
                                return null;
                            })
                        }
                    </ul>
                    <div>
                        <button id={_id}>Edit</button>
                        <button id={_id} className={styles.delete}>Delete</button>
                    </div>

                    <ItemToSiteForm {...props} handleGetItems={props.handleGetItems} handleGetSites={props.handleGetSites} myItems={props.myItems} siteId={_id} key={_id}/>
                </section>
                ))
            }

                
        </main>
    )
}



export default Swapsites;
