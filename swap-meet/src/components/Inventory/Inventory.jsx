import React from 'react';
import styles from './Inventory.module.css';


const Inventory = (props) => {
    return (
        <main className={styles.mainContainer}>
            {
                props.myItems.map(({name, _id, description, image, itemType, swapPref}) => (
                <section className={styles.section} key={_id}>
                    <div className={styles.container}>
                        <img src={image} alt={name}/>                    
                        <div className={styles.info}>
                            <h1>{name}</h1>
                            <h3><em>{itemType}</em></h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </section>
                ))
                }
        </main>
    )
}


export default Inventory;
