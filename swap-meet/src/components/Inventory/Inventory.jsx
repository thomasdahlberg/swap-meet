import React from 'react';
import styles from './Inventory.module.css';


const Inventory = (props) => {
    return (
        <main className={styles.container}>
            {
                props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                <section className={styles.section} key={_id}>
                    <h1>{name}</h1>
                    <img alt="alt text"/>
                    <p>{description}</p>
                    <h3>Looking for: {swapPref}</h3>
                </section>
                ))
                }
        </main>
    )
}


export default Inventory;
