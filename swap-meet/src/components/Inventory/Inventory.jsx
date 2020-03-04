import React , {Component} from 'react';

const Inventory = (props) => {
    return (
        <main>
            {
                props.items.map(({name, _id, description, image, itemType, swapPref}) => (
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


export default Inventory;
