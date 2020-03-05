import React , {Component} from 'react';

const Swapsites = (props) => {
    return (
        <main>
            {
                props.swapSites.map(({name, _id, description, image, itemType, swapPref}) => (
                <section key={_id}>
                    <h1>{name}</h1>
                    <img/>
                    <h3>{itemType}</h3>
                    <p>{description}</p>
                    <h3>Looking for: {swapPref}</h3>
                </section>
                ))
                }
        </main>
    )
}


export default Swapsites;
