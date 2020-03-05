import React from 'react';

const Swapmeets = (props) => {
    return (
        <main>
            {
                props.swapMeets.map(({name, _id, description, image, itemType, swapPref}) => (
                <section key={_id}>
                    <h1>{name}</h1>
                    <h3>{itemType}</h3>
                    <p>{description}</p>
                    <h3>Looking for: {swapPref}</h3>
                </section>
                ))
                }
        </main>
    )
}


export default Swapmeets;
