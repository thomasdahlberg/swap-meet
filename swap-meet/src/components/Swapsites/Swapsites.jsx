import React from 'react';
import ItemToSiteForm from '../ItemToSiteForm/ItemToSiteForm';

const Swapsites = (props) => {
    return (
        <main>
            {props.sites?
                props.sites.map(({ siteName, _id, items}) => (
                <section key={_id}>
                    <h1>{siteName}</h1>
                    <ul>
                        <li>{items}</li>
                    </ul>
                    <ItemToSiteForm items={props.items} siteId={_id} key={_id}/>
                </section>
                ))
                :
                <div>no sites</div>
                }
        </main>
    )
}


export default Swapsites;
