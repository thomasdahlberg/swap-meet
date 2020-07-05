import React from 'react';
import styles from './Inventory.module.css';


const Inventory = (props) => {
    return (
        <main className={styles.container}>
            {
                props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                <section className={styles.section} key={_id}>
                    <div className={styles.container}>
                        <img src={image} alt={name}/>                    
                        <div className={styles.info}>
                            <h1>{name}</h1>
                            <p>{description}</p>
                            <h3>Looking for: {swapPref}</h3>
                        </div>
                    </div>
                </section>
                ))
                }
        </main>
    )
}


export default Inventory;
