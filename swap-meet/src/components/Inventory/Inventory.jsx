import React from 'react';
import styles from './Inventory.module.css';


const Inventory = (props) => {
    return (
        <main className={styles.container}>
            {
                props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                <section className={styles.section} key={_id}>
                    <img src={image} alt={name}/>                    
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <h3>Looking for: {swapPref}</h3>
                </section>
                ))
                }
        </main>
    )
}


export default Inventory;
