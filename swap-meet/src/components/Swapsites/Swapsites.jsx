import React from 'react';
import { Link } from 'react-router-dom';

import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';


    
const Swapsites = (props) => {   
    return (
        <main>
            {props.sites.map(({ siteName, _id, items}) => (
                <section key={_id}>
                    <h1>{siteName}</h1>
                    <ul>
                        {props.items.map(({ _id, name}) => 
                            { for( let i = 1; i < items.length; i++) {
                                if( items[i] === _id ) { return <li key={_id}><Link key={_id} id={_id} onClick={props.handleGetMyWantItem} to="/swapmeets/new">{name}</Link></li> }
                                }
                            })
                        }
                    </ul>
                    <ItemToSiteForm {...props} handleGetSites={props.handleGetSites} items={props.myItems} siteId={_id} key={_id}/>
                </section>
                ))
            }

                
        </main>
    )
}



export default Swapsites;
