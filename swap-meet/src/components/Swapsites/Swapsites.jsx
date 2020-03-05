import React , {Component} from 'react';

const Swapsites = (props) => {
    return (
        <main>
            {props.sites?
                props.sites.map(({ siteName, _id}) => (
                <section key={_id}>
                    <h1>{siteName}</h1>
                </section>
                ))
                :
                <div>no sites</div>
                }
        </main>
    )
}


export default Swapsites;
