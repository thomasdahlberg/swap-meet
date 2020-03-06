import React from 'react';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';

const Swapsites = (props) => {
    return (
        <main>
            {props.sites.map(({ siteName, _id, items}) => (
                <section key={_id}>
                    <h1>{siteName}</h1>
                    <ul>
                        {props.items.map(({ _id, name}) => 
                            {for(let i = 1; i < items.length; i++) {
                                if(items[i] === _id) { return <li>{name}</li>
                                    }
                                }
                            })
                    }
                
                    
                    </ul>
                    <ItemToSiteForm items={props.items} siteId={_id} key={_id}/>
                </section>
                ))
            }

                
        </main>
    )
}


export default Swapsites;
